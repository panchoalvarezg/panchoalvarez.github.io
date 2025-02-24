const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint para obtener precios de divisas en tiempo real
app.get('/api/latest-prices', async (req, res) => {
    const currency = req.query.currency || 'USD';
    try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${currency}`);
        const data = response.data;
        const dates = Object.keys(data.rates).map(date => new Date(date).toLocaleDateString());
        const prices = Object.values(data.rates);

        res.json({
            dates: dates,
            prices: prices
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los precios de las divisas' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
