import { getUserTokenFromcookie, mainRoute } from "../../../js/funcs/utils.js";
let menuId = -1;
const insertMenu_btn = document.querySelector(".insertMenu_btn");
const getMenus = async () => {
  let res = await fetch(`${mainRoute}menus/all`);
  let data = await res.json();
  menusTemplateGenerator(data);
  showParentMenuForInsertNewMenu(data);
};

const menusTemplateGenerator = (menus) => {
  const menus_container = document.querySelector(".menus_container");
  menus_container.innerHTML = "";
  menus.forEach((menu) => {
    menus_container.insertAdjacentHTML(
      "beforeend",
      `
    <tr>
        <td>${menu.title}</td>
        <td><a href="#">${menu.href}</a></td>
        <td>${menu.parent ? menu.parent.title : "---"}</td>
        <td>
            <button type="button" class="btn btn-danger delete-btn removeCourse_btn" id="${
              menu._id
            }">حذف</button>
        </td>
    </tr>
    `
    );
  });
  const removeCourse_btn = document.querySelectorAll(".removeCourse_btn");
  removeCourse_btn.forEach((btn) =>
    btn.addEventListener("click", () => {
      removeMenusHandler(btn.id);
    })
  );
};

const removeMenusHandler = (id) => {
  Swal.fire({
    title: "آیا از حذف منو اطمینان دارید؟",
    confirmButtonText: "بله",
    showCancelButton: true,
    cancelButtonText: "خیر",
  }).then((res) => {
    if (res.isConfirmed) {
      let res = fetch(`${mainRoute}menus/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getUserTokenFromcookie()}`,
        },
      });
      Swal.fire({
        title: "منو با موفقیت حذف شد",
        confirmButtonText: "اوکی",
      }).then(() => {
        getMenus();
      });
    }
  });
};
const showParentMenuForInsertNewMenu = (menus) => {
  const selectParent_menu_box = document.querySelector(
    ".selectParent_menu_box"
  );
  selectParent_menu_box.innerHTML = "";
  selectParent_menu_box.insertAdjacentHTML(
    "beforeend",
    `
    <option value="-1">منوی پرنت را انتخاب کنید</option>
    `
  );
  menus.forEach((menu) => {
    if (!menu.parent) {
      selectParent_menu_box.insertAdjacentHTML(
        "beforeend",
        `
      <option value="${menu._id}">${menu.title}</option>
      `
      );
    }
  });
  selectParent_menu_box.addEventListener("change", () => {
    menuId = selectParent_menu_box.value;
  });
  //   console.log(menus);
};

const insertNewMenu = () => {
  const menuTitle_input = document.querySelector(".menuTitle_input");
  const menuHref_input = document.querySelector(".menuHref_input");
  if (menuTitle_input.value && menuHref_input.value) {
    let newMenuInfo = {
      title: menuTitle_input.value.trim(),
      href: menuHref_input.value.trim(),
    };

    menuId != -1 ? (newMenuInfo.parent = menuId) : "";

    let res = fetch(`${mainRoute}menus`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getUserTokenFromcookie()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuInfo),
    }).then((res) => {
      if (res.status == 201) {
        menuTitle_input.value = "";
        menuHref_input.value = "";

        getMenus();

        Swal.fire({
          icon: "success",
          title: "منو با موفقیت اضافه شد",
          confirmButtonText: "اوکی",
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

insertMenu_btn.addEventListener("click", (e) => {
  e.preventDefault();
  insertNewMenu();
});
window.addEventListener("load", getMenus);
