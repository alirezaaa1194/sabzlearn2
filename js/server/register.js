import { register } from "../funcs/auth.js";
const $ = document;

const register_btn = $.querySelector(".register_btn");

register_btn.addEventListener("click", () => {
  register();
});
