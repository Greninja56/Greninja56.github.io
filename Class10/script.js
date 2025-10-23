const newQuoteBtn = document.querySelector('#js-new-quote');
const apiEndpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';

newQuoteBtn.addEventListener('click', getQuote);

function getQuote() {
    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayQuote(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('Failed to fetch a quote. Please try again.');
        });
}

function displayQuote(data) {
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = data.question;
}

getQuote();
