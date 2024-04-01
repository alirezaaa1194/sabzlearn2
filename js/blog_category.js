import { getArticles, getBlogByFilter } from "./funcs/utils.js";
const sortBtns = document.querySelectorAll(".sort_btn");
const ResponsivesortBtns = document.querySelectorAll(".responsive_sort_btn");
const filter_dropDown = document.querySelector(".filter_dropDown");
const filter_dropDown_cover = document.querySelector(".filter_dropDown_cover");
const filter_box_title = document.querySelector(".filter_button");
const close_dropDown_btn = document.querySelector(".close_dropDown_btn");
const documentBox = document.querySelector(".document-Box");

let see_more_btn_box = document.querySelector(".see_more_btn_box");
let see_more_course = document.querySelector(".see_more_course_btn");
let more_course_text = document.querySelector(".more_course_text");
let more_course_loader = document.querySelector(".more_course_loader");
let course_loader = document.querySelector(".course_loader");

let articles_category_list = document.querySelector(".articles_category_list");

let articlesArray = [];

let count = 9;
let start = 0;
let end = count;

sortBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    course_loader.style.display='block'
    sortBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");
    getBlogByFilter(btn.id).then((data) => {
      documentBox.innerHTML = "";
      course_loader.style.display='none'
      count = 9;
      start = 0;
      end = count;
      articlesArray = data;
      articlesGenerator(documentBox);
    });

    ResponsivesortBtns.forEach((btn2) => {
      if (btn2.id === btn.id) {
        ResponsivesortBtns.forEach((btn2) => {
          btn2.classList.remove("active");
        });
        btn2.classList.add("active");
      }
    });
  });
});
ResponsivesortBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    course_loader.style.display='block'
    ResponsivesortBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");
    

    getBlogByFilter(btn.id).then((data) => {
      documentBox.innerHTML = "";
      course_loader.style.display='none'
      count = 9;
      start = 0;
      end = count;
      articlesArray = data;
      articlesGenerator(documentBox);
    });

    filterDropDownCoverHandler();

    sortBtns.forEach((btn1) => {
      if (btn1.id === btn.id) {
        sortBtns.forEach((btn1) => {
          btn1.classList.remove("active");
        });
        btn1.classList.add("active");
      }
    });

    if (window.innerWidth > 1000) {
      sortby_label.innerHTML = "مرتب سازی";
    } else {
      ResponsivesortBtns.forEach((btn) => {
        if (btn.className.includes("active")) {
          sortby_label.innerHTML = btn.textContent;
        }
      });
    }
  });
});
filter_box_title.addEventListener("click", () => {
  if (window.innerWidth < 1000) {
    filterDropDownCoverHandler();
  }
});
function filterDropDownCoverHandler() {
  filter_dropDown.classList.toggle("active");
  filter_dropDown_cover.classList.toggle("active");
  if (filter_dropDown.className.includes("active")) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }
}
close_dropDown_btn.addEventListener("click", filterDropDownCoverHandler);
filter_dropDown_cover.addEventListener("click", filterDropDownCoverHandler);

const sortby_label = document.querySelector(".sortby_label");
const responsive_sort_btn = document.querySelectorAll(".responsive_sort_btn");

window.addEventListener("resize", () => {
  if (window.innerWidth > 1000) {
    sortby_label.innerHTML = "مرتب سازی";
  } else {
    ResponsivesortBtns.forEach((btn) => {
      if (btn.className.includes("active")) {
        sortby_label.innerHTML = btn.textContent;
      }
    });
  }
});

getArticles().then((data) => {
  articlesArray = data;
  documentBox.innerHTML = "";
  articlesGenerator(documentBox);
  asideCategoryGenerator(data);
});

