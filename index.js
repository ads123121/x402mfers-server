const express = require("express");
const app = express();

app.use(express.json());

app.post("/mint", (req, res) => {
  res.status(402).json({
    x402Version: 1.0,
    error: "payment_required",
    accepts: [{
      scheme: "exact",
      network: "base",
      maxAmountRequired: "1000000",
      resource: "https://x402mfers-server.vercel.app/mint",
      description: "Mint x402 NFT",
      mimeType: "application/json",
      payTo: "0xf486085502ED56Bf83a833c12cF44f521B5806E9",
      maxTimeoutSeconds: 300,
      asset: "USDC"
    }]
  });
});

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "x402 Server running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
