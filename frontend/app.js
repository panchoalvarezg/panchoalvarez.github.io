document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('converter-form');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const resultDiv = document.getElementById('result');

    const predefinedCurrencies = ['USD', 'CLP', 'EUR'];

    predefinedCurrencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    });

    const updateRates = () => {
        fetch('/api/latest-prices')
            .then(response => response.json())
            .then(data => {
                document.getElementById('eur-rate').textContent = data.eur[data.eur.length - 1];
                document.getElementById('usd-rate').textContent = data.usd[data.usd.length - 1];
                document.getElementById('clp-rate').textContent = data.clp[data.clp.length - 1];
                convertCurrency();
            });
    };

    const convertCurrency = () => {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (isNaN(amount)) return;

        fetch(`/api/convert?amount=${amount}&from=${from}&to=${to}`)
            .then(response => response.json())
            .then(data => {
                resultDiv.textContent = `${amount} ${from} = ${data.result} ${to}`;
            });
    };

    form.addEventListener('submit', event => {
        event.preventDefault();
        convertCurrency();
    });

    fromCurrency.addEventListener('change', convertCurrency);
    toCurrency.addEventListener('change', convertCurrency);
    amountInput.addEventListener('input', convertCurrency);

    // Actualizar las tasas de cambio cada 60 segundos
    setInterval(updateRates, 60000);
    updateRates(); // Primer llamada para actualizar inmediatamente
});
