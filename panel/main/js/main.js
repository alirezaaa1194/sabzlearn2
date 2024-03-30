import { mainRoute, getUserTokenFromcookie } from "../../../js/funcs/utils.js";
const getLastUsers = async () => {
  let res = await fetch(`${mainRoute}infos/p-admin`, {
    headers: {
      Authorization: `Bearer ${getUserTokenFromcookie()}`,
    },
  });
  let data = await res.json();
  usersGenerator(data.lastUsers);
  siteInfosHandler(data.infos);
};

const usersGenerator = (users) => {
  const users_container = document.querySelector(".users_container");
  users_container.innerHTML = "";
  users.forEach((user) => {
    users_container.insertAdjacentHTML(
      "beforeend",
      `
        <tr>
                        <td>${user._id.substring(0, 4)}</td>
                        <td>${user.name}</td>
                        <td>${user.phone}</td>
                        <td>${user.email}</td>
                        <td>${user.username}</td>
                        <td>${user.role == "ADMIN" ? "مدیر" : "کابر"}</td>
                      </tr>
      
      `
    );
  });
  const changeRollBtn = document.querySelectorAll(".change-roll-btn");
  const editBtn = document.querySelectorAll(".edit-btn");
  const deleteBtn = document.querySelectorAll(".delete-btn");
  const banBtn = document.querySelectorAll(".ban-btn");
  editBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      prepareUserEdit(btn.id);
    });
  });
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteUserHandler(btn.id);
    });
  });
  banBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      banUserHandler(btn.id);
    });
  });
  changeRollBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      changeRollHandler(btn.dataset.uid, btn.dataset.roll);
    });
  });
};

const siteInfosHandler = (infos) => {
  const registered_users_count_labbel = document.querySelector(
    ".registered_users_count_labbel"
  );
  const courses_count_labbel = document.querySelector(".courses_count_labbel");
  const sessions_count_labbel = document.querySelector(
    ".sessions_count_labbel"
  );
  registered_users_count_labbel.innerHTML = infos[0].count;

  courses_count_labbel.innerHTML = infos[1].count;
  sessions_count_labbel.innerHTML = infos[2].count;
};
window.addEventListener("load", () => {
  getLastUsers();
});
