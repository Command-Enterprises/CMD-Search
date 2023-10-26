async function performSearch(query) {
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.textContent = "Searching...";

    const duckDuckGoEndpoint = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;

    try {
        const response = await fetch(duckDuckGoEndpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.Results && data.Results.length > 0) {
            resultsContainer.innerHTML = data.Results.map(result => `<div><a href="${result.FirstURL}" target="_blank">${result.Text}</a></div>`).join("");
        } else {
            resultsContainer.textContent = "No results found.";
        }
    } catch (error) {
        console.error("Error fetching search results:", error);
        resultsContainer.textContent = "Error fetching search results.";
    }

    history.pushState({}, "", `/q=${encodeURIComponent(query)}`);
}

document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const query = document.getElementById("search-input").value;
    performSearch(query);
});

const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get('q');
if (queryParam) {
    document.getElementById("search-input").value = queryParam;
    performSearch(queryParam);
}
