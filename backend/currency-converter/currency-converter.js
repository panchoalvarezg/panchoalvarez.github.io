const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.get('/api/currencies', async (req, res) => {
    // Fetch the list of currencies from an external API
    try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        const currencies = Object.keys(response.data.rates);
        res.json(currencies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch currencies' });
    }
});

app.get('/api/convert', async (req, res) => {
    const { amount, from, to } = req.query;
    try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const rate = response.data.rates[to];
        const result = amount * rate;
        res.json({ result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to convert currency' });
    }
});

app.listen(PORT, () => {
    console.log(`Currency Converter Microservice running on port ${PORT}`);
});
