document.addEventListener("DOMContentLoaded", function () {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
        #incognito-banner {
            position: fixed;
            bottom: 50px; /* Raised above taskbar */
            right: 15px;
            background-color: #333;
            color: white;
            padding: 8px 12px;
            font-size: 12px;
            font-family: Arial, sans-serif;
            border-radius: 6px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            transition: background-color 0.3s ease-in-out;
            z-index: 9999;
        }
    `;
    document.head.appendChild(styleTag);

    const incognitoBanner = document.createElement("div");
    incognitoBanner.innerText = "CTRL+ALT+I for Incognito Mode";
    incognitoBanner.id = "incognito-banner";
    document.body.appendChild(incognitoBanner);

    const incognitoButton = document.getElementById("incognito-link");
    if (incognitoButton) {
        incognitoButton.addEventListener("click", activateIncognito);
    }

    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "i") {
            activateIncognito();
        }
    });

    function activateIncognito() {
        window.location.href = "/unlocked/incognito.html";

        setTimeout(() => {
            window.open("https://myapps.classlink.com/home", "_blank");
        }, 1000);
    }
});