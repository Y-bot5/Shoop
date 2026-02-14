import { auth, onAuthStateChanged } from "/Shoop/firebase.js";
const profileLink = document.getElementById("profileLink");
const profileIcon = document.getElementById("avatar");
const topbar = document.querySelector(".topbar");
const isDarkMode = window.matchMedia('(prefers-color-scheme: Dark)').matches;
const isLightMode = !isDarkMode;
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const other = document.querySelector(".other")

onAuthStateChanged(auth, user => {
  if (user) {
    profileLink.href =
      `/Shoop/profile/?u=${encodeURIComponent(user.displayName)}`;
    profileIcon.src = user.photoURL || "/Shoop/noProfile.webp";
    topbar.style.display = "flex";
    other.style.display = "block";
  } else {
    profileLink.href = "/Shoop/login/";
    profileIcon.src = "/Shoop/noProfile.webp";
  }
});

if (isLightMode) {
  dark.style.display = "none";
  light.style.display = "block";
} if (isDarkMode) {
  dark.style.display = "block";
  light.style.display = "none";
}

menuBtn.onclick = () => {
  alert("Menu coming soon 👀");
};