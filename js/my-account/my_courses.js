import {
  getUserInfo,
  getUserTokenFromcookie,
  mainRoute,
  myCourseGenerator,
} from "../funcs/utils.js";

let allCourse_label = document.querySelector(".allCourse_label");
let noFree_course_label = document.querySelector(".noFree_course_label");
let free_course_label = document.querySelector(".free_course_label");

let last_seen_courses_container = document.querySelector(
  ".last_seen_courses_container"
);
let you_donthave_course = document.querySelector(".you_donthave_course");

// get userCourse
getUserInfo().then((data) => {
  if (data.courses.length) {
    myCourseGenerator(data.courses, last_seen_courses_container);
    let freeCourse = data.courses.filter((course) => !course.price);
    let noFreeCourse = data.courses.filter((course) => course.price);

    allCourse_label.innerHTML = data.courses.length + " دوره";
    noFree_course_label.innerHTML = noFreeCourse.length? noFreeCourse.length + " دوره":'0 دوره';
    free_course_label.innerHTML = freeCourse.length?freeCourse.length + " دوره": '0 دوره';
  } else {
    allCourse_label.innerHTML = "0 دوره";
    noFree_course_label.innerHTML = "0 دوره";
    free_course_label.innerHTML = "0 دوره";
    last_seen_courses_container.innerHTML = "";
    you_donthave_course.style.display = "block";
  }
});