import {
    auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged
} from "/Shoop/firebase.js";

const loginForm = document.getElementById("loginForm");

loginForm.onsubmit = async (e) => {
    e.preventDefault();


    async function generateUsername(email) {
        const base = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
        const rand = Math.floor(Math.random() * 10000);
        return `${base}-${rand}`;

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        try {
            await signInWithEmailAndPassword(auth, email, password);

        } catch (err) {
            if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
                const cred = await createUserWithEmailAndPassword(auth, email, password);

                const username = generateUsername(email);
            }

            await updateProfile(cred.user, {
                displayName: email.split("@")[0],
                photoURL: "/Shoop/noProfile.webp"
            });
        }
    }

    location.replace("/Shoop/home/");
};