import {
  getQueryParams,
  mainRoute,
  getBlogByFilter,
  getArticles,
} from "./funcs/utils.js";
import {
  messageBox,
  showErrorMessage,
} from "../components/messageBox/messageBox.js";
window.customElements.define("message-box", messageBox);
// start blog content code
const blog_content = document.querySelector(".blog_content");
const blog_body = document.querySelector(".blog_body");
const blog_desc = document.querySelector(".blog_desc");
const more_btn_box = document.querySelector(".more_btn_box");
const more_btn = document.querySelector(".more_btn");

const blogLink_breadcrumb = document.querySelector(".blogLink_breadcrumb");
const blog_title_label = document.querySelector(".blog_title_label");
const blogCreator_name = document.querySelector(".blogCreator_name");
const blogCreated_date = document.querySelector(".blogCreated_date");
const blogCover = document.querySelector(".blogCover");
const blog_items = document.querySelector(".blog_items");
const short_link_text = document.querySelector(".short_link_text");
const copy_link_btn = document.querySelector(".copy_link_btn");
const latest_articles_list = document.querySelector(".latest_articles_list");
const articles_category_list = document.querySelector(
  ".articles_category_list"
);

let isMore = false;
function blogContainerHeightHandler() {
  // alert( getComputedStyle(blog_desc).height.substring(0, getComputedStyle(blog_desc).height.indexOf('px')))
  blog_content.style.height =
    getComputedStyle(blog_desc).height.substring(
      0,
      getComputedStyle(blog_desc).height.indexOf("px")
    ) > 1200
      ? "1670px"
      : "fit-content";
  more_btn_box.style.display =
    getComputedStyle(blog_desc).height.substring(
      0,
      getComputedStyle(blog_desc).height.indexOf("px")
    ) > 1200
      ? "flex"
      : "none";
}

// alert(getComputedStyle(blog_desc).height)

more_btn.addEventListener("click", () => {
  if (!isMore) {
    blog_content.style.height = "auto";
    more_btn.innerHTML = `مشاهده کمتر <i class="fa-solid fa-chevron-up"></i>`;
    more_btn.parentElement.classList.add("more");
    isMore = true;
  } else {
    blog_content.style.height = "1670px";
    more_btn.innerHTML = `مشاهده بیشتر <i class="fa-solid fa-chevron-down"></i>`;
    more_btn.parentElement.classList.remove("more");
    isMore = false;
  }
});
// end blog content code

window.addEventListener("load", () => {
  getArticle();
});
function getArticle() {
  fetch(`${mainRoute}articles/${getQueryParams("bName")}`)
    .then((data) => data.json())
    .then((info) => {
      blogGenerator(info);
    });
}

function blogGenerator(blogInfo) {
  // latest_articles_list
  // articles_category_list

  blogLink_breadcrumb.innerHTML = blogInfo.title;
  blogLink_breadcrumb.href = `https://alirezaaa1194.github.io/sabzlearn2/blog.html?bName=${blogInfo.shortName}`;

  blog_title_label.innerHTML = blogInfo.title;
  document.title = `${blogInfo.title} - سبزلرن`;

  blogCreator_name.innerHTML = blogInfo.creator.name;
  blogCreated_date.innerHTML = blogInfo.creator.createdAt.substring(0, 10);

  blogCover.src = `https://sabzlearn-project-backend.liara.run/courses/covers/${blogInfo.cover}`;

  blog_items.innerHTML = blogInfo.body;
  blogContainerHeightHandler()

  short_link_text.innerHTML = location.href;

  getBlogByFilter("latest_blogs").then((data) => {
    latest_articles_list.innerHTML = "";
    data.forEach((blog) => {
      latest_articles_list.insertAdjacentHTML(
        "beforeend",
        `
      <li><a href="https://alirezaaa1194.github.io/sabzlearn2/blog.html?bName=${blog.shortName}">${blog.title}</a></li>
      `
      );
    });
  });

  getArticles().then((data) => {
    articles_category_list.innerHTML = "";
    data.forEach((blog) => {
      articles_category_list.insertAdjacentHTML(
        "beforeend",
        `
      <li><i class="fa-solid fa-play"></i><a href="https://alirezaaa1194.github.io/sabzlearn2/blog.html?bName=${blog.shortName}">${blog.title}</a></li>
      `
      );
    });
  });

  console.log(blogInfo);
}

copy_link_btn.addEventListener("click", () => {
  navigator.clipboard.writeText(location.href);
  showErrorMessage("با موفقیت کپی شد", "success");
});
