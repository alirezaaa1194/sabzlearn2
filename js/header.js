import { isUserLogedIn, getUserInfo, getMenus } from "./funcs/utils.js";

import { Header } from "../components/header/header.js";
window.customElements.define("site-header", Header);

import { Footer } from "../components/footer/footer.js";
window.customElements.define("site-footer", Footer);

// const OpenBtn = document.querySelector(".OpenBtn");
// const closeBtn = document.querySelector(".closeBtn");

// const navbar2 = document.querySelector(".navbar2");
// const themeTitle = document.querySelector(".themeTitle");

// const cover = document.querySelector(".cover");

// const UserAccountBtn = document.querySelector(".UserAccountBtn");

// const userInfoCard = document.querySelector(".userInfoCard");
// const userName_label = document.querySelector(".userName");

// const logoutBtn = document.querySelector(".exit-Btn");

// const dropDownAccountCover = document.querySelector(".dropDownAccountCover");
// const SwitchTeheme = document.querySelectorAll(".SwitchTeheme");

// const userAccountBtns = document.querySelector(".Account-Btn");

// const NavigationBar = document.querySelector(".NavigationBar ul");
// const menubar = document.querySelector(".menubar");

// let isOpenNavbar = false;

// window.onload = function () {
//   if (isUserLogedIn()) {
//     UserAccountBtn.classList.add("active");
//     userAccountBtns.classList.add("hidden");
//   } else {
//     UserAccountBtn.classList.remove("active");
//     userAccountBtns.classList.remove("hidden");
//   }

//   getUserInfo().then((data) => {
//     userName_label.innerHTML = data.name;
//   });

//   getMenus().then((data) => {
//     menusGenerator(data);
//   });

//   if (localStorage.getItem("theme") === null) {
//     isDark = false;
//   } else {
//     if (localStorage.getItem("theme") == "light") {
//       isDark = false;
//     } else {
//       isDark = true;
//     }
//   }
//   if (isDark == false) {
//     SwitchTeheme1.classList.replace("fa-sun", "fa-moon");
//     SwitchTeheme2.classList.replace("fa-sun", "fa-moon");
//     themeTitle.innerHTML = "تم تیره";
//   } else {
//     SwitchTeheme1.classList.replace("fa-moon", "fa-sun");
//     SwitchTeheme2.classList.replace("fa-moon", "fa-sun");
//     themeTitle.innerHTML = "تم روشن";
//   }
//   changeThemeMode();
// };

// OpenBtn.addEventListener("click", openNavbar);
// closeBtn.addEventListener("click", openNavbar);
// cover.addEventListener("click", openNavbar);

// function openNavbar() {
//   if (isOpenNavbar === false) {
//     navbar2.style.right = "0%";
//     cover.style.cssText = "visibility: visible; opacity:1;";
//     document.body.style.overflowY = "hidden";
//     isOpenNavbar = true;
//   } else {
//     navbar2.style.right = "-100%";
//     cover.style.cssText = "visibility: hidden; opacity:0;";
//     document.body.style.overflowY = "auto";
//     isOpenNavbar = false;
//   }
// }

// function openAndCloseDropdown() {
//   //   if (JSON.parse(localStorage.getItem("users")) !== null) {
//   if (userInfoCard.style.visibility == "visible") {
//     userInfoCard.style.visibility = "hidden";
//     userInfoCard.style.opacity = "0";
//     dropDownAccountCover.style.visibility = "hidden";
//     dropDownAccountCover.style.opacity = "0";
//   } else {
//     userInfoCard.style.visibility = "visible";
//     userInfoCard.style.opacity = "1";
//     dropDownAccountCover.style.visibility = "visible";
//     dropDownAccountCover.style.opacity = "1";
//   }
//   //     usersArray = JSON.parse(localStorage.getItem("users"));
//   //   } else {
//   //     UserAccountBtn.remove();
//   //   }
// }

