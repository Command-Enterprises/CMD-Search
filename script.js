const container = document.querySelector(".container");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const searchResults = document.getElementById("search-results");
const googleApiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your Google API key
const cx = 'YOUR_CX_VALUE'; // Replace with your Custom Search Engine ID (CX)

async function performSearch(query) {
    searchResults.textContent = "Searching...";

    const googleSearchEndpoint = `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(googleSearchEndpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.items && data.items.length > 0) {
            searchResults.innerHTML = data.items.map(result => {
                return `
                    <div class="result-item">
                        <div class="result-text">
                            <a href="${result.link}" class="result-title" target="_blank">${result.title}</a>
                            <p class="result-link">${result.link}</p>
                        </div>
                    </div>
                `;
            }).join("");
        } else {
            searchResults.textContent = "No results found.";
        }
    } catch (error) {
        console.error("Error fetching search results:", error);
        searchResults.textContent = "Error fetching search results.";
    }
}

searchForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const query = searchInput.value;
    await performSearch(query);
    history.pushState({}, "", `/search?q=${encodeURIComponent(query)}`);
});

