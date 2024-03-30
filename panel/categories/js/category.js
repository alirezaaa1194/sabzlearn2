import { mainRoute, getUserTokenFromcookie } from "../../../js/funcs/utils.js";

const categoriesContainer = document.querySelector(".categoriesContainer");
const category_name_input = document.querySelector(".category_name_input");
const category_title_input = document.querySelector(".category_title_input");
const category_submit_btn = document.querySelector(".category_submit_btn");

let categories = [];
let isEdit = false;
let categoryId = null;
const getCategories = async () => {
  let res = await fetch(`${mainRoute}category`);
  let data = await res.json();
  categories = data;
  categoriesGenerator(data);
};
const categoriesGenerator = (categories) => {
  categoriesContainer.innerHTML = "";
  categories.forEach((category) => {
    categoriesContainer.insertAdjacentHTML(
      "beforeend",
      `<tr>                     
        <td>${category._id.substring(0, 4)}</td>
        <td>${category.name}</td>
        <td>${category.title}</td>
        <td>${category.createdAt}</td>
        <td>
        <button type="button" class="btn btn-primary edit_category_btn" id="edit-btn" data-target="${
          category._id
        }">ویرایش</button>
        </td>
        <td>
            <button type="button" class="btn btn-danger delete_category_btn" id="delete-btn" data-target="${
              category._id
            }">حذف</button>
        </td>
    </tr>`
    );
  });
  const edit_category_btn = document.querySelectorAll(".edit_category_btn");
  const delete_category_btn = document.querySelectorAll(".delete_category_btn");

  edit_category_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
      prepareEditCategory(btn.dataset.target);
    });
  });
  delete_category_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteCategoryHandler(btn.dataset.target);
    });
  });
};

const prepareEditCategory = (id) => {
  isEdit = true;
  let category = categories.find((category) => category._id === id);
  category_name_input.value = category.name;
  category_title_input.value = category.title;
  category_submit_btn.value = "ویرایش";
  window.scrollTo(0, category_title_input.offsetTop);
  categoryId = id;
};
const deleteCategoryHandler = (id) => {
  Swal.fire({
    icon: "warning",
    title: "آیا از حذف کردن دسته بندی اطمینان دارید؟",
    confirmButtonText: "بله",
    showCancelButton: true,
    cancelButtonText: "خیر",
  }).then((res) => {
    if (res.isConfirmed) {
      fetch(`${mainRoute}category/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getUserTokenFromcookie()}`,
        },
      }).then(() => {
        Swal.fire({
          title: "دسته بندی با موفقیت حذف شد",
          confirmButtonText: "اوکی",
        });
        getCategories();
      });
    }
  });
};
const editCategoryHandler = () => {
  if (isEdit) {
    let categoryNewInfo = {
      title: category_title_input.value.trim(),
      name: category_name_input.value.trim(),
    };
    fetch(`${mainRoute}category/${categoryId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getUserTokenFromcookie()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryNewInfo),
    }).then((res) => {
      if (res.status == 200) {
        Swal.fire({
          icon: "success",
          title: "دسته بندی با موفقیت ویرایش شد",
          confirmButtonText: "اوکی",
        });
        getCategories();
        category_name_input.value = "";
        category_title_input.value = "";
        category_submit_btn.value = "اضافه کردن";
        isEdit = false;
      }
    });
  } else {
    let newCategoryInfo = {
      title: category_title_input.value.trim(),
      name: category_name_input.value.trim(),
    };
    fetch(`${mainRoute}category`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getUserTokenFromcookie()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategoryInfo),
    }).then((res) => {
      if (res.status == 201) {
        Swal.fire({
          icon: "success",
          title: "دسته بندی با موفقیت ایجاد شد",
          confirmButtonText: "اوکی",
        });
        getCategories();
        category_name_input.value = "";
        category_title_input.value = "";
      }
    });
  }
};
category_submit_btn.addEventListener("click", (e) => {
  e.preventDefault();
  editCategoryHandler();
});

window.addEventListener("load", () => {
  getCategories();
});
