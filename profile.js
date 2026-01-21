import { auth, onAuthStateChanged } from "./firebase.js";
const profileLink = document.getElementById("profileLink");
const profileIcon = document.getElementById("avatar");

onAuthStateChanged(auth, user => {
  if (user) {
    profileLink.href =
      `/Shoop/profile/?u=${encodeURIComponent(user.displayName)}`;
    profileIcon.src = user.photoURL || "/Shoop/noProfile.webp";
  } else {
    profileLink.href = "/Shoop/login/";
    profileIcon.src = "/Shoop/noProfile.webp";
  }
});

menuBtn.onclick = () => {
  alert("Menu coming soon 👀");
};