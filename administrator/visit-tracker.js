document.addEventListener("DOMContentLoaded", async function () {
    // Ensure localStorage has valid default values
    let visits = JSON.parse(localStorage.getItem("visitData")) || { trackedIPs: [], totalVisits: 0 };
    
    // Ensure sessionStorage tracks online sessions
    let onlineSessions = JSON.parse(sessionStorage.getItem("onlineSessions") || "[]");

    async function getIPAddress() {
        try {
            let response = await fetch('https://api64.ipify.org?format=json');
            let data = await response.json();
            return data.ip;
        } catch (error) {
            console.error("Error getting IP address:", error);
            return null;
        }
    }

    let ip = await getIPAddress();

    if (ip && Array.isArray(visits.trackedIPs) && !visits.trackedIPs.includes(ip)) {
        visits.trackedIPs.push(ip);
        visits.totalVisits++;
        localStorage.setItem("visitData", JSON.stringify(visits));
    }

    if (ip && Array.isArray(onlineSessions) && !onlineSessions.includes(ip)) {
        onlineSessions.push(ip);
        sessionStorage.setItem("onlineSessions", JSON.stringify(onlineSessions));
    }

    function updateCounters() {
        let storedVisits = JSON.parse(localStorage.getItem("visitData")) || { totalVisits: 0 };
        let storedSessions = JSON.parse(sessionStorage.getItem("onlineSessions") || "[]");

        document.getElementById('totalVisits').textContent = storedVisits.totalVisits || 0;
        document.getElementById('onlineSessions').textContent = storedSessions.length || 0;
    }

    updateCounters();

    setInterval(updateCounters, 5000);
});