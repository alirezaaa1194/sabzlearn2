import { redirectToLoginPage, getUserInfo } from "../funcs/utils.js";
const menu_bar = document.querySelector(".menu_bar");
const cover = document.querySelector(".cover");
const open_aside_btn = document.querySelector(".open_aside_btn");
const close_menu_bar = document.querySelector(".close_menu_bar");

const UserAccountBtn = document.querySelector(".UserAccountBtn");
const userInfoCard = document.querySelector(".userInfoCard");

const userName_label = document.querySelector(".userName");

const dropDownAccountCover = document.querySelector(".dropDownAccountCover");

const notification_btn = document.querySelector(".notification_btn");
const notification_dropdown = document.querySelector(".notification_dropdown");
const notificationDropDownCover = document.querySelector(
  ".notificationDropDownCover"
);

window.addEventListener("load", () => {
  redirectToLoginPage();
  getUserInfo().then((data) => {
    userName_label.innerHTML = data.name;
  });
});

function menuBarHandler() {
  menu_bar.classList.toggle("active");
  cover.classList.toggle("active");
}
open_aside_btn.addEventListener("click", menuBarHandler);
close_menu_bar.addEventListener("click", menuBarHandler);
cover.addEventListener("click", menuBarHandler);

function openAndCloseDropdown() {
  userInfoCard.classList.toggle("active");
  dropDownAccountCover.classList.toggle("active");
}

UserAccountBtn.addEventListener("click", openAndCloseDropdown);
dropDownAccountCover.addEventListener("click", openAndCloseDropdown);

// start darkmode codes
const SwitchTeheme = document.querySelector(".SwitchTeheme");
const SwitchTehemeIcon = document.querySelector(".SwitchTeheme i");
let isDark;

window.onload = function () {
  if (localStorage.getItem("theme") === null) {
    isDark = false;
  } else {
    if (localStorage.getItem("theme") == "light") {
      isDark = false;
    } else {
      isDark = true;
    }
  }
  if (isDark == false) {
    SwitchTehemeIcon.classList.replace("fa-sun", "fa-moon");
  } else {
    SwitchTehemeIcon.classList.replace("fa-moon", "fa-sun");
  }
  changeThemeMode();
};

SwitchTeheme.addEventListener("click", function (event) {
  if (isDark == false) {
    SwitchTehemeIcon.classList.replace("fa-moon", "fa-sun");
    isDark = true;
    localStorage.setItem("theme", "dark");
  } else {
    SwitchTehemeIcon.classList.replace("fa-sun", "fa-moon");
    isDark = false;
    localStorage.setItem("theme", "light");
  }
  changeThemeMode();
});

