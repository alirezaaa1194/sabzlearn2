import {
  getCourseByName,
  getQueryParams,
  getUserTokenFromcookie,
  mainRoute,
  getUserInfo,
  isUserRegisteredToThisCourse,
  isUserLogedIn,
  getAllCourses,
} from "./funcs/utils.js";
import {
  messageBox,
  showErrorMessage,
} from "../components/messageBox/messageBox.js";
window.customElements.define("message-box", messageBox);
let editor = null;

// for ckeditor
ClassicEditor.create(document.querySelector("#editor"), {
  alignment: {
    options: ["left", "right", "justify", "center"],
  },
  placeholder: "پرسش خودرا بپرسید...",
  toolbar: ["bold", "link", "alignment", "undo", "redo"],
  language: "fa",
}).then((newEditor) => {
  editor = newEditor;
});

const breadcrumb_category_name = document.querySelector(
  ".breadcrumb_category_name"
);
const breadcrumb_course_name = document.querySelector(
  ".breadcrumb_course_name"
);
const course_name_label = document.querySelector(".course_name_label");
const video_player = document.querySelector("#player");
const session_episode_number = document.querySelector(
  ".session_episode_number"
);
const session_episode_name = document.querySelector(".session_episode_name");
const video_download_btn = document.querySelector(".video_download_btn");
const course_episode_count_label = document.querySelector(
  ".course_episode_count_label"
);
const course_timeInfo_label = document.querySelector(".course_timeInfo_label");
const course_status_label = document.querySelector(".course_status_label");

const creator_profile = document.querySelectorAll(".creator_profile");
const creator_name_label = document.querySelectorAll(".creator_name_label");
const creator_rol_label = document.querySelector(".creator_rol_label");
const accordion_item_body = document.querySelector(".accordion_item_body");
let whichCommentLabel = document.querySelector(".which-comment");

// for comment

let commentsContainer = document.querySelector(".comments");

const send_btn = document.querySelector(".send_btn");
const cancel_btn = document.querySelector(".cancel_btn");
const userNameLabel = document.querySelector(".user-name");

let commentId = null;
let courseId = null;
let courseHour = 0;
let courseMin = 0;
let courseSec = 0;

getCourseByName("cName").then((data) => {
  if (!data.message) {
    sessionContentGenerator(data);
    courseId = data._id;
  } else {
    location.href = `courses.html?s=${getQueryParams("cName")}`;
  }
});

