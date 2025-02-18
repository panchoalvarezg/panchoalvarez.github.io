document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('converter-form');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const resultDiv = document.getElementById('result');

    // Fetch available currencies
    fetch('/api/currencies')
        .then(response => response.json())
        .then(data => {
            data.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrency.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrency.appendChild(option2);
            });
        });

    form.addEventListener('submit', event => {
        event.preventDefault();
        const amount = document.getElementById('amount').value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        fetch(`/api/convert?amount=${amount}&from=${from}&to=${to}`)
            .then(response => response.json())
            .then(data => {
                resultDiv.textContent = `${amount} ${from} = ${data.result} ${to}`;
            });
    });
});
