import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut }
  from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js';

// Authentication reference
const auth = getAuth();

// DOM Elements references
const userBar = document.querySelector('#user-bar');
const userLabel = document.querySelector('#user-label');
const authInfo = document.querySelector('#auth-info');
const authFormLoader = document.querySelector('#auth-form-loader');
const authButtonsSection = document.querySelector('#auth-buttons-section');

// DOM Forms references
const productForm = document.querySelector('#product-form');
const authForm = document.querySelector('#auth-form');

// DOM Inputs references
const inputEmail = document.querySelector('#input-email');
const inputPassword = document.querySelector('#input-password');

// DOM Buttons references
const signInButton = document.querySelector('#sign-in-button');
const signUpButton = document.querySelector('#sign-up-button');
const signOutButton = document.querySelector('#sign-out-button');

/* BUTTONS EVENTS */
signInButton.onclick = CheckSignIn;
signUpButton.onclick = CheckSignUp;
signOutButton.onclick = SignOut;


/* --------------------------------------------------- */
/* CONTROL USER SIGN IN, UP AND OUT */

// Process to sign up a new user
function CheckSignUp() {
  if (inputEmail.value != '' && inputPassword.value != '') SingUp();
  else authInfo.innerHTML = 'Ingresá CORREO ELECTRONICO y CONTRASEÑA.';
  AnimateAuthInfo();
}

// Process to log in a user
function CheckSignIn() {
  if (inputEmail.value != '' && inputPassword.value != '') SignIn();
  else authInfo.innerHTML = 'Ingresá CORREO ELECTRONICO y CONTRASEÑA.';
  AnimateAuthInfo();
}

// Function to create a new user with email and password
function SingUp() {
  let email = inputEmail.value;
  let password = inputPassword.value;

  ShowAuthLoader(true);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      SetUserSignIn(user.email);
      ClearAuthInputs();
      ShowAuthLoader(false);
    })
    .catch((error) => {
      // Error signed in
      console.error(error.code);
      console.error(error.message);

      ShowErrorInfo(error.code);
      AnimateAuthInfo();
      ShowAuthLoader(false);
    });
}

// Function to sign in a user
function SignIn() {
  let email = inputEmail.value;
  let password = inputPassword.value;

  ShowAuthLoader(true);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      SetUserSignIn(user.email);
      ClearAuthInputs();
      ShowAuthLoader(false);
    })
    .catch((error) => {
      // Error signed in
      console.error(error.code);
      console.error(error.message);

      ShowErrorInfo(error.code);
      AnimateAuthInfo();
      ShowAuthLoader(false);
    });
}

//Function to sign out a user
function SignOut() {
  signOut(auth).then(() => {
    SetUserSignOut();
  }).catch((error) => {
    console.error(error);
  });
}

window.addEventListener('onload', () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      SetUserSignIn(user.email);
    } else {
      // User is signed out
      SetUserSignOut();
    }
  });
});


/* --------------------------------------------------- */
/* CONTROL DOM ELEMENTS FOR UI/UX */

// Function to controll loading view
function ShowAuthLoader(show) {
  if (show) {
    // Hide DOM Elements
    authButtonsSection.style.display = 'none';
    // Show loader
    authFormLoader.style.display = 'inline-block';
  }
  else {
    // Show DOM Elements
    authButtonsSection.style.display = 'flex';
    // Show loader
    authFormLoader.style.display = 'none';
  }
}

function ShowErrorInfo(errorCode) {
  if (errorCode == 'auth/invalid-email')
    authInfo.innerHTML = 'CORREO ELECTRONICO INVALIDO :(';

  else if (errorCode == 'auth/email-already-in-use')
    authInfo.innerHTML = 'CORREO ELECTRONICO ya se ha registrado.';

  else if (errorCode == 'auth/user-not-found')
    authInfo.innerHTML = 'CORREO ELECTRONICO no se ha registrado.';

  else if (errorCode == 'auth/invalid-password')
    authInfo.innerHTML = 'CONTRASEÑA INVALIDA :(';

  else if (errorCode == 'auth/weak-password')
    authInfo.innerHTML = 'CONTRASEÑA debe tener al menos 6 CARACTERES.';

  else
    authInfo.innerHTML = 'ERROR INESPERADO :(';
}

// Function to set interface when user is sign in
function SetUserSignIn(userEmail) {
  userBar.style.display = 'flex';
  productForm.style.display = 'flex'
  authForm.style.display = 'none'
  userLabel.innerHTML = userEmail;
}

// Function to set interface when user is sign out
function SetUserSignOut() {
  userBar.style.display = 'none';
  productForm.style.display = 'none'
  authForm.style.display = 'flex'
  userLabel.innerHTML = '';
}

// Function to clear all inputs elements
function ClearAuthInputs() {
  inputEmail.value = '';
  inputPassword.value = '';
}

function AnimateAuthInfo() {
  authInfo.animate([
    // fotogramas clave
    { transform: 'scale(1)' },
    { transform: 'scale(1.1)' },
    { transform: 'scale(1)' }
  ], {
    // opciones de sincronización
    duration: 250,
    iterations: 1
  });
}
