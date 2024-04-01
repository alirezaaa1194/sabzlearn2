import {
  getAllCourses,
  getPopularCourses,
  getPresellCourses,
  getMenus,
  getArticles,
} from "./funcs/utils.js";

import { courseGenerator } from "./funcs/shared.js";
const new_products_container = document.querySelector(
  ".new_products_container"
);

const popular_courses_container = document.querySelector(
  ".popular_courses_container"
);

const preSell_course_container = document.querySelector(
  "#preSell_course_container"
);
const last_courses_container = document.querySelector(
  "#last_courses_container"
);
const documentBox = document.querySelector(".document-Box");

window.addEventListener("load", () => {
  getAllCourses().then((data) => {
    //console.log(data);
    courseGenerator(new_products_container, data, 12, true);
  });
  getPopularCourses().then((data) =>
    courseGenerator(popular_courses_container, data, 8, false)
  );

  getPresellCourses().then((data) =>
    courseSliderGenerator(preSell_course_container, data, data.length, true)
  );

  getAllCourses().then((data) =>
    courseSliderGenerator(last_courses_container, data, 20, true)
  );
  getArticles().then((data) => {
    articlesGenerator(data, documentBox);
  });
});

//start swiper js
var product_swiper = new Swiper(".product-swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    576: {
      slidesPerView: 1,
    },
    700: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    914: {
      slidesPerView: 3,
    },
    1157: {
      slidesPerView: 3,
    },
    1167: {
      slidesPerView: 4,
    },
  },
});
//finish swiper js

// start get Courses

function courseSliderGenerator(container, courses, count, description) {
  // new_products_container.
  container.innerHTML = "";
  courses.slice(0, count).forEach((course) => {
    // //console.log(course);
    container.insertAdjacentHTML(
      "beforeend",
      `
      
      <div class="swiper-slide Product-Card">
      <div class="Card-header">
        <a href="https://alirezaaa1194.github.io/sabzlearn2/course.html?name=${
          course.shortName
        }">
        <img src="https://sabzlearn-project-backend.liara.run/courses/covers/${
          course.cover
        }" alt="">
        </a>
        ${
          course.discount
            ? `<span class="free-lable">${course.discount}%</span>`
            : ""
        }
        ${!course.price ? `<span class="free-lable">100%</span>` : ""}
      </div>
      <div class="Card-Body">
        <div class="Category-Box">
          <a href="course_category.html?cat=${
            course.categoryID.name
          }&catName=${course.categoryID.title}">${
        course.categoryID.title
      }</a>
        </div>
        <h4 class="course-Name">
          <a href="https://alirezaaa1194.github.io/sabzlearn2/course.html?name=${
            course.shortName
          }">${course.name}</a>
        </h4>
        <p class="course-Desc">${description ? course.description : ""}</p>
        <div class="Course-Info">
          <div class="Teacher-Info">
            <i class="fa fa-user"></i>
            <a href="#">${course.creator}</a>
            <i class="fa fa-clock"></i>
            <span></span>
          </div>
          <div class="Course-Star">
            <i class="fa fa-star"></i>
            <span>5.0</span>
          </div>
        </div>
      </div>
      <div class="Card-Footer">
        <div class="students-Box">
          <i class="fa fa-users"></i>
          <span class="Student-Number">${course.registers}</span>
        </div>
       ${
         course.price && !course.discount
           ? `
       <h4 class="Course-Price">${course.price.toLocaleString() + "تومان "}</h4>
       `
           : `
       
       <div class="price-Box">
       <h6 class="Course-Price">${
         course.price ? course.price.toLocaleString() + "تومان" : ""
       }</h6>
      ${
        !course.price
          ? `<h4>رایگان!</h4>`
          : `<h4>${
              (
                ((100 - course.discount) / 100) *
                course.price
              ).toLocaleString() + "تومان"
            }</h4>`
      }
       </div>

       
       `
       } 
      </div>
    </div>


      `
    );
  });
}
// finish get Courses

// start get articles
function articlesGenerator(articles, container) {
  container.innerHTML = "";
  articles.slice(0, 4).forEach((article) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="document-Box">
      <div class="document-Card">
        <div class="document-Card-header">
          <a href="https://alirezaaa1194.github.io/sabzlearn2/blog.html?bName=${article.shortName}" class="">
            <img
              src="https://sabzlearn-project-backend.liara.run/courses/covers/${article.cover}"
              alt=""
              class="document-img"
            />
          </a>
        </div>

        <div class="document-Card-Body">
          <h4 class="document-Name">
            <a href="https://alirezaaa1194.github.io/sabzlearn2/blog.html?bName=${article.shortName}">${article.title}</a>
          </h4>
          <p class="document-desc">${article.description}</p>

          <div class="document-Info">
            <a href="">
              <i class="fa fa-user"></i>
              <span class="documnent-author-name">${article.creator.name}</span>
            </a>
            <span>
              <i class="fa fa-calendar"></i>
              <span class="documnent-date">1402/08/16</span>
            </span>
          </div>
        </div>
        <div class="document-Card-footer">
          <a href="https://alirezaaa1194.github.io/sabzlearn2/blog.html?bName=${article.shortName}">
            مطالعه مقاله
            <i class="fa fa-arrow-left"></i>
          </a>
        </div>
      </div>

`
    );
  });
}
// finish get articles
