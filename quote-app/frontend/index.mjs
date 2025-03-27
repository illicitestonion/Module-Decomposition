const server = "https://illicitonion-quote-server-backend.hosting.codeyourfuture.io";

const fetchQuote = async () => {
    const rawResponse = await fetch(server);
    if (!rawResponse.ok) {
        displayFeedback("Error fetching quote", rawResponse);
        return;
    }
    try {
    const response = await rawResponse.json();
        const {author, quote} = response;
        const quoteElement = document.querySelector("#quote-template").content.cloneNode(true);
        quoteElement.querySelector(".quote").innerText = quote;
        quoteElement.querySelector(".author").innerText = author;
        const container = document.querySelector("#quote-container");
        container.innerText = "";
        container.appendChild(quoteElement);
    } catch (e) {
        displayFeedback("Error fetching quote", e);
    }
};

const saveQuote = async (event) => {
    event.preventDefault();
    const quote = takeValue("#quote");
    const author = takeValue("#author");

    const rawResponse = await fetch(server, {
        "method": "POST",
        "body": JSON.stringify({
            quote,
            author,
        }),
    });
    if (!rawResponse.ok) {
        displayFeedback("Error saving quote", rawResponse);
        return;
    }
    displayFeedback("Quote saved");
};

const takeValue = (selector) => {
    const element = document.querySelector(selector);
    const value = element.value;
    element.value = "";
    return value;
};

const displayFeedback = (message, error) => {
    const feedbackElement = document.querySelector("#feedback");
    if (error) {
        console.error(error);
        feedbackElement.classList.add("error");
    } else {
        feedbackElement.classList.remove("error");
    }
    feedbackElement.innerText = message;
}

document.querySelector("#fetch-quote").addEventListener("click", fetchQuote);
document.querySelector("#save-quote").addEventListener("click", saveQuote);

fetchQuote();
