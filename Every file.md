# This contains infomation for every file
## HTML tags
### Right before \</body\>:
- \<script type="module"\>  
import { auth, onAuthStateChanged } from "/Shoop/firebase.js";  
  const profileIcon = document.getElementById("profileLink");  
onAuthStateChanged(auth, user => {  
  if (!profileIcon) return;  
  if (user) {  
    // Logged in → profile page  
    const profileName = user.displayName || user.email.split("@")[0];  
    profileIcon.href = \`/Shoop/profile/index.html?u=${encodeURIComponent(profileName)}\`;  
  } else {  
    // Logged out → login page  
    profileIcon.href = "/Shoop/login.html";  
  }  
});  
\</script\>  
---