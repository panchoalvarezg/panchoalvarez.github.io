const express = require('express');
const app = express();
const PORT = 3001;

let trades = [];

app.use(express.json());

app.post('/api/trade', (req, res) => {
    const { type, amount, currency } = req.body;
    const trade = { type, amount, currency, date: new Date() };
    trades.push(trade);
    res.json(trade);
});

app.get('/api/trades', (req, res) => {
    res.json(trades);
});

app.listen(PORT, () => {
    console.log(`Trade Simulator Microservice running on port ${PORT}`);
});
