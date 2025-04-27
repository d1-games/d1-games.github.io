document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("passcode-form");
    if (!form) {
        console.error("Error: 'passcode-form' not found. Ensure the ID is correctly set in HTML.");
        return;
    }

    const errorMessage = document.getElementById("error-message");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const usernameInput = document.getElementById("username").value;
        const passwordInput = document.getElementById("passcode").value;

        try {
            const response = await fetch("/administrator/admin-credentials.json");
            const data = await response.json();

            // Decode Base64 credentials (No reversal)
            const storedUsername = atob(data.credentials.authBlock.backup.value);
            const storedPassword = atob(data.credentials.authBlock.token);

            console.log("Decoded Username:", storedUsername);
            console.log("Decoded Password:", storedPassword);

            if (usernameInput === storedUsername && passwordInput === storedPassword) {
                localStorage.setItem("adminAuthenticated", "true");
                window.location.href = "/administrator/admin-panel.html";  
            } else {
                failedAttempts++;
                errorMessage.classList.add("show");
                errorMessage.style.display = "block";
                errorMessage.style.opacity = "1";
                errorMessage.innerText = "Incorrect username or password.";
            }
        } catch (error) {
            console.error("Error fetching credentials:", error);
        }
    });
});