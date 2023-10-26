function handleKeyPress(event) {
    const cmdOrCtrlKey = event.metaKey || event.ctrlKey;
    const fKey = event.key.toLowerCase();
    if (cmdOrCtrlKey && fKey === "f") {
        performSearch();
        event.preventDefault();
    }
}

function performSearch() {
    alert("Performing search!");
}

document.addEventListener("keydown", handleKeyPress);
