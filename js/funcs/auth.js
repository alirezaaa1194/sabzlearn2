import {
  messageBox,
  showErrorMessage,
} from "../../components/messageBox/messageBox.js";

import {
  saveUserTokenIncookies,
  getUserTokenFromcookie,
  isUserLogedIn,
  mainRoute,
  checkPhonePattern,
  checkEmailPattern,
  redirectToPannel,
} from "./utils.js";

window.customElements.define("message-box", messageBox);

const $ = document;

window.addEventListener("load", () => {
  redirectToPannel();
});

const register = () => {
  const userName_input = $.querySelector(".userName_input");
  const phone_input = $.querySelector(".phone_input");
  const email_input = $.querySelector(".email_input");
  const password_input = $.querySelector(".password_input");

  let newUserDatas = {
    name: userName_input.value.trim(),
    username: userName_input.value.trim(),
    phone: phone_input.value.trim(),
    email: email_input.value.trim(),
    password: password_input.value.trim(),
    confirmPassword: password_input.value.trim(),
  };

  if (
    !userName_input.value ||
    !phone_input.value ||
    !email_input.value ||
    !password_input.value
  ) {
    showErrorMessage("لطفا تمامی فیلد هارا پرکنید", "error");
  } else {
    if (userName_input.value.length < 4) {
      showErrorMessage("نام کاربری باید بیشتر از 4 حرف باشد", "error");
    } else if (!checkPhonePattern(phone_input.value.trim())) {
      showErrorMessage("شماره تلفن نادرست است", "error");
    } else if (!checkEmailPattern(email_input.value.trim())) {
      showErrorMessage("ایمیل نادرست است", "error");
    } else if (password_input.value.length < 8) {
      showErrorMessage("رمز عبور باید بیشتر از 8 حرف باشد", "error");
    } else {
      fetch(`${mainRoute}auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserDatas),
      })
        .then((res) => {
          if (res.status === 409) {
            return false;
          } else if (res.status === 201) {
            return res.json();
          }
          console.log(res);
        })
        .then((res) => {
          if (res) {
            saveUserTokenIncookies(res.accessToken, 15);
            showErrorMessage("ثبت نام با موفقیت انجام شد", "success");
            setTimeout(() => {
              location.href = "https://alirezaaa1194.github.io/sabzlearn2/my-account/";
            }, 2000);
          } else {
            showErrorMessage("نام کاربری یا ایمیل، قبلا استفاده شده", "error");
          }
        });
    }
  }
};
const login = () => {
  const emailInput = $.querySelector(".email-input");
  const passwordInput = $.querySelector(".password-input");
  const dont_forget_me_input = $.querySelector("#dont_forget_me_input");

  let userInfos = {
    identifier: emailInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  fetch(`https://sabzlearn-project-backend.liara.run/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfos),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.accessToken) {
        showErrorMessage("ورود با موفقیت انجام شد", "success");
        if (dont_forget_me_input.checked) {
          saveUserTokenIncookies(result.accessToken, 15);
        } else {
          saveUserTokenIncookies(result.accessToken, 1);
        }

        setTimeout(() => {
          location.href = "https://alirezaaa1194.github.io/sabzlearn2/my-account/";
        }, 2000);
      } else {
        if (result.message && passwordInput.value) {
          showErrorMessage("رمز عبور اشتباه است", "error");
        } else {
          if (!emailInput.value && !passwordInput.value) {
            showErrorMessage("لطفا فیلد هارا پرکنید ", "error");
          } else if (!emailInput.value && passwordInput.value) {
            showErrorMessage("لطفا نام کاربری یا ایمیل را وارد کنید", "error");
          } else if (emailInput.value && !passwordInput.value) {
            showErrorMessage("لطفا رمزعبور را وارد کنید", "error");
          } else {
            showErrorMessage("نام کاربری یافت نشد. لطفا ثبت نام کنید", "error");
          }
        }
      }
    });
};

export { register, login };
