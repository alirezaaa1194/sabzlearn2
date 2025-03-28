import {
  getQueryParams,
  getCourseByCategory,
  getFilteredCourses,
  getAllCourses,
  getAllCategories,
  getSearchedCourses,
  isUserLogedIn,
} from "./funcs/utils.js";
// import { courseGenerator } from "./funcs/shared.js";

import {
  messageBox,
  showErrorMessage,
} from "../components/messageBox/messageBox.js";
window.customElements.define("message-box", messageBox);
let coursesArray = [];
const sortBtns = document.querySelectorAll(".sort_btn");
const ResponsivesortBtns = document.querySelectorAll(".responsive_sort_btn");
const filter_dropDown = document.querySelector(".filter_dropDown");
const filter_dropDown_cover = document.querySelector(".filter_dropDown_cover");
const filter_box_title = document.querySelector(".filter_button1");
const close_dropDown_btn = document.querySelector(".close_dropDown_btn");
const sortby_label = document.querySelector(".sortby_label");

const course_filter_section = document.querySelector(".course_filter_section");
const set_filterts_btn = document.querySelector(".set_filterts_btn");
const filter_button2 = document.querySelector(".filter_button2");
const close_filter_section_btn = document.querySelector(
  ".close_filter_section_btn"
);

const checkboxInputs = document.querySelectorAll(".checkbox");

const course_filter_labels = document.querySelectorAll(".course_filter_label");

const course_category_inputs = document.querySelectorAll(
  ".course_category_input"
);
const course_category_inputs_labels = document.querySelectorAll(
  ".course_category_inputs_label"
);

const accordion_btn = document.querySelector(".accordion_btn");
const accordion_body = document.querySelector(".accordion_body");

const remove_all_filter = document.querySelector(".remove_all_filter");

const category_name_label = document.querySelector(".category_name_label");

const ProductGrid = document.querySelector(".Product-Grid");

const dont_have_courses = document.querySelector(".dont_have_courses");
const course_loader = document.querySelector(".course_loader");

const course_category_inputs_container = document.querySelector(
  ".course_category_inputs_container"
);
const responsive_course_category_inputs_container = document.querySelector(
  ".responsive_course_category_inputs_container"
);

const search_box_input = document.querySelector(".search_box_input");
const search_box_btn = document.querySelector(".search_box_btn");

const see_more_course = document.querySelector(".see_more_course");
const showen_all_label = document.querySelector(".showen_all_label");

let count = 9;
let start = 0;
let end = count;

sortBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    search_box_input.value = "";

    ProductGrid.innerHTML = "";
    start = 0;
    end = count;

    document.querySelectorAll(".checkbox").forEach((ch, index) => {
      ch.checked = false;
      document.querySelectorAll("label")[index].classList.remove("active");
    });

    sortBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    checkboxInputs.forEach((ch) => {
      ch.checked = false;
    });
    course_filter_labels.forEach((label) => {
      label.classList.remove("active");
    });
    document.querySelectorAll(".course_category_input").forEach((ch) => {
      ch.checked = false;
    });
    course_filter_labels.forEach((label) => {
      label.classList.remove("active");
    });
    document
      .querySelectorAll(".course_category_inputs_label")
      .forEach((label) => {
        label.classList.remove("active");
      });

    course_loader.style.display = "block";
    getFilteredCourses(btn.id).then((courses) => {
      coursesArray = courses;
      course_loader.style.display = "none";
      checkCourseLength(courses);
      courseGenerator(ProductGrid);
    });

    btn.classList.add("active");

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
    search_box_input.value = "";

    ProductGrid.innerHTML = "";
    start = 0;
    end = count;

    ResponsivesortBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    checkboxInputs.forEach((ch) => {
      ch.checked = false;
    });
    course_filter_labels.forEach((label) => {
      label.classList.remove("active");
    });
    document.querySelectorAll(".course_category_input").forEach((ch) => {
      ch.checked = false;
    });
    course_filter_labels.forEach((label) => {
      label.classList.remove("active");
    });
    document
      .querySelectorAll(".course_category_inputs_label")
      .forEach((label) => {
        label.classList.remove("active");
      });

    course_loader.style.display = "block";
    getFilteredCourses(btn.id).then((courses) => {
      coursesArray = courses;
      course_loader.style.display = "none";
      checkCourseLength(courses);
      courseGenerator(ProductGrid);
    });

    btn.classList.add("active");
    sortby_label.innerHTML = btn.innerText;
    filterDropDownCoverHandler();

    sortBtns.forEach((btn1) => {
      if (btn1.id === btn.id) {
        sortBtns.forEach((btn1) => {
          btn1.classList.remove("active");
        });
        btn1.classList.add("active");
      }
    });
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
    // document.body.style.overflowY = "hidden";
    document.body.style.overflowY = "auto";
  } else {
    document.body.style.overflowY = "auto";
  }
}
close_dropDown_btn.addEventListener("click", filterDropDownCoverHandler);
filter_dropDown_cover.addEventListener("click", filterDropDownCoverHandler);
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