function sessionContentGenerator(course) {
  document.querySelector(".teacher_job").innerHTML = course.creator.role;
  // start breadcrumb
  breadcrumb_category_name.innerHTML = course.categoryID.title;
  breadcrumb_category_name.href = `https://alirezaaa1194.github.io/sabzlearn2/course_category.html?cat=${course.categoryID.name}&catName=${course.categoryID.title}`;

  breadcrumb_course_name.innerHTML = course.name;
  breadcrumb_course_name.href = `https://alirezaaa1194.github.io/sabzlearn2/course.html?name=${course.shortName}`;
  // finish breadcrumb
  course_name_label.innerHTML = course.name;
  accordion_item_body.innerHTML = "";
  course.sessions.forEach((session, index) => {
    accordion_item_body.insertAdjacentHTML(
      "beforeend",
      `
    

    <div class="accordion_body_list_item" id="${session._id}" data-target="${
        session._id
      }">
    <div class="session_name">
      <span class="session_seen_status"></span>
      <a ${
        (!session.isUserRegisteredToThisCourse && !session.free) ||
        !session.free
          ? ""
          : `href="session.html?cName=${course.shortName}&episode=${
              session._id
            }&epNum=${index + 1}"`
      } class="accordio_list_top_section">
        <span class="course_session_episode_name"
          >${session.title}</span
        >
      </a>
    </div>
    <span class="course_time_label">${
      session.time.includes(":") ? session.time : session.time + ":00"
    }</span>
  </div>

    `
    );
    document.querySelector(".accordion_item_header").classList.add("active");
    accordion_item_body.style.height = accordion_item_body.scrollHeight + "px";

    document.querySelectorAll(".accordion_body_list_item").forEach((item) => {
      // console.log(item);
      if (item.dataset.target == getQueryParams("episode")) {
        item.classList.add("active");
        document.querySelector(".accordion_main").scrollTo(0, item.offsetTop);
        // setTimeout(() => {
        // }, 200);
      }
    });
  });

  course.sessions.forEach((session) => {
    let time = session.time.includes(":")
      ? session.time.split(":")
      : (session.time + ":0").split(":");
    // let time = session.time.split(":");

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
  });

  course_timeInfo_label.innerHTML =
    courseHour.toString().padStart(2, 0) +
    ":" +
    courseMin.toString().padStart(2, 0) +
    ":" +
    courseSec.toString().padStart(2, 0);

  creator_name_label.forEach((label, index) => {
    label.innerHTML = course.creator.name;
  });

  creator_rol_label.innerHTML = course.creator.role;

  fetch(
    `https://sabzlearn-project-backend.liara.run/v1/courses/${
      course.shortName
    }/${getQueryParams("episode")}`,
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGU2YjBlMWQ1MTQyYjkxYWZhOWJiMyIsImlhdCI6MTcxMTgzNjEyNCwiZXhwIjoxNzE0NDI4MTI0fQ.XLOtjcvVijn-8XGFHpgGSHugT8-Ci06YkOlGur3e0g0`,
      },
    }
  )
    .then((res) => {
      if (res.status != 400) {
        return res.json();
      } else {
        location.href = "index.html";
      }
    })
    .then((data) => {
      // console.log(data);

      // console.log(data.session);

      redirectUserToCoursePage(data.session);

      video_player.src = `https://sabzlearn-project-backend.liara.run/courses/covers/${data.session.video}`;
      video_player.poster = `https://sabzlearn-project-backend.liara.run/courses/covers/${course.cover}`;

      const player = new Plyr("#player", {
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

      document.title = `${data.session.title} - سبزلرن`;
      session_episode_name.innerHTML = data.session.title;
      // creator_profile[index].src = 'https://sabzlearn-project-backend.liara.run/v1/courses/covers/'+ course.creator.profile;
      video_download_btn.href = `https://sabzlearn-project-backend.liara.run/courses/covers/${data.session.video}`;
      course_episode_count_label.innerHTML = data.sessions.length;
      course_status_label.innerHTML =
        course.status == "start"
          ? "درحال برگزاری"
          : course.status == "presell"
          ? "پیش فروش"
          : "تمام شده";
    });

  session_episode_number.innerHTML = getQueryParams("epNum");
}

window.addEventListener("load", () => {
  if (!location.search) {
    location.href = "courses.html";
  }

  getCourseByName("cName").then((res) => {
    isUserRegisteredToThisCourse(res._id).then((res) => {
      if (res) {
        getQuestions();
      }
    });
  });
});

send_btn.addEventListener("click", () => {
  if (editor.getData()) {
    if (
      getCourseByName("cName").then((data) => {
        isUserRegisteredToThisCourse(data._id).then((res) => {
          if (res) {
            if (!commentId) {
              let newQ = {
                departmentID: "63b68879f1d06a5090090f60",
                departmentSubID: "63b688c5516a30a651e98156",
                title: "پرسش و پاسخ دوره",
                priority: "1",
                body: editor.getData(),
                course: courseId,
              };

              fetch(`${mainRoute}tickets`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${getUserTokenFromcookie()}`,
                },
                body: JSON.stringify(newQ),
              }).then((data) => {
                commentId = null;
                whichCommentLabel.innerHTML = "پرسش جدید";
                editor.setData("");
                getQuestions();
                showErrorMessage("با موفقیت ثبت شد", "success");
              });
            }
          } else {
            showErrorMessage("لطفا در دوره ثبت نام کنید", "error");
          }
        });
      })
    ) {
    }
  } else {
    showErrorMessage("لطفا فیلد را پر کنید", "error");
  }
});

function getQuestions() {
  fetch(`${mainRoute}tickets/user`, {
    headers: {
      Authorization: `Bearer ${getUserTokenFromcookie()}`,
    },
  })
    .then((data) => data.json())
    .then((que) => {
      questionsGenerator(que);
    });
}

function questionsGenerator(comments) {
  commentsContainer.innerHTML = "";

  if (comments.length) {
    document.querySelector(".about_this_question_label").style.display = "none";
    comments.forEach((comment) => {
      commentsContainer.insertAdjacentHTML(
        "beforeend",
        `
    <li class="comment" id="comment${comment._id}">
    <div class="original-comment">
      <div class="Author-image Author-image1">
        <img src="images/user.png" alt="">
        <span class="Author-addjective Author-addjective1">دانشجو</span>
      </div>
      <div class="comment-info">
        <div class="comment-header-row">
          <div class="Author-info">
            <div class="Author-image Author-image2">
              <img src="images/user.png" alt="">
            </div>
            <div class="info">
              <p class="Author-name">${comment.user}</p>
              <span class="comment-date">${comment.createdAt.substring(
                0,
                10
              )}</span>
              <span class="Author-addjective Author-addjective2">دانشجو</span>
            </div>
          </div>
          <button class="reply-btn" id="${comment._id}"></button>
        </div>
        <p class="comment-message">${comment.body}</p>
      </div>
    </div>

    <ul class="replies" id="reply${comment._id}"></ul>
  </li>
    `
      );

      if (comment._id) {
        fetch(`${mainRoute}tickets/answer/${comment._id}`, {
          headers: {
            Authorization: `Bearer ${getUserTokenFromcookie()}`,
          },
        })
          .then((data) => data.json())
          .then((answer) => {
            let replyContainer = document.querySelector(`#reply${comment._id}`);
            replyContainer.innerHTML = "";
            if (answer.answer) {
              replyContainer.insertAdjacentHTML(
                "beforeend",
                `
        <li class="comment">
        <div class="original-comment">
          <div class="Author-image Author-image1">
            <img src="./images/user.png" alt=""></div>
          <div class="comment-info">
            <div class="comment-header-row">
              <div class="Author-info">
                <div class="Author-image Author-image2">
                  <img src="" alt="">
                </div>
              </div>
            </div>
            <p class="comment-message">${answer.answer}</p>
          </div>
        </div>
      </li>
        `
              );
            }
          });
      }

      // answerContent
      // handle reply btn
      document
        .getElementById(`${comment._id}`)
        .addEventListener("click", (e) => {
          replyToComment(e.target.id);
        });
    });
  }
}

function replyToComment(id) {
  commentId = id;
  window.scrollTo(
    100,
    document.querySelector(".querstion_container").offsetTop
  );
  whichCommentLabel.innerHTML = `درپاسخ به پرسش #${id.substring(0, 4)}`;
}
cancel_btn.addEventListener("click", () => {
  commentId = null;
  whichCommentLabel.innerHTML = "پرسش جدید";
  editor.setData("");
});

getUserInfo().then((userInfo) => {
  if (userInfo) {
    userNameLabel.innerHTML = userInfo.name;
  } else {
    userNameLabel.innerHTML = "کاربر";
  }
});

function redirectUserToCoursePage(session) {
  getAllCourses().then((courses) => {
    let mainCourse = courses.find((course) => course._id == session.course);
    // console.log(mainCourse);
    if (!session.free) {
      if (!isUserLogedIn()) {
        location.href = `course.html?name=${mainCourse.shortName}`;
      } else {
        isUserRegisteredToThisCourse(mainCourse._id).then((res) => {
          if (!res) {
            location.href = `course.html?name=${mainCourse.shortName}`;
          }
        });
      }
    }
  });
  // console.log(session.free);
}
