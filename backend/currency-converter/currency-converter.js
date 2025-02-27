const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const PORT = 3000;

app.get('/api/currencies', async (req, res) => {
    try {
        const response = await axios.get(`https://api.currencyapi.com/v3/latest?apikey=${process.env.CURRENCY_API_KEY}&currencies=EUR,USD,CLP`);
        const currencies = Object.keys(response.data.data);
        res.json(currencies);
    } catch (error) {
        console.error('Error fetching currencies:', error);
        res.status(500).json({ error: 'Failed to fetch currencies' });
    }
});

app.get('/api/convert', async (req, res) => {
    const { amount, from, to } = req.query;
    if (!amount || !from || !to) {
        return res.status(400).json({ error: 'Missing query parameters' });
    }
    try {
        const response = await axios.get(`https://api.currencyapi.com/v3/latest?apikey=${process.env.CURRENCY_API_KEY}&currencies=${from},${to}`);
        const rate = response.data.data[to]?.value;
        if (!rate) {
            return res.status(400).json({ error: 'Invalid currency code' });
        }
        const result = amount * rate;
        res.json({ result });
    } catch (error) {
        console.error('Error converting currency:', error);
        res.status(500).json({ error: 'Failed to convert currency' });
    }
});

app.listen(PORT, () => {
    console.log(`Currency Converter Microservice running on port ${PORT}`);
});
