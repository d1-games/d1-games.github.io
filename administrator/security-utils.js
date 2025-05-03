let failedAttempts = 0;

function rateLimitLogin() {
    if (failedAttempts >= 3) {
        alert("Too many failed attempts. Try again later.");
        return false;
    }
    return true;
}

function createSession() {
    localStorage.setItem("adminAuthenticated", "true");
}

function verifySession() {
    return localStorage.getItem("adminAuthenticated") === "true";
}