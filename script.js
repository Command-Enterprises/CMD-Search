const container = document.querySelector(".container");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const searchResults = document.getElementById("search-results");

async function performSearch(query) {
    searchResults.textContent = "Searching...";

    const duckDuckGoEndpoint = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;

    try {
        const response = await fetch(duckDuckGoEndpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.Results && data.Results.length > 0) {
            searchResults.innerHTML = data.Results.map(result => {
                return `
                    <div class="result-item">
                        <div class="result-text">
                            <a href="${result.FirstURL}" class="result-title" target="_blank">${result.Text}</a>
                            <p class="result-link">${result.FirstURL}</p>
                        </div>
                    </div>
                `;
            }).join("");
        } else {
            if(data.AbstractURL.length > 0){
                console.log(data.AbstractURL)
                console.log(data.AbstractSource)
                searchResults.innerHTML = data.Results.map(result => {
                return `
                    <div class="result-item">
                        <div class="result-text">
                            <a href="${result.AbstractURL}" class="result-title" target="_blank">${result.AbstractSource}</a>
                            <p class="result-link">${data.AbstractURL}</p>
                        </div>
                    </div>
                `;
            })
        }
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