// UserAccountBtn.addEventListener("click", openAndCloseDropdown);
// dropDownAccountCover.addEventListener("click", openAndCloseDropdown);

// const SwitchTeheme1 = document.querySelector(".SwitchTeheme1 i");
// const SwitchTeheme2 = document.querySelector(".SwitchTeheme2 i");
// let isDark;

// SwitchTeheme.forEach(function (switchBtn) {
//   switchBtn.addEventListener("click", function (event) {
//     if (isDark == false) {
//       SwitchTeheme1.classList.replace("fa-moon", "fa-sun");
//       SwitchTeheme2.classList.replace("fa-moon", "fa-sun");
//       themeTitle.innerHTML = "تم روشن";
//       isDark = true;
//       localStorage.setItem("theme", "dark");
//     } else {
//       SwitchTeheme1.classList.replace("fa-sun", "fa-moon");
//       SwitchTeheme2.classList.replace("fa-sun", "fa-moon");
//       themeTitle.innerHTML = "تم تیره";
//       isDark = false;
//       localStorage.setItem("theme", "light");
//     }
//     changeThemeMode();
//   });
// });

// function changeThemeMode() {
//   if (isDark == true) {
//     //dark
//     document.body.classList.add("dark");
//     document.documentElement.style.setProperty("--lightColor", "rgb(28 28 40)");
//     document.documentElement.style.setProperty(
//       "--primaryLightColor",
//       "rgb(28 28 40)"
//     );
//     document.documentElement.style.setProperty(
//       "--borderColor",
//       "rgb(50 51 77)"
//     );
//     document.documentElement.style.setProperty("--hoverColor", "rgb(28 28 40)");
//     document.documentElement.style.setProperty(
//       "--hoverBorderColor",
//       "rgb(119 124 148)"
//     );
//     document.documentElement.style.setProperty(
//       "--secondDynamicCoor",
//       "rgb(50 51 77)"
//     );
//     document.documentElement.style.setProperty("--TextLightColor", "#fff");
//     document.documentElement.style.setProperty(
//       "--activeMenuItem2Hover",
//       "#fff"
//     );
//     document.documentElement.style.setProperty("--cardTextColor", "#fff");
//     document.documentElement.style.setProperty("--mainColor", "rgb(28 28 40)");
//     document.documentElement.style.setProperty(
//       "--FerechexHoverColor",
//       "rgb(74 75 109)"
//     );
//     document.documentElement.style.setProperty(
//       "--Warning-bg-color",
//       "40, 41, 61"
//     );
//     document.documentElement.style.setProperty(
//       "--category-color",
//       "rgb(250 204 21)"
//     );
//     document.documentElement.style.setProperty(
//       "--category-bg-color",
//       "rgb(250 204 21 / 0.1)"
//     );
//     document.documentElement.style.setProperty(
//       "--SecondTextLightColor",
//       "rgb(148 163 184)"
//     );
//     document.documentElement.style.setProperty(
//       "--bannerRedColor",
//       "rgb(239 68 68)"
//     );

//     document.documentElement.style.setProperty(
//       "--comment_background",
//       "rgb(50 51 77)"
//     );
//     document.documentElement.style.setProperty(
//       "--reply_background",
//       "rgb(74 75 109)"
//     );
//     document.documentElement.style.setProperty(
//       "--textarea_background",
//       "rgb(50 51 77)"
//     );

//     document.documentElement.style.setProperty(
//       "--textarea_color",
//       "rgb(100 116 139)"
//     );
//     document.documentElement.style.setProperty("--blue_btn", "14 165 233");

//     document.documentElement.style.setProperty("--blue_btn", "rgb(78 129 251)");
//     document.documentElement.style.setProperty(
//       "--blue_btn_hover",
//       "rgb(37 99 235)"
//     );

//     document.documentElement.style.setProperty("--cancel_btn", "rgb(50 51 77)");
//     document.documentElement.style.setProperty(
//       "--cancel_btn_hover",
//       " rgb(74 75 109 )"
//     );

