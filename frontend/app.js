document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('converter-form');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const resultDiv = document.getElementById('result');

    const predefinedCurrencies = ['USD', 'CLP', 'EUR'];
    const rates = {
        "USD": {"CLP": 943,40, "EUR": 0.95},
        "CLP": {"USD": 0,0011, "EUR": 0.0010},
        "EUR": {"USD": 1.05, "CLP": 990.87}
    };

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

    const convertCurrency = () => {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (isNaN(amount) || !rates[from] || !rates[from][to]) return;

        const result = amount * rates[from][to];
        resultDiv.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
        
        // Mostrar resultados en los divs correspondientes
        if(from === 'USD' && to === 'EUR') {
            document.getElementById('usd-to-eur').querySelector('span').textContent = `${result.toFixed(2)}`;
        }
        if(from === 'USD' && to === 'CLP') {
            document.getElementById('usd-to-clp').querySelector('span').textContent = `${result.toFixed(2)}`;
        }
        if(from === 'EUR' && to === 'CLP') {
            document.getElementById('eur-to-clp').querySelector('span').textContent = `${result.toFixed(2)}`;
        }
    };

    form.addEventListener('submit', event => {
        event.preventDefault();
        convertCurrency();
    });
    fromCurrency.addEventListener('change', convertCurrency);
    toCurrency.addEventListener('change', convertCurrency);
    amountInput.addEventListener('input', convertCurrency);
});
