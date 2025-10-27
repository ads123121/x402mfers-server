const express = require("express");
const app = express();

app.use(express.json());

// Главный x402 endpoint
app.post("/mint", (req, res) => {
  // Возвращаем правильный x402 ответ (402 Payment Required)
  res.status(402).json({
    version: "1.0.0",
    error: "payment_required",
    accepts: [
      {
        scheme: "exact",
        network: "base",
        maxAmountRequired: "1000000", // 1 USDC в wei
        resource: "nft_mint",
        description: "Mint NFT on Base",
        simeType: "USDC",
        payTo: "0xf486085502ED56Bf83a833c12cF44f521B5806E9" // Твой адрес кошелька!
      }
    ]
  });
});

// Тестовый endpoint
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "x402 Mint Server is running"
  });
});

// 404 для неизвестных путей
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
