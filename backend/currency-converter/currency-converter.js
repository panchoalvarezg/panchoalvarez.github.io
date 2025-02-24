const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.get('/api/currencies', async (req, res) => {
    // Fetch the list of currencies from an external API
    try {
        const response = await axios.get('cur_live_ZfVEDFIn1OwGsREozlo3yavN0czLKoUt2kp5E9al');
        const currencies = Object.keys(response.data.rates);
        res.json(currencies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch currencies' });
    }
});

app.get('/api/convert', async (req, res) => {
    const { amount, from, to } = req.query;
    try {
        const response = await axios.get(`https://api.currencyapi.com/v3/latest?apikey=cur_live_ZfVEDFIn1OwGsREozlo3yavN0czLKoUt2kp5E9al&currencies=EUR%2CUSD%2CCAD`);
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
