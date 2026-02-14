import { auth, onAuthStateChanged } from "/Shoop/firebase.js";
const profileLink = document.getElementById("profileLink");
const profileIcon = document.getElementById("avatar");
const topbar = document.querySelector(".topbar");
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
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

export function toggleTheme() {
  const root = document.documentElement;

  const next =
    root.dataset.theme === "dark" ? "light" : "dark";

  root.dataset.theme = next;
  localStorage.setItem("theme", next);
}

export function loadTheme() {
  const saved =
    localStorage.getItem("theme") || (isDarkMode ? "dark" : "light");

  document.documentElement.dataset.theme = saved;
}

menuBtn.onclick = () => {
  alert("Menu coming soon 👀");
};