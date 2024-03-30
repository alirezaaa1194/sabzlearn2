import { mainRoute, getUserInfo, getUserTokenFromcookie } from "../../../js/funcs/utils.js";
const name_input = document.querySelector(".name_input");
const userName_input = document.querySelector(".userName_input");
const email_input = document.querySelector(".email_input");
const password_input = document.querySelector(".password_input");
const phone_input = document.querySelector(".phone_input");
const update_userInfo_btn = document.querySelector(".update_userInfo_btn");

const getUserInfoFromDB = () => {
  getUserInfo().then((res) => {
    console.log(res);
    name_input.value = res.name;
    userName_input.value = res.username;
    email_input.value = res.email;
    phone_input.value = res.phone;
  });
};

update_userInfo_btn.addEventListener("click", (e) => {
  e.preventDefault();
  userInfoUpdateHandler();
});

const userInfoUpdateHandler = () => {
  if (
    name_input.value.trim() &&
    userName_input.value.trim() &&
    email_input.value.trim() &&
    phone_input.value.trim() &&
    password_input.value.trim
  ) {
    Swal.fire({
      icon: "warning",
      title: "آیا از ویرایش اطلاعاتان اطمینان دارید؟",
      confirmButtonText: "بله",
      showCancelButton: true,
      cancelButtonText: "خیر",
    }).then((res) => {
      if (res.isConfirmed) {
        let userNewInfo = {
          name: name_input.value.trim(),
          username: userName_input.value.trim(),
          email: email_input.value.trim(),
          password: password_input.value.trim(),
          phone: phone_input.value.trim(),
        };
        fetch(`${mainRoute}users/`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${getUserTokenFromcookie()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userNewInfo),
        }).then(() => {
          Swal.fire({
            title: "اطلاعاتتان با موفقیت ویرایش شد",
            confirmButtonText: "اوکی",
          });
          getUserInfoFromDB();
        });
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "لطفا فیلد هارا پرکنید",
      confirmButtonText: "اوکی",
    });
  }
};

window.addEventListener("load", () => {
  getUserInfoFromDB();
});
