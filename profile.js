import { auth, onAuthStateChanged } from "/Shoop/firebase.js";

const profileLink = document.getElementById("profileLink");
const profileIcon = document.getElementById("profileIcon");

onAuthStateChanged(auth, user => {
  if (user) {
    profileLink.href =
      `/Shoop/profile/?u=${encodeURIComponent(user.displayName)}`;
    profileIcon.src = user.photoURL || "/Shoop/noProfile.webp";
  } else {
    profileLink.href = "/Shoop/login.html";
    profileIcon.src = "/Shoop/noProfile.webp";
  }
});