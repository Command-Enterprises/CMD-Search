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
            resultsContainer.innerHTML = data.Results.map(result => {
                const iconURL = result.Icon && result.Icon.URL ? result.Icon.URL : 'https://example.com/default-icon.png'; // Replace with your default icon URL
                return `
                    <div class="result-item">
                        <img class="result-icon" src="${iconURL}" alt="Result Icon">
                        <div class="result-details">
                            <a href="${result.FirstURL}" target="_blank" class="result-title">${result.Text}</a>
                            <p class="result-url">${result.FirstURL}</p>
                        </div>
                    </div>
                `;
            }).join("");
        } else {
            resultsContainer.textContent = "No results found.";
        }
    } catch (error) {
        console.error("Error fetching search results:", error);
        resultsContainer.textContent = "Error fetching search results.";
    }
}

document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const query = document.getElementById("search-input").value;
    performSearch(query);
    history.pushState({}, "", `/search?q=${encodeURIComponent(query)}`);
});

// Load results if query is present in the URL
const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get('q');
if (queryParam) {
    document.getElementById("search-input").value = queryParam;
    performSearch(queryParam);
}
