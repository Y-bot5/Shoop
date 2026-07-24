import {
    auth,
    onAuthStateChanged,
    signOut,
    updateProfile
} from "/Shoop/firebase.js";

import { toggleTheme } from "/Shoop/general.js";

/* --- Elements --- */
const avatar = document.getElementById("avatar");
const nameEl = document.getElementById("name");
const statusEl = document.getElementById("status");
const emailEl = document.getElementById("email");

const viewProfile = document.getElementById("viewProfile");
const editProfile = document.getElementById("editProfile");

const editBtn = document.getElementById("editBtn");
const logoutBtn = document.getElementById("logoutBtn");

const editName = document.getElementById("editName");
const editPhoto = document.getElementById("editPhoto");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const changeScheme = document.getElementById("changeScheme");
/* --- URL params --- */
const params = new URLSearchParams(location.search);
const viewedUsername = params.get("u");
const mode = params.get("mode");

if (!user.displayName) {
    const fallback = generateUsername(user.email);
    updateProfile(user, { displayName: fallback })
        .then(() => location.reload());
    return;
}

/* --- Initial state --- */
statusEl.textContent = "Loading...";

/* --- Auth --- */
onAuthStateChanged(auth, user => {
    if (!user) {
        location.replace("/Shoop/login/");
        return;
    }

    const myUsername = user.displayName;

    if (!mode) {
        if (!viewedUsername) {
            if (mode === "edit") {
                location.replace(
                    `/Shoop/profile?u=${encodeURIComponent(myUsername)}&mode=edit`
                )
            } else {
                location.replace(
                    `/Shoop/profile?u=${encodeURIComponent(myUsername)}&mode=view`
                );
            }
        }
        else if (mode === "edit") {
            location.replace(
                `/Shoop/profile?u=${encodeURIComponent(viewedUsername)}&mode=edit`
            )
        } else {
            location.replace(
                `/Shoop/profile?u=${encodeURIComponent(viewedUsername)}&mode=view`
            );
        }
    }
    // Block editing other users
    if (mode === "edit" && viewedUsername !== myUsername) {
        location.replace(
            `/Shoop/profile?u=${encodeURIComponent(viewedUsername)}&mode=view`
        );
        return;
    }

    /* --- VIEW MODE --- */
    if (mode === "view") {
        viewProfile.style.display = "block";
        editProfile.style.display = "none";

        editBtn.style.display = "inline-block";
        logoutBtn.style.display = "inline-block";

        emailEl.textContent =
            viewedUsername === myUsername ? user.email : "";

        statusEl.textContent = "Profile";
        avatar.src = user.photoURL || "/Shoop/noProfile.webp";
        nameEl.textContent = viewedUsername;
    }

    /* --- EDIT MODE --- */
    else if (mode === "edit") {
        viewProfile.style.display = "none";
        editProfile.style.display = "block";

        statusEl.textContent = "Edit Profile";
        emailEl.textContent = user.email;

        editBtn.style.display = "none";
        logoutBtn.style.display = "block";

        editName.value = user.displayName || "";
        editPhoto.value = user.photoURL || "";
    } else {
        location.replace(
            `/Shoop/profile?u=${encodeURIComponent(myUsername)}&mode=view`
        );
    }
});

document.title =
    mode === "edit"
        ? "Edit Profile | Shoop"
        : viewedUsername === myUsername
            ? "Your Profile | Shoop"
            : `${viewedUsername}'s Profile | Shoop`;

/* --- Buttons --- */

// Change colour scheme
changeScheme?.addEventListener("click", () => {
    toggleTheme();
})

// Enter edit mode
editBtn?.addEventListener("click", () => {
    const u = encodeURIComponent(viewedUsername);
    location.href = `/Shoop/profile?u=${u}&mode=edit`;
});

// Cancel edit
cancelBtn?.addEventListener("click", () => {
    const u = encodeURIComponent(viewedUsername);
    location.href = `/Shoop/profile?u=${u}`;
});

// Save changes
saveBtn?.addEventListener("click", async () => {
    await updateProfile(auth.currentUser, {
        displayName: editName.value.trim(),
        photoURL: editPhoto.value.trim()
    });

    const u = encodeURIComponent(editName.value.trim());
    location.href = `/Shoop/profile?u=${u}`;
});

// Logout
logoutBtn?.addEventListener("click", async () => {
    await signOut(auth);
    location.replace("/Shoop/login/");
});

setTimeout(() => {
    if (profileRoot.hidden) {
        statusEl.textContent = "Failed to load profile";
    }
}, 8000);