function filterSectionHandler() {
  course_filter_section.classList.toggle("active");

  if (course_filter_section.className.includes("active")) {
    // document.body.style.overflowY = "hidden";
    document.body.style.overflowY = "auto";
  } else {
    document.body.style.overflowY = "auto";
  }
  window.scrollTo(0, 0);
}
filter_button2.addEventListener("click", filterSectionHandler);
set_filterts_btn.addEventListener("click", filterSectionHandler);
close_filter_section_btn.addEventListener("click", filterSectionHandler);

checkboxInputs.forEach((ch) => {
  ch.addEventListener("change", (e) => {
    dont_have_courses.style.display = "none";
    checkboxInputs.forEach((ch2) => {
      if (ch2 != ch) {
        ch2.checked = false;
      }
    });
    search_box_input.value = "";
    course_filter_labels.forEach((label) => {
      if (label.getAttribute("for") == ch.id) {
        if (ch.checked) {
          label.classList.add("active");
        } else {
          label.classList.remove("active");
        }
      } else {
        label.classList.remove("active");
      }
    });

    document.querySelectorAll(".course_category_input").forEach((ch) => {
      ch.checked = false;
    });
    document
      .querySelectorAll(".course_category_inputs_label")
      .forEach((label) => {
        label.classList.remove("active");
      });

    if (window.innerWidth > 1000) {
      sortBtns.forEach((btn) => btn.classList.remove("active"));
      ResponsivesortBtns.forEach((btn) => btn.classList.remove("active"));
      sortby_label.innerHTML = "مرتب سازی";

      course_loader.style.display = "block";
      if (ch.checked) {
        getFilteredCourses(ch.dataset.target).then((courses) => {
          coursesArray = courses;
          checkCourseLength(courses);

          ProductGrid.innerHTML = "";
          start = 0;
          end = count;

          courseGenerator(ProductGrid);
          course_loader.style.display = "none";
        });
      } else {
        getFilteredCourses(undefined).then((courses) => {
          coursesArray = courses;

          ProductGrid.innerHTML = "";
          start = 0;
          end = count;

          checkCourseLength(courses);
          courseGenerator(ProductGrid);

          course_loader.style.display = "none";

          sortBtns.forEach((btn) =>
            btn.id == "all_course"
              ? btn.classList.add("active")
              : btn.classList.remove("active")
          );
          ResponsivesortBtns.forEach((btn) =>
            btn.id == "all_course"
              ? btn.classList.add("active")
              : btn.classList.remove("active")
          );
          window.innerWidth > 1000
            ? (sortby_label.innerHTML = "مرتب سازی")
            : (sortby_label.innerHTML = "همه دوره ها");
        });
      }
    } else {
      set_filterts_btn.addEventListener("click", () => {
        sortBtns.forEach((btn) => btn.classList.remove("active"));
        ResponsivesortBtns.forEach((btn) => btn.classList.remove("active"));
        sortby_label.innerHTML = "مرتب سازی";

        course_loader.style.display = "block";

        if (ch.checked) {
          getFilteredCourses(ch.dataset.target).then((courses) => {
            coursesArray = courses;

            ProductGrid.innerHTML = "";
            start = 0;
            end = count;

            checkCourseLength(courses);
            courseGenerator(ProductGrid);
            course_loader.style.display = "none";
          });
        } else {
          getFilteredCourses(undefined).then((courses) => {
            coursesArray = courses;

            ProductGrid.innerHTML = "";
            start = 0;
            end = count;

            checkCourseLength(courses);
            courseGenerator(ProductGrid);
            course_loader.style.display = "none";

            sortBtns.forEach((btn) =>
              btn.id == "all_course"
                ? btn.classList.add("active")
                : btn.classList.remove("active")
            );
            ResponsivesortBtns.forEach((btn) =>
              btn.id == "all_course"
                ? btn.classList.add("active")
                : btn.classList.remove("active")
            );

            window.innerWidth > 1000
              ? (sortby_label.innerHTML = "مرتب سازی")
              : (sortby_label.innerHTML = "همه دوره ها");
          });
        }
      });
    }
  });
});

