// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA06lOATs1M7jHL1Di9loQ5gfnYwMXOzE",
  authDomain: "terminal-anywhere.firebaseapp.com",
  projectId: "terminal-anywhere",
  storageBucket: "terminal-anywhere.firebasestorage.app",
  messagingSenderId: "1064711023364",
  appId: "1:1064711023364:web:11e43ccff34a1eb063be51",
  measurementId: "G-RXPTY92GQ9"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// GitHub Login Button
const githubLoginButton = document.getElementById('github-login-btn');
githubLoginButton.addEventListener('click', () => {
  const provider = new firebase.auth.GithubAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      showUserInfo(user);
    })
    .catch((error) => {
      console.error("Error during GitHub login:", error.message);
    });
});

// Logout Button
const logoutButton = document.getElementById('logout-btn');
logoutButton.addEventListener('click', () => {
  auth.signOut().then(() => {
    document.getElementById('user-info').style.display = 'none';
    githubLoginButton.style.display = 'block';
  }).catch((error) => {
    console.error("Error during logout:", error.message);
  });
});

// Show User Info
function showUserInfo(user) {
  document.getElementById('user-info').style.display = 'block';
  githubLoginButton.style.display = 'none';
  document.getElementById('user-pic').src = user.photoURL;
  document.getElementById('user-name').textContent = `Name: ${user.displayName}`;
  document.getElementById('user-email').textContent = `Email: ${user.email || "No public email"}`;
}
