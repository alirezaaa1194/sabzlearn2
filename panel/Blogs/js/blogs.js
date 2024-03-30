import { mainRoute, getUserTokenFromcookie } from "../../../js/funcs/utils.js";
let editor = null;
ClassicEditor.create(document.querySelector("#editor"), {
  language: "fa",
}).then((newEditor) => {
  editor = newEditor;
});
let categoryId = -1;
const getArticles = async () => {
  let res = await fetch(`${mainRoute}articles`, {
    headers: {
      Authorization: `Bearer ${getUserTokenFromcookie()}`,
    },
  });
  let data = await res.json();
  articlesGenerator(data);
};

const articlesGenerator = (articles) => {
  const articlesContainer = document.querySelector(".articlesContainer");
  articlesContainer.innerHTML = "";
  articles.forEach((article) => {
    articlesContainer.insertAdjacentHTML(
      "beforeend",
      `
    <tr>                               
        <td>${article._id.substring(0, 4)}</td>
        <td>${article.title}</td>
        <td>${article.createdAt}</td>
        <td>${article.creator.name}</td>
        <td>
            <button type="button" class="btn btn-danger deleteArticle_btn" id="delete-btn" data-target="${
              article._id
            }">حذف</button>
        </td>
    </tr>
    `
    );
  });
  const deleteArticle_btn = document.querySelectorAll(".deleteArticle_btn");

  deleteArticle_btn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      deleteArticleHandler(btn.dataset.target);
    });
  });
};

window.addEventListener("load", () => {
  getArticles();
  categoryHandler();
});

const deleteArticleHandler = (id) => {
  Swal.fire({
    icon: "warning",
    title: "آیا از حذف کردن مقاله اطمینان دارید؟",
    confirmButtonText: "بله",
    showCancelButton: true,
    cancelButtonText: "خیر",
  }).then((res) => {
    if (res.isConfirmed) {
      fetch(`${mainRoute}articles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getUserTokenFromcookie()}`,
        },
      }).then(() => {
        Swal.fire({
          title: "مقاله با موفقیت حذف شد",
          confirmButtonText: "اوکی",
        });
        getArticles();
      });
    }
  });
};
const categoryHandler = async () => {
  let res = await fetch(`${mainRoute}category`);
  let data = await res.json();
  const category_select_input = document.querySelector(
    ".category_select_input"
  );
  category_select_input.innerHTML = "";
  category_select_input.insertAdjacentHTML(
    "beforeend",
    `<option value="-1">دسته بندی مقاله را وارد کنید</option>`
  );
  data.forEach((category) => {
    category_select_input.insertAdjacentHTML(
      "beforeend",
      `<option value="${category._id}">${category.title}</option>`
    );
  });

  category_select_input.addEventListener("change", () => {
    categoryId = category_select_input.value;
  });
};
const article_submit_btn = document.querySelector(".article_submit_btn");
const article_title_input = document.querySelector(".article_title_input");
const article_shortName_input = document.querySelector(
  ".article_shortName_input"
);
const article_desc_input = document.querySelector(".article_desc_input");
const article_cover_input = document.querySelector(".article_cover_input");
const insertNewArticke = () => {
  if (
    article_title_input.value &&
    article_shortName_input.value &&
    article_desc_input.value &&
    editor.getData()
  ) {
    let formData = new FormData();
    formData.append("title", article_title_input.value.trim());
    formData.append("description", article_desc_input.value.trim());
    formData.append("body", editor.getData());
    formData.append("shortName", article_shortName_input.value.trim());
    formData.append("categoryID", categoryId);
    formData.append("cover", article_cover_input.files[0]);

    fetch(`${mainRoute}articles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getUserTokenFromcookie()}`,
      },
      body: formData,
    }).then((res) => {
      if (res.status == 201) {
        Swal.fire({
          icon: "success",
          title: "مقاله با موفقیت منتشر شد",
          confirmButtonText: "اوکی",
        });
        getArticles();
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

article_submit_btn.addEventListener("click", (e) => {
  e.preventDefault();
  insertNewArticke();
});