accordion_btn.addEventListener("click", () => {
  accordion_btn.classList.toggle("active");
  accordion_body.classList.toggle("active");
  if (accordion_body.className.includes("active")) {
    accordion_body.style.height = "fit-content";
  } else {
    accordion_body.style.height = "0";
  }
});

remove_all_filter.addEventListener("click", () => {
  course_category_inputs.forEach((ch) => {
    ch.checked = false;
  });
  document.querySelectorAll("label").forEach((label) => {
    label.classList.remove("active");
  });
  document.querySelectorAll(".checkbox").forEach((ch) => {
    ch.checked = false;
  });
});

window.addEventListener("load", () => {
  createCategories();
  const buyed_course_box = document.querySelectorAll(".buyed_course_box");
  buyed_course_box.forEach((box) => {
    if (!isUserLogedIn()) {
      box.remove();
    }
  });
  category_name_label.innerHTML = getQueryParams("catName")
    ? getQueryParams("catName")
    : "دوره ها";
  document.title = getQueryParams("catName")
    ? getQueryParams("catName")
    : "دوره ها";

  category_name_label.innerHTML = getQueryParams("s")
    ? `جستجو: ${getQueryParams("s")}`
    : "دوره ها";

  document.title = getQueryParams("s")
    ? `سبزلرن -  ${getQueryParams("s")}`
    : "دوره ها";

  search_box_input.value = getQueryParams("s") ? getQueryParams("s") : "";

  if (!getQueryParams("s")) {
    sortBtns.forEach((btn) => {
      if (btn.className.includes("active")) {
        course_loader.style.display = "block";
        getFilteredCourses(btn.id).then((courses) => {
          course_loader.style.display = "none";
          coursesArray = courses;
          courseGenerator(ProductGrid);
        });
      }
    });
  } else {
    sortBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    course_loader.style.display = "block";
    getAllCourses().then((courses) => {
      coursesArray = courses;
      course_loader.style.display = "none";
      let outputCourses = getSearchedCourses(courses, getQueryParams("s"));
      coursesArray = outputCourses;
      courseGenerator(ProductGrid);
      checkCourseLength(outputCourses);
    });
  }
});

