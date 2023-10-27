const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

function animateToTopCenter() {
    searchForm.classList.add("top-center");
    searchForm.classList.remove("middle-center", "animated-up");
}

function animateToMiddleCenter() {
    searchForm.classList.add("middle-center", "animated-up");
    searchForm.classList.remove("top-center");
}

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
                        <div class="result-details">
                            <a href="${result.FirstURL}" target="_blank" class="result-title">${result.Text}</a>
                            <p class="result-url">${result.FirstURL}</p>
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

searchInput.addEventListener("input", function() {
    if (searchInput.value.trim() !== "") {
        animateToTopCenter();
    } else {
        animateToMiddleCenter();
    }
});

searchForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const query = searchInput.value;
    await performSearch(query);
    history.pushState({}, "", `/search?q=${encodeURIComponent(query)}`);
    animateToTopCenter();
});

// Load results if query is present in the URL
const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get('q');
if (queryParam) {
    searchInput.value = queryParam;
    performSearch(queryParam).then(() => animateToTopCenter());
}
