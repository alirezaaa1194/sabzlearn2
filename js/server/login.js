import { login } from "../funcs/auth.js";

const loginBtn = document.querySelector(".login-btn");

loginBtn.addEventListener("click", login);