function checkCourseLength(courses) {
  if (courses.length > 0) {
    dont_have_courses.style.display = "none";
  } else {
    // dont_have_courses.innerHTML = txt;
    dont_have_courses.style.display = "flex";
  }
}
function createCategories() {
  getAllCategories().then((categories) => {
    course_category_inputs_container.innerHTML = "";
    responsive_course_category_inputs_container.innerHTML = "";
    categories.forEach((category) => {
      ////console.log(category);
      let categoryCourseCount = 0;

      getAllCourses().then((courses) => {
        courses.forEach((course) => {
          // coursesArray=courses
          if (course.categoryID.title == category.title) {
            categoryCourseCount++;
          }
        });

        course_category_inputs_container.insertAdjacentHTML(
          "afterbegin",
          `
        <div class="course_category_input_box">
                  <div class="input_box">
                    <input
                      type="checkbox"
                      id="${category.name}"
                      class="course_category_input"
                    />
                    <label
                      for="${category.name}"
                      class="course_category_inputs_label"
                    >
                      <span class="label_cursor"></span>
                      <span class="category_name_label">${category.title}</span>
                    </label>
                  </div>
                  <span class="category_course_count_label">${categoryCourseCount}</span>
                </div>
        `
        );
        responsive_course_category_inputs_container.insertAdjacentHTML(
          "afterbegin",
          `
        <div class="course_category_input_box">
                  <div class="input_box">
                   
                    <label
                      for="${category.name}"
                      class="course_category_inputs_label"
                    >
                      <span class="label_cursor"></span>
                      <span class="category_name_label">${category.title}</span>
                    </label>
                  </div>
                  <span class="category_course_count_label">${categoryCourseCount}</span>
                </div>
        `
        );

        let course_category_input = document.querySelectorAll(
          ".course_category_input"
        );
        let course_category_inputs_label = document.querySelectorAll(
          ".course_category_inputs_label"
        );

        course_category_input.forEach((ch) => {
          ch.addEventListener("change", (e) => {
            dont_have_courses.style.display = "none";
            course_category_input.forEach((ch2) => {
              if (ch2 != ch) {
                ch2.checked = false;
              }
            });
            search_box_input.value = "";
            course_category_inputs_label.forEach((label) => {
              if (label.getAttribute("for") == ch.id) {
                if (ch.checked) {
                  label.classList.add("active");
                } else {
                  label.classList.remove("active");
                }
              } else {
                label.classList.remove("active");
              }
            });

            document.querySelectorAll(".checkbox").forEach((ch) => {
              ch.checked = false;
            });
            document.querySelectorAll(".course_filter_label").forEach((ch) => {
              ch.classList.remove("active");
            });

            if (window.innerWidth > 1000) {
              sortBtns.forEach((btn) => btn.classList.remove("active"));
              ResponsivesortBtns.forEach((btn) =>
                btn.classList.remove("active")
              );
              sortby_label.innerHTML = "مرتب سازی";

              course_loader.style.display = "block";
              if (ch.checked) {
                getCourseByCategory(ch.id).then((courses) => {
                  coursesArray = courses;

                  ProductGrid.innerHTML = "";
                  start = 0;
                  end = count;

                  checkCourseLength(courses);
                  courseGenerator(ProductGrid);
                  course_loader.style.display = "none";
                });
              } else {
                getFilteredCourses(undefined).then((courses) => {
                  coursesArray = courses;

                  ProductGrid.innerHTML = "";
                  start = 0;
                  end = count;

                  checkCourseLength(courses);
                  courseGenerator(ProductGrid);

                  course_loader.style.display = "none";

                  sortBtns.forEach((btn) =>
                    btn.id == "all_course"
                      ? btn.classList.add("active")
                      : btn.classList.remove("active")
                  );
                  ResponsivesortBtns.forEach((btn) =>
                    btn.id == "all_course"
                      ? btn.classList.add("active")
                      : btn.classList.remove("active")
                  );
                  window.innerWidth > 1000
                    ? (sortby_label.innerHTML = "مرتب سازی")
                    : (sortby_label.innerHTML = "همه دوره ها");
                });
              }
            } else {
              set_filterts_btn.addEventListener("click", () => {
                sortBtns.forEach((btn) => btn.classList.remove("active"));
                ResponsivesortBtns.forEach((btn) =>
                  btn.classList.remove("active")
                );
                sortby_label.innerHTML = "مرتب سازی";

                course_loader.style.display = "block";

                if (ch.checked) {
                  getCourseByCategory(ch.id).then((courses) => {
                    coursesArray = courses;

                    ProductGrid.innerHTML = "";
                    start = 0;
                    end = count;

                    courseGenerator(ProductGrid);
                    checkCourseLength(coursesArray);
                    course_loader.style.display = "none";
                  });
                }
                //  else {
                //   // alert()
                //   getFilteredCourses(undefined).then((courses) => {
                //     coursesArray = courses;
                //     courseGenerator(ProductGrid, courses.length, true);
                //     checkCourseLength(courses);
                //     course_loader.style.display = "none";

                //     sortBtns.forEach((btn) =>
                //       btn.id == "all_course"
                //         ? btn.classList.add("active")
                //         : btn.classList.remove("active")
                //     );
                //     ResponsivesortBtns.forEach((btn) =>
                //       btn.id == "all_course"
                //         ? btn.classList.add("active")
                //         : btn.classList.remove("active")
                //     );

                //     window.innerWidth > 1000
                //       ? (sortby_label.innerHTML = "مرتب سازی")
                //       : (sortby_label.innerHTML = "همه دوره ها");
                //   });
                // }
              });
            }
          });
        });
      });
    });
  });
}