see_more_course.addEventListener("click", () => {
  if (end <= articlesArray.length - count) {
    start += count; //0  4  8
    end += count; // 4  8  12
    more_course_loader.style.display = "flex";
    more_course_text.style.display = "none";
    setTimeout(() => {
      more_course_loader.style.display = "none";
      more_course_text.style.display = "inline-block";
      articlesGenerator(documentBox);
    }, 1500);
  } else {
    start += count; //0  4  8
    end += articlesArray.length - end;

    more_course_loader.style.display = "flex";
    more_course_text.style.display = "none";
    setTimeout(() => {
      more_course_loader.style.display = "none";
      more_course_text.style.display = "inline-block";
      articlesGenerator(documentBox);
    }, 1500);
  }

  setTimeout(() => {
    if (end === articlesArray.length) {
      see_more_course.style.display = "none";
      showen_all_label.style.display = "block";
    }
  }, 1500);

  //console.log(start, end);
});

function articlesGenerator(container) {
  let articles = articlesArray;
  //console.log("before", articles);
  if (articles.length > count) {
    showen_all_label.style.display = "none";
    see_more_course.style.display = "block";
    for (let i = start; i < end; i++) {
      // //console.log(articles[i]);
      container.insertAdjacentHTML(
        "beforeend",
        `
        <div class="document-Box">
        <div class="document-Card">
          <div class="document-Card-header">
            <a href="blog.html?bName=${articles[i].shortName}" class="">
              <img
                src="https://sabzlearn-project-backend.liara.run/courses/covers/${articles[i].cover}"
                alt=""
                class="document-img"
              />
            </a>
          </div>

          <div class="document-Card-Body">
            <h4 class="document-Name">
              <a href="blog.html?bName=${articles[i].shortName}">${articles[i].title}</a>
            </h4>
            <p class="document-desc">${articles[i].description}</p>

            <div class="document-Info">
              <a href="">
                <i class="fa fa-user"></i>
                <span class="documnent-author-name">${articles[i].creator.name}</span>
              </a>
              <span>
                <i class="fa fa-calendar"></i>
                <span class="documnent-date">1402/08/16</span>
              </span>
            </div>
          </div>
          <div class="document-Card-footer">
            <a href="blog.html?bName=${articles[i].shortName}">
              مطالعه مقاله
              <i class="fa fa-arrow-left"></i>
            </a>
          </div>
        </div>

  `
      );
    }
  } else {
    if (articlesArray.length) {
      showen_all_label.style.display = "block";
      see_more_course.style.display = "none";
    } else {
      showen_all_label.style.display = "none";
      see_more_course.style.display = "none";
    }
    for (let i = start; i < articlesArray.length; i++) {
      //console.log(articles[i]);
      container.insertAdjacentHTML(
        "beforeend",
        `
        <div class="document-Box">
        <div class="document-Card">
          <div class="document-Card-header">
            <a href="blog.html?bName=${articles[i].shortName}" class="">
              <img
                src="https://sabzlearn-project-backend.liara.run/courses/covers/${articles[i].cover}"
                alt=""
                class="document-img"
              />
            </a>
          </div>

          <div class="document-Card-Body">
            <h4 class="document-Name">
              <a href="blog.html?bName=${articles[i].shortName}">${articles[i].title}</a>
            </h4>
            <p class="document-desc">${articles[i].description}</p>

            <div class="document-Info">
              <a href="">
                <i class="fa fa-user"></i>
                <span class="documnent-author-name">${articles[i].creator.name}</span>
              </a>
              <span>
                <i class="fa fa-calendar"></i>
                <span class="documnent-date">1402/08/16</span>
              </span>
            </div>
          </div>
          <div class="document-Card-footer">
            <a href="blog.html?bName=${articles[i].shortName}">
              مطالعه مقاله
              <i class="fa fa-arrow-left"></i>
            </a>
          </div>
        </div>

  `
      );
    }
  }
  //console.log("after", articles);
}

function asideCategoryGenerator(arts) {
  articles_category_list.innerHTML = "";
  arts.forEach((art) => {
    articles_category_list.insertAdjacentHTML(
      "beforeend",
      `<li>
    <i class="fa-solid fa-play"></i><a href="blog.html?bName=${art.shortName}">${art.title}</a>
  </li>`
    );
  });
}
