import { getUserTokenFromcookie, mainRoute } from "../../../js/funcs/utils.js";
let usersArray = [];
let userId = null;
const name_input = document.querySelector(".name_input");
const email_input = document.querySelector(".email_input");
const userName_input = document.querySelector(".userName_input");
const password_input = document.querySelector(".password_input");
const phone_input = document.querySelector(".phone_input");
const submit_user_btn = document.querySelector(".submit_user_btn");
const getUsersFromDB = () => {
  // const users_container=document.querySelector('.users_container')
  fetch(`${mainRoute}users`, {
    headers: {
      Authorization: `Bearer ${getUserTokenFromcookie()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      usersGenerator(data);
      usersArray = data;
    });
};
let isEdit = false;
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
                      <td>
                        <button type="button" class="btn btn-primary change-roll-btn" id="${
                          user._id
                        }" data-roll="${user.role}" data-uId="${user._id}">
                          تغییر نقش
                        </button>
                        <button type="button" class="btn btn-primary edit-btn" id="${
                          user._id
                        }">
                          ویرایش
                        </button>
                      </td>
                      <td>
                        <button type="button" class="btn btn-danger delete-btn" id="${
                          user._id
                        }">
                          حذف
                        </button>
                      </td>
                      <td>
                        <button type="button" class="btn btn-danger ban-btn" id="${
                          user._id
                        }">
                          بن
                        </button>
                      </td>
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

window.addEventListener("load", () => {
  getUsersFromDB();
});

const prepareUserEdit = (id) => {
  let homeContentEdit = document.querySelector(".home-content-edit");
  window.scrollTo(0, homeContentEdit.offsetTop);
  isEdit = true;
  let user = usersArray.find((user) => user._id === id);
  userId = id;
  submit_user_btn.value = "ویرایش";
  name_input.value = user.name;
  email_input.value = user.email;
  userName_input.value = user.username;
  password_input.value = user.password;
  phone_input.value = user.phone;
};
const banUserHandler = (id) => {
  Swal.fire({
    icon: "warning",
    title: "آیا از بن کردن کاربر اطمینان دارید؟",
    confirmButtonText: "بله",
    showCancelButton: true,
    cancelButtonText: "خیر",
  }).then((res) => {
    if (res.isConfirmed) {
      fetch(`${mainRoute}users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getUserTokenFromcookie()}`,
        },
      }).then(() => {
        Swal.fire({
          title: "کاربر با موفقیت بن شد",
          confirmButtonText: "اوکی",
        });
        getUsersFromDB();
      });
    }
  });
};
const deleteUserHandler = (id) => {
  Swal.fire({
    icon: "warning",
    title: "آیا از حذف کاربر اطمینان دارید؟",
    confirmButtonText: "بله",
    showCancelButton: true,
    cancelButtonText: "خیر",
  }).then((res) => {
    if (res.isConfirmed) {
      fetch(`${mainRoute}users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getUserTokenFromcookie()}`,
        },
      }).then(() => {
        Swal.fire({
          title: "کاربر با موفقیت حذف شد",
          confirmButtonText: "اوکی",
        });
        getUsersFromDB();
      });
    }
  });
};
const userEditHandler = () => {
  if (
    name_input.value &&
    userName_input.value &&
    email_input.value &&
    phone_input.value &&
    password_input.value
  ) {
    if (isEdit) {
      let userNewData = {
        name: name_input.value.trim(),
        username: userName_input.value.trim(),
        email: email_input.value.trim(),
        password: password_input.value.trim(),
        phone: phone_input.value.trim(),
      };
      fetch(`${mainRoute}users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getUserTokenFromcookie()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userNewData),
      }).then((res) => {
        if (res.status == 200) {
          Swal.fire({
            icon: "success",
            title: "کاربر با موفقیت ویرایش شد",
            confirmButtonText: "اوکی",
          });
          getUsersFromDB();
          isEdit = false;
          name_input.value = "";
          userName_input.value = "";
          email_input.value = "";
          password_input.value = "";
          phone_input.value = "";
          submit_user_btn.value = "افزودن";
        }
      });
    } else {
      let newUserInfo = {
        name: name_input.value.trim(),
        username: userName_input.value.trim(),
        email: email_input.value.trim(),
        phone: phone_input.value.trim(),
        password: password_input.value.trim(),
        confirmPassword: password_input.value.trim(),
      };
      fetch(`${mainRoute}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserInfo),
      }).then((res) => {
        if (res.status == 201) {
          Swal.fire({
            icon: "success",
            title: "کاربر با موفقیت اضافه شد",
            confirmButtonText: "اوکی",
          });
          getUsersFromDB();
          name_input.value = "";
          userName_input.value = "";
          email_input.value = "";
          password_input.value = "";
          phone_input.value = "";
          submit_user_btn.value = "افزودن";
        }
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "لطفا فیلد هارا پرکنید",
      confirmButtonText: "اوکی",
    });
  }
};

const changeRollHandler = (userId, userRoll) => {
  Swal.fire({
    icon: "warning",
    title: "آیا از تغییر نقش کاربر اطمینان دارید؟",
    confirmButtonText: "بله",
    showCancelButton: true,
    cancelButtonText: "خیر",
  }).then((res) => {
    if (res.isConfirmed) {
      let newUserRole = {
        role: userRoll == "ADMIN" ? "USER" : "ADMIN",
        id: userId,
      };
console.log(newUserRole);
      fetch(`${mainRoute}users/role`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getUserTokenFromcookie()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserRole),
      }).then(() => {
        Swal.fire({
          title: "نقش کاربر با موفقیت تغییر کرد",
          confirmButtonText: "اوکی",
        });
        getUsersFromDB();
      });
    }
  });
};
submit_user_btn.addEventListener("click", (e) => {
  e.preventDefault();
  userEditHandler();
});
