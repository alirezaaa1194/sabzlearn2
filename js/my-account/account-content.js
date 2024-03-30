import { getUserInfo, mainRoute, updateUser } from "../funcs/utils.js";
import {
  messageBox,
  showErrorMessage,
} from "../../components/messageBox/messageBox.js";
window.customElements.define("message-box", messageBox);

const phone_number_input = document.querySelector(".phone_number_input");
const firstName_input = document.querySelector(".firstName_input");
const userName_input = document.querySelector(".userName_input");
const email_input = document.querySelector(".email_input");
const new_password = document.querySelector(".new_password");

const save_info_btn = document.querySelector(".save_info_btn");
const user_profile = document.querySelector(".user_profile");

window.addEventListener("load", () => {
  getUserInfo().then((data) => {
    phone_number_input.value = data.phone;
    firstName_input.value = data.name;
    userName_input.value = data.username;
    email_input.value = data.email;
    user_profile.src = data.profile || "../images/user.png";
    console.log(data);
  });
});

save_info_btn.addEventListener("click", () => {
  updateUser().then((res) => {
    if (res.status === 200) {
      showErrorMessage("اطلاعات با موفقیت تغییر یافت", "success");
    } else if (res.status === 400) {
      showErrorMessage("لطفا رمز عبور را واردکنید", "error");
    } else {
      showErrorMessage("خطای غیر منتظره رخ داد", "error");
    }
  });
});
