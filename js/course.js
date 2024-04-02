import {
  getCourseByName,
  getQueryParams,
  getUserInfo,
  getUserTokenFromcookie,
  mainRoute,
  isUserLogedIn,
  isUserRegisteredToThisCourse,
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
const commentTextarea = document.querySelector("textarea");
let isMore = false;

const more_comment_btn = document.querySelector(".more_comment_btn");
const more_comment_text = document.querySelector(".more_comment_text");
const more_comment_loader = document.querySelector(".more_comment_loader");
let course_comments = [];

function blogContainerHeightHandler() {
  // if (window.innerWidth > 1000) {
  //   blog_content.style.height =
  //     getComputedStyle(blog_desc).height.substring(
  //       0,
  //       getComputedStyle(blog_desc).height.indexOf("px")
  //     ) /
  //       10 >
  //     1000
  //       ? "1670px"
  //       : "fit-content";

  //   more_btn_box.style.display =
  //     getComputedStyle(blog_desc).height.substring(
  //       0,
  //       getComputedStyle(blog_desc).height.indexOf("px")
  //     ) /
  //       10 >
  //     1000
  //       ? "flex"
  //       : "none";
  // } else {
  //   blog_content.style.height =
  //     getComputedStyle(blog_desc).height.substring(
  //       0,
  //       getComputedStyle(blog_desc).height.indexOf("px")
  //     ) /
  //       10 >
  //     10000
  //       ? "1670px"
  //       : "fit-content";

  //   more_btn_box.style.display =
  //     getComputedStyle(blog_desc).height.substring(
  //       0,
  //       getComputedStyle(blog_desc).height.indexOf("px")
  //     ) /
  //       10 >
  //     10000
  //       ? "flex"
  //       : "none";
  // }
  // alert( getComputedStyle(blog_desc).height.substring(0, getComputedStyle(blog_desc).height.indexOf('px')))

  blog_content.style.height =
    getComputedStyle(blog_desc).height.substring(
      0,
      getComputedStyle(blog_desc).height.indexOf("px")
    ) > 600
      ? "1000px"
      : "fit-content";
  more_btn_box.style.display =
    getComputedStyle(blog_desc).height.substring(
      0,
      getComputedStyle(blog_desc).height.indexOf("px")
    ) > 600
      ? "flex"
      : "none";
}

more_btn.addEventListener("click", () => {
  if (!isMore) {
    blog_content.style.height = "auto";
    more_btn.innerHTML = `مشاهده کمتر <i class="fa-solid fa-chevron-up"></i>`;
    more_btn.parentElement.classList.add("more");
    isMore = true;
  } else {
    blog_content.style.height = "1000px";
    more_btn.innerHTML = `مشاهده بیشتر <i class="fa-solid fa-chevron-down"></i>`;
    more_btn.parentElement.classList.remove("more");
    isMore = false;
  }
});
// end blog content code

// start comment section code
window.addEventListener("load", () => {
  // commentGenerator();
  if (!location.search) {
    location.href = "courses.html";
  } else {
    getCourseByName("name").then((res) => {
      if (res.message) {
        location.href = `courses.html?s=${getQueryParams("name")}`;
      }
    });
  }
});
/*
window.addEventListener("resize", () => {
  blogContainerHeightHandler();
});*/
let form = document.querySelector(".form");
let saveNewCommentBtn = document.querySelector(".save-new-comment-btn");
let cancelCommentBtn = document.querySelector(".cancel-comment-btn");
let commentsContainer = document.querySelector(".comments");
let whichCommentLabel = document.querySelector(".which-comment");
let saveCommentBtn = document.querySelector(".save-comment-btn");
let textArea = document.querySelector("textarea");

let commentId = null;
let authorName = null;

let count = 10;
let start = 0;
let end = count;

saveNewCommentBtn.addEventListener("click", () => {
  commentId = null;
  authorName = null;
  openForm();
});
cancelCommentBtn.addEventListener("click", closeForm);

function openForm() {
  form.classList.add("active");
  if (commentId === null) {
    whichCommentLabel.innerHTML = "ثبت نظر جدید";
  } else {
    whichCommentLabel.innerHTML = `در پاسخ به نظر ${authorName}`;
    window.scrollTo(0, document.querySelector(".form").offsetTop);
  }
  textArea.focus();
}

function closeForm() {
  form.classList.remove("active");
  if (commentId !== null) {
    window.scrollTo(0, document.getElementById(`${commentId}`).offsetTop);
  }
  commentId = null;
  authorName = null;
}
saveCommentBtn.addEventListener("click", createNewComment);
function createNewComment() {
  if (!commentId) {
    saveComment(getQueryParams("name"), commentTextarea.value);
  } else {
    saveCommentAnswer(commentId, commentTextarea.value);
  }
}

function replyToComment(id, author) {
  commentId = id;
  authorName = author;
  openForm();
}
const breadcrumb_category_name = document.querySelector(
  ".breadcrumb_category_name"
);
const breadcrumb_course_name = document.querySelector(
  ".breadcrumb_course_name"
);

const course_name_label = document.querySelector(".course_name_label");
const summary_course_description = document.querySelector(
  ".summary_course_description"
);
const course_offer_timer_box = document.querySelector(
  ".course_offer_timer_box"
);
const course_offer_percent_label = document.querySelector(
  ".course_offer_percent_label"
);
const origin_course_price = document.querySelector(".origin_course_price");
const offered_course_price = document.querySelector(".offered_course_price");

const course_status_label = document.querySelector(".course_status_label");
const course_time_label = document.querySelector(".course_time_label");
const course_lastUpdate_label = document.querySelector(
  ".course_lastUpdate_label"
);
const course_supportWay_label = document.querySelector(
  ".course_supportWay_label"
);
const course_preNeed_label = document.querySelector(".course_preNeed_label");

const creator_profile = document.querySelectorAll(".creator_profile");
const creator_name_label = document.querySelectorAll(".creator_name_label");
const creator_rol_label = document.querySelector(".creator_rol_label");

const copy_link_btn = document.querySelector(".copy_link_btn");
const short_link_text = document.querySelector(".short_link_text");

const course_studentCount_label = document.querySelectorAll(
  ".course_studentCount_label"
);
const accordion_item_body = document.querySelector(".accordion_item_body");
const course_time = document.querySelector(".course_time");
const accordion_main = document.querySelector(".accordion_main");
const dontHave_sessions_error = document.querySelector(
  ".dontHave_sessions_error"
);
const comments = document.querySelector(".comments");
const userNameLabel = document.querySelector(".user-name");
const course_price_box = document.querySelector(".course_price_box");
getUserInfo().then((userInfo) => {
  // userNameLabel.innerHTML = userInfo.username;
  if (userInfo) {
    userNameLabel.innerHTML = userInfo.name;
  } else {
    userNameLabel.innerHTML = "کاربر";
  }
});

const video_player = document.querySelector(".player");
const source_player = document.querySelector(".source_player");

getCourseByName("name").then((data) => {
  if (isUserLogedIn()) {
    // console.log(isUserRegisteredToThisCourse(data._id));
    isUserRegisteredToThisCourse(data._id).then((res) => {
      // console.log(res);
      courseContentGenerator(data, res);
    });
    // console.log(data);
    course_comments = data.comments;
    course_comments.reverse();
    commentsContainer.innerHTML = "";
    getCommentGenerator(course_comments);
    blogContainerHeightHandler();
  } else {
    courseContentGenerator(data, false);
    course_comments = data.comments;
    course_comments.reverse();
    commentsContainer.innerHTML = "";
    getCommentGenerator(course_comments);
    blogContainerHeightHandler();
  }
});

let courseHour = 0;
let courseMin = 0;
let courseSec = 0;

function courseContentGenerator(course, isRegister) {
  if (isUserLogedIn()) {
    isUserRegisteredToThisCourse(course._id).then((res) => {
      if (res) {
        course_price_box.insertAdjacentHTML(
          "afterbegin",
          `<a href="#course_sessions" class="course_see_link">
        <i class="fa-solid fa-play"></i>
        <span>مشاهده دوره</span>
      </a>`
        );
      } else {
        course_price_box.insertAdjacentHTML(
          "afterbegin",
          `<button href="" class="course_buy_link">
          <i class="fa-solid fa-shield-halved"></i>
          <span>شرکت در دوره</span>
        </button>`
        );
        const course_buy_link = document.querySelector(".course_buy_link");
        course_buy_link.addEventListener("click", () => {
          registerCourseHandler(course.price, course._id);
        });
      }
    });
  } else {
    course_price_box.insertAdjacentHTML(
      "afterbegin",
      `<button href="" class="course_buy_link">
        <i class="fa-solid fa-shield-halved"></i>
        <span>شرکت در دوره</span>
      </button>`
    );
    const course_buy_link = document.querySelector(".course_buy_link");
    course_buy_link.addEventListener("click", () => {
      registerCourseHandler(course.price, course._id);
    });
  }
  breadcrumb_category_name.innerHTML = course.categoryID.title;
  breadcrumb_category_name.href = `https://alirezaaa1194.github.io/sabzlearn2/course_category.html?cat=${course.categoryID.name}&catName=${course.categoryID.title}`;
  document.title = `${course.name} - سبزلرن`;
  breadcrumb_course_name.innerHTML = course.name;
  breadcrumb_course_name.href = `https://alirezaaa1194.github.io/sabzlearn2/course.html?name=${course.shortName}`;

  course_name_label.innerHTML = course.name;
  summary_course_description.innerHTML = course.description;

  course_offer_timer_box.style.display =
    course.discount || course.price == 0 ? "flex" : "none";
  course_offer_percent_label.innerHTML =
    course.price > 0
      ? course.discount + "% تخفیف شگفت انگیز"
      : course.price == 0
      ? "100% تخفیف شگفت انگیز"
      : "";

  // course_see_link.style.display = course.isUserRegisteredToThisCourse
  //   ? "flex"
  //   : "none";
  // course_buy_link.style.display = course.isUserRegisteredToThisCourse
  //   ? "none"
  //   : "flex";
  origin_course_price.style.display =
    course.price != 0 && course.discount != 0 ? "flex" : "none";
  origin_course_price.innerHTML = course.price.toLocaleString();

  offered_course_price.innerHTML = !course.price
    ? "رایگان"
    : course.discount
    ? (((100 - course.discount) / 100) * course.price).toLocaleString() +
      "تومان"
    : !course.discount
    ? course.price.toLocaleString() + "تومان"
    : "";
  course_status_label.innerHTML =
    course.status == "start"
      ? "درحال برگزاری"
      : course.status == "presell"
      ? "پیش فروش"
      : "تمام شده";

  course_lastUpdate_label.innerHTML = course.updatedAt.substring(0, 10);
  course_supportWay_label.innerHTML = course.support;
  course_preNeed_label.innerHTML = "";

  creator_name_label.forEach((label, index) => {
    label.innerHTML = course.creator.name;
    course_studentCount_label[index].innerHTML = course.courseStudentsCount;
  });

  creator_rol_label.innerHTML = course.creator.role;
  short_link_text.innerHTML = location.href;

  blog_desc.innerHTML =
    `<img src="https://sabzlearn-project-backend.liara.run/courses/covers/${course.cover}"/>` +
    course.description;

  accordion_item_body.innerHTML = "";
  if (course.sessions.length > 0) {
    course.sessions.forEach((session, index) => {
      let time = session.time.includes(":")
        ? session.time.split(":")
        : (session.time + ":").split(":");

      if (time.length === 3) {
        courseHour += +time[0];
        courseMin += +time[1];
        courseSec += +time[2];
      } else if (time.length == 2) {
        courseMin += +time[0];
        courseSec += +time[1];
      }

      if (courseMin > 60) {
        courseHour += Math.floor(courseMin / 60);
        courseMin = Math.floor(courseMin % 60);
      }
      if (courseSec > 60) {
        courseMin += Math.floor(courseSec / 60);
        courseSec = Math.floor(courseSec % 60);
      }
      accordion_item_body.insertAdjacentHTML(
        "beforeend",
        `
      

      <div class="accordion_body_list_item">
                    <a ${
                      !isRegister && !session.free
                        ? ""
                        : `href="session.html?cName=${
                            course.shortName
                          }&episode=${session._id}&epNum=${index + 1}"`
                    } class="accordio_list_top_section">
                      <span class="course_session_episode_number">${
                        index + 1
                      }</span>
                      <span class="course_session_episode_name"
                        >${session.title}</span
                      >
                    </a>
                    <div class="accordio_list_bottom_section">
                      <span class="course_session_price_status"
                        >${session.free ? "جلسه رایگان" : "جلسه نقدی"}</span
                      >
                      <span class="course_session_price_time"
                        ><span class="course_time_label">${
                          session.time.includes(":")
                            ? session.time
                            : session.time + ":00"
                        }</span><i class="fa-solid ${
          !isRegister && !session.free
            ? "fa-lock lock_icon"
            : "fa-play play_icon"
        }"></i></span
                      >
                    </div>
                  </div>
      `
      );
    });
  } else {
    accordion_main.style.display = "none";
    dontHave_sessions_error.style.display = "block";
  }

  course_time.innerHTML =
    courseHour.toString().padStart(2, 0) +
    ":" +
    courseMin.toString().padStart(2, 0) +
    ":" +
    courseSec.toString().padStart(2, 0);

  course_time_label.innerHTML =
    courseHour.toString().padStart(2, 0) +
    ":" +
    courseMin.toString().padStart(2, 0) +
    ":" +
    courseSec.toString().padStart(2, 0);
  if (course.sessions.length) {
    fetch(
      `https://sabzlearn-project-backend.liara.run/v1/courses/${course.shortName}/${course.sessions[0]._id}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGU2YjBlMWQ1MTQyYjkxYWZhOWJiMyIsImlhdCI6MTcxMTgzNjEyNCwiZXhwIjoxNzE0NDI4MTI0fQ.XLOtjcvVijn-8XGFHpgGSHugT8-Ci06YkOlGur3e0g0`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        // alert(data.sessions[0].video)
        video_player.src = `https://sabzlearn-project-backend.liara.run/courses/covers/${data.session.video}`;
        // alert(data.session.video)
        video_player.poster = `https://sabzlearn-project-backend.liara.run/courses/covers/${course.cover}`;
        const player = new Plyr("#player2", {
          controls: [
            "play",
            "progress",
            "current-time",
            "play-large",
            "rewind", // Rewind by the seek time (default 10 seconds)
            "fast-forward", // Fast forward by the seek time (default 10 seconds)
            "mute",
            "volume",
            "captions",
            "settings",
            "pip",
            "airplay",
            "fullscreen",
          ],
        });
      });
  } else {
    video_player.remove();
    document.querySelector(".introduction_video_box").insertAdjacentHTML(
      "afterbegin",
      // '<h2 style="color:red; text-align:center;">هنوز این دوره شروع نشده!</h2>'
      `<img src="https://sabzlearn-project-backend.liara.run/courses/covers/${course.cover}" class="course_cover_dont_start"/>`
    );
  }

  blogContainerHeightHandler();
}
copy_link_btn.addEventListener("click", () => {
  navigator.clipboard.writeText(location.href);
  showErrorMessage("با موفقیت کپی شد", "success");
});

