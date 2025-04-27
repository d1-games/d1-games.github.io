document.addEventListener("DOMContentLoaded", function () {
    async function fetchGames() {
        try {
            let response = await fetch('/unlocked/home.html');
            let text = await response.text();

            let tempElement = document.createElement("div");
            tempElement.innerHTML = text;

            let gameContainers = tempElement.querySelectorAll(".game-container");
            document.getElementById("gameCount").textContent = gameContainers.length || 0;
        } catch (error) {
            console.error("Error fetching game data:", error);
            document.getElementById("gameCount").textContent = "Error";
        }
    }

    fetchGames();

    setInterval(fetchGames, 5000);
});