//     document.documentElement.style.setProperty(
//       "--video_download_bg_color",
//       "46, 213, 115, .1"
//     );
//     document.documentElement.style.setProperty(
//       "--video_download_color",
//       "46, 213, 115"
//     );

//     document.documentElement.style.setProperty(
//       "--video_download_hover_bg_color",
//       "46, 213, 115, .1"
//     );

//     document.documentElement.style.setProperty(
//       "--file_download_bg_color",
//       "250, 204, 21, .1"
//     );
//     document.documentElement.style.setProperty(
//       "--file_download_color",
//       "250, 204, 21, 1"
//     );
//     document.documentElement.style.setProperty(
//       "--file_download_hover_bg_color",
//       "250, 204, 21, .1"
//     );

//     document.documentElement.style.setProperty(
//       "--session_accordion_body_bg",
//       "rgb(40 41 61)"
//     );

//     document.documentElement.style.setProperty(
//       "--session_accordion_hover_body_bg",
//       "rgb(50 51 77)"
//     );
//   } else {
//     document.body.classList.remove("dark");
//     //light
//     document.documentElement.style.setProperty("--lightColor", "#fff");
//     document.documentElement.style.setProperty(
//       "--primaryLightColor",
//       "rgb(243 244 246)"
//     );
//     document.documentElement.style.setProperty(
//       "--borderColor",
//       "rgb(243 244 246)"
//     );
//     document.documentElement.style.setProperty(
//       "--hoverColor",
//       "rgb(229 231 235)"
//     );
//     document.documentElement.style.setProperty(
//       "--hoverBorderColor",
//       "rgb(243 244 246)"
//     );
//     document.documentElement.style.setProperty("--secondDynamicCoor", "#fff");
//     document.documentElement.style.setProperty(
//       "--TextLightColor",
//       "rgb(63 63 70)"
//     );
//     document.documentElement.style.setProperty(
//       "--activeMenuItem2Hover",
//       "#000"
//     );
//     document.documentElement.style.setProperty(
//       "--cardTextColor",
//       "rgb(100 116 139)"
//     );
//     document.documentElement.style.setProperty(
//       "--mainColor",
//       "rgb(243 244 246)"
//     );
//     document.documentElement.style.setProperty(
//       "--FerechexHoverColor",
//       "rgb(243 244 246)"
//     );
//     document.documentElement.style.setProperty(
//       "--Warning-bg-color",
//       "255, 255, 255"
//     );
//     document.documentElement.style.setProperty(
//       "--category-color",
//       "rgb(78 129 251)"
//     );
//     document.documentElement.style.setProperty(
//       "--category-bg-color",
//       "rgb(14 165 233 / 0.1)"
//     );
//     document.documentElement.style.setProperty(
//       "--SecondTextLightColor",
//       "rgb(100 116 139)"
//     );

//     document.documentElement.style.setProperty(
//       "--bannerRedColor",
//       "rgb(236 72 153)"
//     );

//     document.documentElement.style.setProperty(
//       "--comment_background",
//       "rgb(243 244 246)"
//     );

//     document.documentElement.style.setProperty(
//       "--reply_background",
//       "rgb(229 231 235)"
//     );
//     document.documentElement.style.setProperty(
//       "--textarea_background",
//       "rgb(243 244 246)"
//     );
//     document.documentElement.style.setProperty(
//       "--textarea_color",
//       " rgb(100 116 139)"
//     );

//     document.documentElement.style.setProperty("--blue_btn", "rgb(14 165 233)");
//     document.documentElement.style.setProperty(
//       "--blue_btn_hover",
//       "rgb(2 132 199)"
//     );
//     document.documentElement.style.setProperty(
//       "--cancel_btn",
//       " rgb(229 231 235)"
//     );
//     document.documentElement.style.setProperty(
//       "--cancel_btn_hover",
//       " rgb(209 213 219)"
//     );

