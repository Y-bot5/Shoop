import { auth, onAuthStateChanged } from "/Shoop/firebase.js";
const profileLink = document.getElementById("profileLink");
const profileIcon = document.getElementById("avatar");
const topbar = document.querySelector(".topbar");

onAuthStateChanged(auth, user => {
  if (user) {
    profileLink.href =
      `/Shoop/profile/?u=${encodeURIComponent(user.displayName)}`;
    profileIcon.src = user.photoURL || "/Shoop/noProfile.webp";
    topbar.style.display = "block";
  } else {
    profileLink.href = "/Shoop/login/";
    profileIcon.src = "/Shoop/noProfile.webp";
  }
});

menuBtn.onclick = () => {
  alert("Menu coming soon 👀");
};