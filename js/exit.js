import {
  getUserTokenFromcookie,
  isUserLogedIn,
  logOut,
  redirectToLoginPage,
} from "./funcs/utils.js";

const exitBtns = document.querySelectorAll(".exit-Btn");

exitBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    logOut(getUserTokenFromcookie());
    location.reload()
  });
});