//     document.documentElement.style.setProperty(
//       "--video_download_bg_color",
//       "46, 213, 115, 1"
//     );
//     document.documentElement.style.setProperty(
//       "--video_download_color",
//       " 255, 255, 255"
//     );
//     document.documentElement.style.setProperty(
//       "--video_download_hover_bg_color",
//       "34, 197, 94"
//     );
//     document.documentElement.style.setProperty(
//       "--file_download_bg_color",
//       "250, 204, 21, 1"
//     );
//     document.documentElement.style.setProperty(
//       "--file_download_color",
//       "255, 255, 255"
//     );
//     document.documentElement.style.setProperty(
//       "--file_download_hover_bg_color",
//       "249, 161, 52"
//     );

//     document.documentElement.style.setProperty(
//       "--session_accordion_body_bg",
//       "rgb(255, 255, 255)"
//     );
//     document.documentElement.style.setProperty(
//       "--session_accordion_hover_body_bg",
//       "rgb(255, 255, 255)"
//     );
//   }
// }
// menubar.addEventListener("click", (e) => {
//   if (e.target.className.includes("menuLink")) {
//     openResponsiveSubMenu(e.target);
//   } else if (e.target.parentElement.className.includes("menuLink")) {
//     openResponsiveSubMenu(e.target.parentElement);
//   }
// });

// function openResponsiveSubMenu(event) {
//   if (event.classList == "menuLink active") {
//     event.classList.remove("active");
//   } else {
//     document.querySelectorAll(".menuLink").forEach(function (menuLinkItem) {
//       menuLinkItem.classList.remove("active");
//     });
//     event.classList.add("active");
//   }
// }

// // start get menus

// function menusGenerator(menus) {
//   // NavigationBar
//   console.log(menus);
//   NavigationBar.innerHTML = "";
//   menus.forEach((menu) => {
//     NavigationBar.insertAdjacentHTML(
//       "afterbegin",
//       `
//     <li>
//     <a href="${menu.href}" class="NavItem">${menu.title} ${
//         menu.submenus.length > 0 ? ' <i class="fa fa-angle-down"></i>' : ""
//       }</a>
//   </li>
//     `
//     );
//     if (menu.submenus.length > 0) {
//       const menusBox = document.querySelector(".NavItem");
//       // menusBox.querySelector('.SubMenu').innerHTML = "";
//       menusBox.parentElement.insertAdjacentHTML(
//         "beforeend",
//         `
//       <ul class="SubMenu"></ul>
//       `
//       );
//       const subMenusBox = document.querySelector(".SubMenu");
//       subMenusBox.innerHTML = "";
//       menu.submenus.forEach((submenu) => {
//         subMenusBox.insertAdjacentHTML(
//           "afterbegin",
//           `
//         <li><a href="${submenu.href}">${submenu.title}</a></li>
//         `
//         );
//       });
//     }
//   });

//   // start responsive menu

//   menubar.innerHTML = "";
//   menus.forEach((menu) => {
//     menubar.insertAdjacentHTML(
//       "afterbegin",
//       `
//   <li class="menuItem">
//       <a  class="menuLink">
//       ${menu.title} ${
//         menu.submenus.length > 0 ? '<i class="fa fa-angle-down"></i>' : ""
//       }
//     </a>
//  </li>
  
//   `
//     );
//     const menuItem = document.querySelector(".menuItem");
//     if (menu.submenus.length > 0) {
//       menuItem.insertAdjacentHTML(
//         "beforeend",
//         `<ul class="responsiveSubmenu"></ul>`
//       );

//       menu.submenus.forEach((submenu) => {
//         menuItem.querySelector(".responsiveSubmenu").insertAdjacentHTML(
//           "beforeend",
//           `
  
//   <li class="responsiveMenuItem">
//   <a href="${submenu.href}">${submenu.title}</a>
// </li>
  
//   `
//         );
//       });
//     }
//   });

//   // finish responsive menu
// }

// // finish get menus