function changeThemeMode() {
  if (isDark == true) {
    //dark
    document.documentElement.style.setProperty("--lightColor", "rgb(28 28 40)");
    document.documentElement.style.setProperty(
      "--primaryLightColor",
      "rgb(28 28 40)"
    );
    document.documentElement.style.setProperty(
      "--borderColor",
      "rgb(50 51 77)"
    );
    document.documentElement.style.setProperty("--hoverColor", "rgb(28 28 40)");
    document.documentElement.style.setProperty(
      "--hoverBorderColor",
      "rgb(119 124 148)"
    );
    document.documentElement.style.setProperty(
      "--secondDynamicCoor",
      "rgb(50 51 77)"
    );
    document.documentElement.style.setProperty("--TextLightColor", "#fff");
    document.documentElement.style.setProperty(
      "--activeMenuItem2Hover",
      "#fff"
    );
    document.documentElement.style.setProperty("--cardTextColor", "#fff");
    document.documentElement.style.setProperty("--mainColor", "rgb(28 28 40)");
    document.documentElement.style.setProperty(
      "--FerechexHoverColor",
      "rgb(74 75 109)"
    );
    document.documentElement.style.setProperty(
      "--Warning-bg-color",
      "40, 41, 61"
    );
    document.documentElement.style.setProperty(
      "--category-color",
      "rgb(250 204 21)"
    );
    document.documentElement.style.setProperty(
      "--category-bg-color",
      "rgb(250 204 21 / 0.1)"
    );
    document.documentElement.style.setProperty(
      "--SecondTextLightColor",
      "rgb(148 163 184)"
    );
    document.documentElement.style.setProperty(
      "--bannerRedColor",
      "rgb(239 68 68)"
    );

    document.documentElement.style.setProperty(
      "--comment_background",
      "rgb(50 51 77)"
    );
    document.documentElement.style.setProperty(
      "--reply_background",
      "rgb(74 75 109)"
    );
    document.documentElement.style.setProperty(
      "--textarea_background",
      "rgb(50 51 77)"
    );

    document.documentElement.style.setProperty(
      "--textarea_color",
      "rgb(100 116 139)"
    );
    document.documentElement.style.setProperty("--blue_btn", "14 165 233");

    document.documentElement.style.setProperty("--blue_btn", "rgb(78 129 251)");
    document.documentElement.style.setProperty(
      "--blue_btn_hover",
      "rgb(37 99 235)"
    );

    document.documentElement.style.setProperty("--cancel_btn", "rgb(50 51 77)");
    document.documentElement.style.setProperty(
      "--cancel_btn_hover",
      " rgb(74 75 109 )"
    );

    document.documentElement.style.setProperty(
      "--video_download_bg_color",
      "46, 213, 115, .1"
    );
    document.documentElement.style.setProperty(
      "--video_download_color",
      "46, 213, 115"
    );

    document.documentElement.style.setProperty(
      "--video_download_hover_bg_color",
      "46, 213, 115, .1"
    );

    document.documentElement.style.setProperty(
      "--file_download_bg_color",
      "250, 204, 21, .1"
    );
    document.documentElement.style.setProperty(
      "--file_download_color",
      "250, 204, 21, 1"
    );
    document.documentElement.style.setProperty(
      "--file_download_hover_bg_color",
      "250, 204, 21, .1"
    );

    document.documentElement.style.setProperty(
      "--session_accordion_body_bg",
      "rgb(40 41 61)"
    );

    document.documentElement.style.setProperty(
      "--session_accordion_hover_body_bg",
      "rgb(50 51 77)"
    );
  } else {
    //light
    document.documentElement.style.setProperty("--lightColor", "#fff");
    document.documentElement.style.setProperty(
      "--primaryLightColor",
      "rgb(243 244 246)"
    );
    document.documentElement.style.setProperty(
      "--borderColor",
      "rgb(243 244 246)"
    );
    document.documentElement.style.setProperty(
      "--hoverColor",
      "rgb(229 231 235)"
    );
    document.documentElement.style.setProperty(
      "--hoverBorderColor",
      "rgb(243 244 246)"
    );
    document.documentElement.style.setProperty("--secondDynamicCoor", "#fff");
    document.documentElement.style.setProperty(
      "--TextLightColor",
      "rgb(63 63 70)"
    );
    document.documentElement.style.setProperty(
      "--activeMenuItem2Hover",
      "#000"
    );
    document.documentElement.style.setProperty(
      "--cardTextColor",
      "rgb(100 116 139)"
    );
    document.documentElement.style.setProperty(
      "--mainColor",
      "rgb(243 244 246)"
    );
    document.documentElement.style.setProperty(
      "--FerechexHoverColor",
      "rgb(243 244 246)"
    );
    document.documentElement.style.setProperty(
      "--Warning-bg-color",
      "255, 255, 255"
    );
    document.documentElement.style.setProperty(
      "--category-color",
      "rgb(78 129 251)"
    );
    document.documentElement.style.setProperty(
      "--category-bg-color",
      "rgb(14 165 233 / 0.1)"
    );
    document.documentElement.style.setProperty(
      "--SecondTextLightColor",
      "rgb(100 116 139)"
    );

    document.documentElement.style.setProperty(
      "--bannerRedColor",
      "rgb(236 72 153)"
    );

    document.documentElement.style.setProperty(
      "--comment_background",
      "rgb(243 244 246)"
    );

    document.documentElement.style.setProperty(
      "--reply_background",
      "rgb(229 231 235)"
    );
    document.documentElement.style.setProperty(
      "--textarea_background",
      "rgb(243 244 246)"
    );
    document.documentElement.style.setProperty(
      "--textarea_color",
      " rgb(100 116 139)"
    );

    document.documentElement.style.setProperty("--blue_btn", "rgb(14 165 233)");
    document.documentElement.style.setProperty(
      "--blue_btn_hover",
      "rgb(2 132 199)"
    );
    document.documentElement.style.setProperty(
      "--cancel_btn",
      " rgb(229 231 235)"
    );
    document.documentElement.style.setProperty(
      "--cancel_btn_hover",
      " rgb(209 213 219)"
    );

    document.documentElement.style.setProperty(
      "--video_download_bg_color",
      "46, 213, 115, 1"
    );
    document.documentElement.style.setProperty(
      "--video_download_color",
      " 255, 255, 255"
    );
    document.documentElement.style.setProperty(
      "--video_download_hover_bg_color",
      "34, 197, 94"
    );
    document.documentElement.style.setProperty(
      "--file_download_bg_color",
      "250, 204, 21, 1"
    );
    document.documentElement.style.setProperty(
      "--file_download_color",
      "255, 255, 255"
    );
    document.documentElement.style.setProperty(
      "--file_download_hover_bg_color",
      "249, 161, 52"
    );

    document.documentElement.style.setProperty(
      "--session_accordion_body_bg",
      "rgb(255, 255, 255)"
    );
    document.documentElement.style.setProperty(
      "--session_accordion_hover_body_bg",
      "rgb(255, 255, 255)"
    );
  }
}
// finish darkmode codes

function notificationDropDownHandler() {
  notification_dropdown.classList.toggle("active");
  notificationDropDownCover.classList.toggle("active");
  notification_btn.classList.toggle("active");
}
notification_btn.addEventListener("click", notificationDropDownHandler);
notificationDropDownCover.addEventListener(
  "click",
  notificationDropDownHandler
);



let welcom_text=document.querySelectorAll('.welcom_text')
function setUserNameLabel(){
  getUserInfo().then(info=>{
    welcom_text.forEach(label=>{
      label.innerHTML=info.name
    })
  })
}
setUserNameLabel()