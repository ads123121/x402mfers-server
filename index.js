const express = require("express");
const app = express();

app.use(express.json());

app.post("/mint", (req, res) => {
  res.status(402).json({
    price: "1000000",
    payTo: "0x1234567890ABCDEF1234567890ABCDEF12345678", // Замени на свой адрес!
    network: "base"
  });
});

app.get("/", (req, res) => {
  res.send("x402 Server works!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
