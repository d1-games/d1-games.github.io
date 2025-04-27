document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname;
    const isLoggedIn = localStorage.getItem("adminAuthenticated") === "true";

    if (!isLoggedIn && currentPage !== "/administrator/admin-login.html") {
        window.location.href = "/administrator/admin-login.html";
    }
});