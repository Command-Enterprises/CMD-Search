const container = document.querySelector(".container");
const title = document.querySelector(".title");
const subtitle = document.querySelector(".subtitle");
const urlInput = document.getElementById("url-input");
const webFrame = document.getElementById("web-frame");

// Function to animate elements to the top of the site
function animateToTop() {
  container.style.justifyContent = "flex-start";
  title.style.fontSize = "30px";
  subtitle.style.fontSize = "14px";
  urlInput.style.fontSize = "14px";
  container.style.padding = "10px";
}

// Add event listener to input field for animation
urlInput.addEventListener("focus", animateToTop);

// Event listener for the "Go" button to load the URL
document.getElementById("go-button").addEventListener("click", () => {
  const url = urlInput.value;
  webFrame.src = url;
});


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
