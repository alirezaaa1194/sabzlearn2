import {
  isUserLogedIn,
  getUserInfo,
  getUserTokenFromcookie,
  mainRoute,
  logOut,
} from "../js/funcs/utils.js";

const adminNameLabel = document.querySelectorAll(".admin-name-label");

const notification_btn = document.querySelector(".notification_btn");
const homeNotificationModal = document.querySelector(
  ".home-notification-modal"
);
const homeNotificationModalList = document.querySelector(
  ".home-notification-modal-list"
);
const logout_btn = document.querySelector(".logout_btn");
function redirectToHomepage() {
  if (isUserLogedIn()) {
    getUserInfo().then((data) => {
      if (data.role !== "ADMIN") {
        location.href = "../../";
      } else {
        setAdminInfo(data);
        notificationHandler(data);
      }
    });
  } else {
    location.href = "../../";
  }
}

function setAdminInfo(admin) {
  // console.log(admin.notifications);

  adminNameLabel.forEach((name) => (name.innerHTML = admin.name));
}

window.addEventListener("load", () => {
  redirectToHomepage();
});

function notificationHandler(admin) {
  homeNotificationModalList.innerHTML = "";
  if (admin.notifications.length) {
    admin.notifications.forEach((notif) => {
      homeNotificationModalList.insertAdjacentHTML(
        "beforeend",
        `
  <li class="home-notification-modal-item">
  <span class="home-notification-modal-text">${notif.msg}</span>
  <a href="#" class="switch seenNotif_btn" id="${notif._id}">دیدم</a>
</li>
`
      );
      document.getElementById(`${notif._id}`).addEventListener("click", (e) => {
        updateNotificationHandler(e.target.id);
      });
    });
  } else {
    homeNotificationModalList.insertAdjacentHTML(
      "beforeend",
      `
<li class="home-notification-modal-item" style="background:rgba(255, 0, 0, .5);">اعلانی وجود ندارد</li>
`
    );
  }
}
// open and close dropdown
notification_btn.addEventListener("mousemove", () => {
  homeNotificationModal.style.display = "block";
});
homeNotificationModal.addEventListener("mousemove", () => {
  homeNotificationModal.style.display = "block";
});
notification_btn.addEventListener("mouseleave", () => {
  homeNotificationModal.style.display = "none";
});
homeNotificationModal.addEventListener("mouseleave", () => {
  homeNotificationModal.style.display = "none";
});

function updateNotificationHandler(id) {
  fetch(`${mainRoute}notifications/see/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getUserTokenFromcookie()}`,
    },
  }).then((res) => {
    getUserInfo().then((data) => {
      notificationHandler(data);
    });
  });
}
logout_btn.addEventListener("click", (e) => {
  e.preventDefault();
  logOut(getUserTokenFromcookie());
  location.reload();
});
