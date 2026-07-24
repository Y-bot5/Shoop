import { auth, onAuthStateChanged } from "/Shoop/firebase.js";

const status = document.getElementById("status");
const profileLink = document.getElementById("profileLink");
const profileRoot = document.getElementById("other")

onAuthStateChanged(auth, user => {
    if (user) {
        status.textContent = `Hello, ${user.displayName || user.email}`;
        profileLink.href = `/Shoop/profile?u=${encodeURIComponent(user.displayName)}`;
        profileRoot.style.display = "block";
    } else {
        status.textContent = "Not logged in";
        profileLink.href = "/Shoop/login/";
        profileRoot.style.display = "block";
    }
});
