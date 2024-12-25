const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

if (signUpButton) {
  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });
}

if (signInButton) {
  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });
}

//////////////////////////////////////////////////////

let signupName = document.getElementById("signupName");
let signupEmail = document.getElementById("signupEmail");
let signupPassword = document.getElementById("signupPassword");
let signinEmail = document.getElementById("signinEmail");
let signinPassword = document.getElementById("signinPassword");

let pathparts = location.pathname.split("/");
let baseURL = "";
for (let i = 0; i < pathparts.length - 1; i++) {
  baseURL += "/" + pathparts[i];
}

let signUpArray = [];
let username = localStorage.getItem("sessionUsername");
if (username) {
  document.getElementById("username").innerHTML = "Welcome " + username;
}

if (localStorage.getItem("users") == null) {
  signUpArray = [];
} else {
  signUpArray = JSON.parse(localStorage.getItem("users"));
}

console.log("SignArray", signUpArray);

function isEmpty() {
  if (
    signupName.value == "" ||
    signupEmail.value == "" ||
    signupPassword.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

function isEmailExist() {
  for (var i = 0; i < signUpArray.length; i++) {
    // if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
    //   return false;
    // }
    return signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()
    
  }
}

function signUp() {
  if (isEmpty() == false) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
    return false;
  }

  var signUp = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  if (signupName.value || signupEmail.value || signupPassword.value) {
    signUpArray.push(signUp);
    console.log(signUpArray);
    localStorage.setItem("users", JSON.stringify(signUpArray));
    document.getElementById("exist").innerHTML =
      '<span class="text-success m-3">Success</span>';
  }
  if (isEmailExist() == true) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">email already exists</span>';
  } else {
    signUpArray.push(signUp);
    localStorage.setItem("users", JSON.stringify(signUpArray));
    document.getElementById("exist").innerHTML =
      '<span class="text-success m-3">Success</span>';
  }
}

function isLoginEmpty() {
  if (signinPassword.value == "" || signinEmail.value == "") {
    return false;
  } else {
    return true;
  }
}

function login(e) {
  e.preventDefault();
  console.log("in Login Fun");
  console.log("SignArray at Login", signUpArray);

  if (isLoginEmpty() == false) {
    document.getElementById("incorrect").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
    return false;
  }
  let password = signinPassword.value;
  let email = signinEmail.value;
  for (let i = 0; i < signUpArray.length; i++) {
    console.log("emil", email.toLowerCase());
    console.log("pass", password);
    console.log("emil in array", signUpArray[i].email.toLowerCase());
    console.log("pass in array", signUpArray[i].password);

    if (
      signUpArray[i].email.toLowerCase() == email.toLowerCase() &&
      signUpArray[i].password == password
    ) {
      console.log("IN ");

      localStorage.setItem("sessionUsername", signUpArray[i].name);

      location.href = "http://127.0.0.1:5500/home.html?#";
      console.log("out ");
    } else {
      document.getElementById("incorrect").innerHTML =
        '<span class="p-2 text-danger">incorrect email or password</span>';
    }
  }
}

function logout() {
  localStorage.removeItem("sessionUsername");
}
