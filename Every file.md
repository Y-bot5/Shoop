# This contains infomation for every file
## HTML tags
### In \<header\>
---
- \<a id="profileLink" href="/Shoop/login.html"\>  
\<img id="profileIcon" src="/Shoop/noProfile.webp" width="32" height="32"\>  
\</a\>
### Before \</body\>
---
- \<script type="module"\>  
import { auth, onAuthStateChanged } from "/Shoop/firebase.js";  
const profileLink = document.getElementById("profileLink");  
const profileIcon = document.getElementById("profileIcon");  
onAuthStateChanged(auth, user => {  
  if (user) {  
    profileLink.href = "/Shoop/profile/index.html";  
    profileIcon.src = user.photoURL || "/Shoop/noProfile.webp";  
    profileIcon.alt = user.displayName || "Profile";  
  } else {  
    profileLink.href = "/Shoop/login.html";  
    profileIcon.src = "/Shoop/noProfile.webp";  
    profileIcon.alt = "Login";  
  }  
});  
\</script\>
---