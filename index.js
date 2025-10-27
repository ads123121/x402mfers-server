const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config();

const app = express();
app.use(express.json());

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x1994a7d2d0f5ab959bf0e93602c32844e22fd802a98e5351f314c93c8b5ec168";
const BASE_RPC_URL = process.env.BASE_RPC_URL || "https://sepolia.base.org";
const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS || "0xf486085502ED56Bf83a833c12cF44f521B5806E9";

const NFT_ABI = ["function mint(address to) public"];

app.post("/mint", async (req, res) => {
  try {
    const userAddress = req.body.userAddress || req.query.userAddress;
    
    if (!userAddress || !ethers.isAddress(userAddress)) {
      return res.status(402).json({
        x402Version: 1.0,
        error: "payment_required",
        accepts: [{
          scheme: "exact",
          network: "base",
          maxAmountRequired: "1000000",
          resource: "https://x402mfers-server.vercel.app/mint",
          description: "Mint x402MFERS NFT",
          mimeType: "application/json",
          payTo: TREASURY_ADDRESS,
          maxTimeoutSeconds: 300,
          asset: "USDC"
        }]
      });
    }

    // Если платёж получен — минтим NFT
    const provider = new ethers.JsonRpcProvider(BASE_RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, NFT_ABI, wallet);

    const tx = await contract.mint(userAddress);
    const receipt = await tx.wait();

    res.json({
      success: true,
      txHash: receipt.hash,
      nftAddress: CONTRACT_ADDRESS,
      userAddress: userAddress,
      message: "NFT minted successfully!"
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: error.message || "Minting failed"
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "x402 Mint Server is running"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
