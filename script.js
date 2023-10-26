async function performSearch() {
    const searchInput = document.getElementById("search-input").value;
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.textContent = "Searching...";

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?q=${searchInput}`);
        const data = await response.json();

        if (data.length > 0) {
            resultsContainer.innerHTML = data.map(post => `<div>${post.title}</div>`).join("");
        } else {
            resultsContainer.textContent = "No results found.";
        }
    } catch (error) {
        console.error("Error fetching search results:", error);
        resultsContainer.textContent = "Error fetching search results.";
    }
}

document.getElementById("search-button").addEventListener("click", performSearch);

document.getElementById("search-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        performSearch();
    }
});