// finish dynamic content

/////////////////////////////////////////////////////////////////////////////////////////////
more_comment_btn.addEventListener("click", () => {
  if (end <= course_comments.length - count) {
    start += count; //0  4  8
    end += count; // 4  8  12
    more_comment_loader.style.display = "flex";
    more_comment_text.style.display = "none";
    setTimeout(() => {
      more_comment_loader.style.display = "none";
      more_comment_text.style.display = "inline-block";
      getCommentGenerator(course_comments);
    }, 1500);
  } else {
    start += count; //0  4  8
    end += course_comments.length - end;

    more_comment_loader.style.display = "flex";
    more_comment_text.style.display = "none";
    setTimeout(() => {
      more_comment_loader.style.display = "none";
      more_comment_text.style.display = "inline-block";
      getCommentGenerator(course_comments);
    }, 1500);
  }

  setTimeout(() => {
    if (end === course_comments.length) {
      more_comment_btn.style.display = "none";
      showen_all_label.style.display = "block";
    }
  }, 1500);

  //console.log(start, end);
});

function getCommentGenerator(comments) {
  // console.log(comment);
  if (comments.length) {
    if (course_comments.length > count) {
      showen_all_label.style.display = "none";
      more_comment_btn.style.display = "block";
      for (let i = start; i < end; i++) {
        // //console.log(course_comments[i]);

        commentsContainer.insertAdjacentHTML(
          "beforeend",
          `
    <li class="comment" id="comment${comments[i]._id}">
    <div class="original-comment">
      <div class="Author-image Author-image1">
        <img src="images/user.png" alt="">
        <span class="Author-addjective Author-addjective1">${
          comments[i].creator.role == "USER"
            ? "کاربر"
            : comments[i].creator.role == "ADMIN"
            ? "مدیر"
            : "مدرس"
        }</span>
      </div>
      <div class="comment-info">
        <div class="comment-header-row">
          <div class="Author-info">
            <div class="Author-image Author-image2">
              <img src="images/user.png" alt="">
            </div>
            <div class="info">
              <p class="Author-name">${comments[i].creator.name}</p>
              <span class="comment-date">${comments[
                i
              ].creator.createdAt.substring(0, 10)}</span>
              <span class="Author-addjective Author-addjective2">${
                comments[i].role == "USER"
                  ? "کاربر"
                  : comments[i].role == "ADMIN"
                  ? "مدیر"
                  : "مدرس"
              }</span>
            </div>
          </div>
          ${
            comments[i].answerContent === null
              ? `
          <button class="reply-btn" id="${comments[i]._id}"  data-author="${comments[i].creator.name}">
            <i class="fa fa-mail-reply"  id="${comments[i]._id}"  data-author="${comments[i].creator.name}"></i>
          </button>`
              : `<button class="reply-btn" id="${comments[i]._id}"  data-author="${comments[i].creator.name}">
        </button>`
          }
        </div>
        <p class="comment-message">${comments[i].body}</p>
      </div>
    </div>



    <ul class="replies" id="replies${comments[i]._id}"></ul>
  </li>
    `
        );

        if (comments[i].answerContent) {
          let replyContainer = document.getElementById(
            `replies${comments[i]._id}`
          );
          replyContainer.innerHTML = "";
          replyContainer.insertAdjacentHTML(
            "beforeend",
            `
    <li class="comment">
    <div class="original-comment">
      <div class="Author-image Author-image1">
        <img src="images/user.png" alt="">
        <span class="Author-addjective Author-addjective1 teacher">${
          comments[i].answerContent.creator.role == "USER"
            ? "کاربر"
            : comments[i].answerContent.creator.role == "ADMIN"
            ? "مدیر"
            : "مدرس"
        }</span>
      </div>
      <div class="comment-info">
        <div class="comment-header-row">
          <div class="Author-info">
            <div class="Author-image Author-image2">
              <img src="images/user.png" alt="">
            </div>
            <div class="info">
              <p class="Author-name">${
                comments[i].answerContent.creator.name
              }</p>
              <span class="comment-date">${comments[
                i
              ].answerContent.createdAt.substring(0, 10)}</span>
              <span class="Author-addjective Author-addjective2 teacher">${
                comments[i].answerContent.creator.role == "USER"
                  ? "کاربر"
                  : comments[i].answerContent.creator.role == "ADMIN"
                  ? "مدیر"
                  : "مدرس"
              }</span>
            </div>
          </div>
        </div>
        <p class="comment-message">${comments[i].answerContent.body}</p>
      </div>
    </div>
  </li>
    `
          );
        }

        // handle reply btn
        document
          .getElementById(`${comments[i]._id}`)
          .addEventListener("click", (e) => {
            replyToComment(e.target.id, e.target.dataset.author);
          });
      }
    } else {
      if (course_comments.length) {
        showen_all_label.style.display = "block";
        more_comment_btn.style.display = "none";
      } else {
        showen_all_label.style.display = "none";
        more_comment_btn.style.display = "none";
      }
      for (let i = start; i < course_comments.length; i++) {
        //console.log(course_comments[i]);

        commentsContainer.insertAdjacentHTML(
          "beforeend",
          `
    <li class="comment" id="comment${comments[i]._id}">
    <div class="original-comment">
      <div class="Author-image Author-image1">
        <img src="images/user.png" alt="">
        <span class="Author-addjective Author-addjective1">${
          comments[i].creator.role == "USER"
            ? "کاربر"
            : comments[i].creator.role == "ADMIN"
            ? "مدیر"
            : "مدرس"
        }</span>
      </div>
      <div class="comment-info">
        <div class="comment-header-row">
          <div class="Author-info">
            <div class="Author-image Author-image2">
              <img src="images/user.png" alt="">
            </div>
            <div class="info">
              <p class="Author-name">${comments[i].creator.name}</p>
              <span class="comment-date">${comments[
                i
              ].creator.createdAt.substring(0, 10)}</span>
              <span class="Author-addjective Author-addjective2">${
                comments[i].role == "USER"
                  ? "کاربر"
                  : comments[i].role == "ADMIN"
                  ? "مدیر"
                  : "مدرس"
              }</span>
            </div>
          </div>
          ${
            comments[i].answerContent === null
              ? `
          <button class="reply-btn" id="${comments[i]._id}" data-author="${comments[i].creator.name}">
            <i class="fa fa-mail-reply"  id="${comments[i]._id}" data-author="${comments[i].creator.name}"></i>
          </button>
          `
              : `<button class="reply-btn" id="${comments[i]._id}"  data-author="${comments[i].creator.name}">
         
        </button>`
          }
        </div>
        <p class="comment-message">${comments[i].body}</p>
      </div>
    </div>



    <ul class="replies" id="replies${comments[i]._id}"></ul>
  </li>
    `
        );

        if (comments[i].answerContent) {
          let replyContainer = document.getElementById(
            `replies${comments[i]._id}`
          );
          replyContainer.innerHTML = "";
          replyContainer.insertAdjacentHTML(
            "beforeend",
            `
    <li class="comment">
    <div class="original-comment">
      <div class="Author-image Author-image1">
        <img src="images/user.png" alt="">
        <span class="Author-addjective Author-addjective1 teacher">${
          comments[i].answerContent.creator.role == "USER"
            ? "کاربر"
            : comments[i].answerContent.creator.role == "ADMIN"
            ? "مدیر"
            : "مدرس"
        }</span>
      </div>
      <div class="comment-info">
        <div class="comment-header-row">
          <div class="Author-info">
            <div class="Author-image Author-image2">
              <img src="images/user.png" alt="">
            </div>
            <div class="info">
              <p class="Author-name">${
                comments[i].answerContent.creator.name
              }</p>
              <span class="comment-date">${comments[
                i
              ].answerContent.createdAt.substring(0, 10)}</span>
              <span class="Author-addjective Author-addjective2 teacher">${
                comments[i].answerContent.creator.role == "USER"
                  ? "کاربر"
                  : comments[i].answerContent.creator.role == "ADMIN"
                  ? "مدیر"
                  : "مدرس"
              }</span>
            </div>
          </div>
        </div>
        <p class="comment-message">${comments[i].answerContent.body}</p>
      </div>
    </div>
  </li>
    `
          );
        }

        // handle reply btn
        document
          .getElementById(`${comments[i]._id}`)
          .addEventListener("click", (e) => {
            replyToComment(e.target.id, e.target.dataset.author);
          });
      }
    }
  } else {
    commentsContainer.insertAdjacentHTML(
      "afterbegin",
      `
      <span class="dont_have_comment">کامنتی برای این دوره وجود ندارد.</span>
      `
    );
    document.querySelector(".moreComment_box").remove();
  }
}