search_box_btn.addEventListener("click", searchCourseHandler);
search_box_input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    searchCourseHandler();
  }
});

function searchCourseHandler() {
  if (search_box_input.value) {
    course_loader.style.display = "flex";
    dont_have_courses.style.display = "none";
    getAllCourses().then((res) => {
      course_loader.style.display = "none";
      coursesArray = getSearchedCourses(res, search_box_input.value);
      ProductGrid.innerHTML = "";
      start = 0;
      end = count;
      courseGenerator(ProductGrid);
      checkCourseLength(coursesArray);
    });

    document.querySelectorAll(".checkbox").forEach((ch) => {
      ch.checked = false;
    });
    document.querySelectorAll(".course_filter_label").forEach((ch) => {
      ch.classList.remove("active");
    });

    document.querySelectorAll(".course_category_input").forEach((ch) => {
      ch.checked = false;
    });
    document
      .querySelectorAll(".course_category_inputs_label")
      .forEach((label) => {
        label.classList.remove("active");
      });

    sortBtns.forEach((btn) => btn.classList.remove("active"));
    ResponsivesortBtns.forEach((btn) => btn.classList.remove("active"));
  } else {
    showErrorMessage("لطفا فیلد را پرکنید", "error");
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////

const more_course_text = document.querySelector(".more_course_text");
const more_course_loader = document.querySelector(".more_course_loader");

see_more_course.addEventListener("click", () => {
  if (end <= coursesArray.length - count) {
    start += count; //0  4  8
    end += count; // 4  8  12
    more_course_loader.style.display = "flex";
    more_course_text.style.display = "none";
    setTimeout(() => {
      more_course_loader.style.display = "none";
      more_course_text.style.display = "inline-block";
      courseGenerator(ProductGrid);
    }, 1500);
  } else {
    start += count; //0  4  8
    end += coursesArray.length - end;

    more_course_loader.style.display = "flex";
    more_course_text.style.display = "none";
    setTimeout(() => {
      more_course_loader.style.display = "none";
      more_course_text.style.display = "inline-block";
      courseGenerator(ProductGrid);
    }, 1500);
  }

  setTimeout(() => {
    if (end === coursesArray.length) {
      see_more_course.style.display = "none";
      showen_all_label.style.display = "block";
    }
  }, 1500);

  //console.log(start, end);
});

function courseGenerator(container) {
  let courses = coursesArray;
  if (courses.length > count) {
    showen_all_label.style.display = "none";
    see_more_course.style.display = "block";
    for (let i = start; i < end; i++) {
      //console.log(courses[i]);

      const descs = document.createElement("div");

    descs.innerHTML = courses[i].description;

    descs.querySelectorAll("img").forEach((img) => img.remove());

      if (courses[i]) {
        container.insertAdjacentHTML(
          "beforeend",
          `
          
          <div class="Product-Card">
          <div class="Card-header">
            <a href="course.html?name=${courses[i].shortName}">
            <img src="${
              courses[i].cover
            }" alt="">
            </a>
            ${
              courses[i].discount
                ? `<span class="free-lable">${courses[i].discount}%</span>`
                : ""
            }
            ${!courses[i].price ? `<span class="free-lable">100%</span>` : ""}
          </div>
          <div class="Card-Body">
            <div class="Category-Box">
             ${
               courses[i].categoryID.title
                 ? `<a href="course_category.html?cat=${courses[i].categoryID.name}&catName=${courses[i].categoryID.title}">${courses[i].categoryID.title}</a>`
                 : ""
             }
            </div>
            <h4 class="course-Name">
              <a href="course.html?name=${courses[i].shortName}">${
            courses[i].name
          }</a>
            </h4>
            <div class="course-Desc">${
              courses[i].description ? descs.innerHTML : ""
            }</div>
            <div class="Course-Info">
              <div class="Teacher-Info">
                <i class="fa fa-user"></i>
                <a href="#">${
                  courses[i].creator.includes(" ") ? courses[i].creator : ""
                }</a>
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
              <span class="Student-Number">${
                courses[i].registers ? courses[i].registers : ""
              }</span>
            </div>
           ${
             courses[i].price && !courses[i].discount
               ? `
           <h4 class="Course-Price">${
             courses[i].price.toLocaleString() + "تومان "
           }</h4>
           `
               : `
           
           <div class="price-Box">
           <h6 class="Course-Price">${
             courses[i].price ? courses[i].price.toLocaleString() + "تومان" : ""
           }</h6>
          ${
            !courses[i].price
              ? `<h4>رایگان!</h4>`
              : `<h4>${
                  (
                    ((100 - courses[i].discount) / 100) *
                    courses[i].price
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
      }
    }
  } else {
    if (coursesArray.length) {
      showen_all_label.style.display = "block";
      see_more_course.style.display = "none";
    } else {
      showen_all_label.style.display = "none";
      see_more_course.style.display = "none";
    }
    for (let i = start; i < coursesArray.length; i++) {
      //console.log(courses[i]);
      const descs = document.createElement("div");

    descs.innerHTML = courses[i].description;

    descs.querySelectorAll("img").forEach((img) => img.remove());
      if (courses[i]) {
        // courses.slice(0, count).forEach((course) => {
        container.insertAdjacentHTML(
          "beforeend",
          `
          
          <div class="Product-Card">
          <div class="Card-header">
            <a href="course.html?name=${courses[i].shortName}">
            <img src="${
              courses[i].cover
            }" alt="">
            </a>
            ${
              courses[i].discount
                ? `<span class="free-lable">${courses[i].discount}%</span>`
                : ""
            }
            ${!courses[i].price ? `<span class="free-lable">100%</span>` : ""}
          </div>
          <div class="Card-Body">
            <div class="Category-Box">
             ${
               courses[i].categoryID
                 ? `<a href="course_category.html?cat=${
                     courses[i].categoryID.name || ""
                   }&catName=${courses[i].categoryID.title || ""}">${
                     courses[i].categoryID.title || ""
                   }</a>`
                 : ""
             }
            </div>
            <h4 class="course-Name">
              <a href="course.html?name=${courses[i].shortName}">${
            courses[i].name
          }</a>
            </h4>
            <div class="course-Desc">${
              courses[i].description ? descs.innerHTML : ""
            }</div>
            <div class="Course-Info">
              <div class="Teacher-Info">
                <i class="fa fa-user"></i>
                <a href="#">${
                  courses[i].creator.includes(" ") ? courses[i].creator : ""
                }</a>
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
              <span class="Student-Number">${
                courses[i].registers ? courses[i].registers : ""
              }</span>
            </div>
           ${
             courses[i].price && !courses[i].discount
               ? `
           <h4 class="Course-Price">${
             courses[i].price.toLocaleString() + "تومان "
           }</h4>
           `
               : `
           
           <div class="price-Box">
           <h6 class="Course-Price">${
             courses[i].price ? courses[i].price.toLocaleString() + "تومان" : ""
           }</h6>
          ${
            !courses[i].price
              ? `<h4>رایگان!</h4>`
              : `<h4>${
                  (
                    ((100 - courses[i].discount) / 100) *
                    courses[i].price
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
      }
      // });
    }
  }
}