function registerCourseHandler(coursePrice, courseId) {
  if (isUserLogedIn()) {
    fetch(`${mainRoute}courses/${courseId}/register`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getUserTokenFromcookie()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: coursePrice }),
    }).then((res) => {
      if (res.status == 201) {
        showErrorMessage("باموفقیت در دوره ثبت نام شدید", "success");
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        showErrorMessage("خطای غیر منتظره رخ داد", "error");
      }
    });
  } else {
    showErrorMessage("لطفا ابتدا در سایت لاگین کنید", "error");
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////
// start comment
// function getCommentGenerator(comments) {
//   //console.log("comment", comments);
//   commentsContainer.innerHTML = "";
//   if (comments.length) {
//     comments.forEach((comment) => {
//       commentsContainer.insertAdjacentHTML(
//         "beforeend",
//         `
//     <li class="comment" id="comment${comment._id}">
//     <div class="original-comment">
//       <div class="Author-image Author-image1">
//         <img src="" alt="">
//         <span class="Author-addjective Author-addjective1">${
//           comment.creator.role == "USER"
//             ? "کاربر"
//             : comment.creator.role == "ADMIN"
//             ? "مدیر"
//             : "مدرس"
//         }</span>
//       </div>
//       <div class="comment-info">
//         <div class="comment-header-row">
//           <div class="Author-info">
//             <div class="Author-image Author-image2">
//               <img src="" alt="">
//             </div>
//             <div class="info">
//               <p class="Author-name">${comment.creator.name}</p>
//               <span class="comment-date">${comment.creator.createdAt.substring(
//                 0,
//                 10
//               )}</span>
//               <span class="Author-addjective Author-addjective2">${
//                 comment.role == "USER"
//                   ? "کاربر"
//                   : comment.role == "ADMIN"
//                   ? "مدیر"
//                   : "مدرس"
//               }</span>
//             </div>
//           </div>
//           <button class="reply-btn" id="${comment._id}">
//             <i class="fa fa-mail-reply"  id="${comment._id}"></i>
//           </button>
//         </div>
//         <p class="comment-message">${comment.body}</p>
//       </div>
//     </div>

//     <ul class="replies" id="${comment._id}"></ul>
//   </li>
//     `
//       );
//       // answerContent
//       if (comment.answerContent) {
//         let replyContainer = document.querySelector(".replies");
//         replyContainer.innerHTML = "";
//         replyContainer.insertAdjacentHTML(
//           "beforeend",
//           `
//     <li class="comment">
//     <div class="original-comment">
//       <div class="Author-image Author-image1">
//         <img src="" alt="">
//         <span class="Author-addjective Author-addjective1 teacher">${
//           comment.answerContent.creator.role == "USER"
//             ? "کاربر"
//             : comment.answerContent.creator.role == "ADMIN"
//             ? "مدیر"
//             : "مدرس"
//         }</span>
//       </div>
//       <div class="comment-info">
//         <div class="comment-header-row">
//           <div class="Author-info">
//             <div class="Author-image Author-image2">
//               <img src="" alt="">
//             </div>
//             <div class="info">
//               <p class="Author-name">${comment.answerContent.creator.name}</p>
//               <span class="comment-date">${comment.answerContent.createdAt.substring(
//                 0,
//                 10
//               )}</span>
//               <span class="Author-addjective Author-addjective2 teacher">${
//                 comment.answerContent.creator.role == "USER"
//                   ? "کاربر"
//                   : comment.answerContent.creator.role == "ADMIN"
//                   ? "مدیر"
//                   : "مدرس"
//               }</span>
//             </div>
//           </div>
//         </div>
//         <p class="comment-message">${comment.answerContent.body}</p>
//       </div>
//     </div>
//   </li>
//     `
//         );
//       }

//       // handle reply btn
//       document
//         .getElementById(`${comment._id}`)
//         .addEventListener("click", (e) => {
//           replyToComment(e.target.id);
//         });
//     });
//   } else {
//     commentsContainer.insertAdjacentHTML(
//       "afterbegin",
//       `
//   <span class="dont_have_comment">کامنتی برای این دوره وجود ندارد</span>
//   `
//     );
//   }
// }
function saveComment(courseName, commentValue) {
  if (commentValue) {
    if (isUserLogedIn()) {
      let comment = {
        body: commentValue.trim(),
        courseShortName: courseName,
        score: "5",
      };
      // //console.log(comment);
      fetch(`${mainRoute}comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getUserTokenFromcookie()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }).then((res) => {
        if (res.status === 201) {
          showErrorMessage("کامنت با موفقیت ثبت شد", "success");
          commentTextarea.value = "";
          closeForm();
        } else {
          showErrorMessage("خطای غیر منتظره رخ داد", "error");
        }
      });
    } else {
      showErrorMessage("لطفا ابتدا در سایت لاگین کنید", "error");
    }
  } else {
    showErrorMessage("لطفا فیلد را پرکنید", "error");
  }
}

function saveCommentAnswer(commentID, replyText) {
  if (replyText) {
    if (isUserLogedIn()) {
      let newAnswer = {
        body: replyText.trim(),
        score: 5,
      };
      fetch(`${mainRoute}comments/answer/${commentID}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getUserTokenFromcookie()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAnswer),
      }).then((res) => {
        //console.log(res);
        if (res.status === 200) {
          showErrorMessage("کامنت با موفقیت ثیت شد", "success");
          closeForm();
          commentTextarea.value = "";
        } else {
          showErrorMessage("خطای غیر منتظره رخ داد", "error");
        }
      });
    } else {
      showErrorMessage("لطفا ابتدا در سایت لاگین کنید", "error");
    }
  } else {
    showErrorMessage("لطفا فیلد را پرکنید", "error");
  }
}
// finish comment
