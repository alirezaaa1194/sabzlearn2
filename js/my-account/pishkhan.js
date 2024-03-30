import {
  getUserInfo,
  getUserTokenFromcookie,
  mainRoute,
  myCourseGenerator,
} from "../funcs/utils.js";
let myCoursePrice_label = document.querySelector(".myCoursePrice_label");
let myCourse_label = document.querySelector(".myCourse_label");
let myTickets_label = document.querySelector(".myTickets_label");
let myCash_label = document.querySelector(".myCash_label");
let you_donthave_course = document.querySelector(".you_donthave_course");
let you_donthave_ticket = document.querySelector(".you_donthave_ticket");

let last_seen_courses_container = document.querySelector(
  ".last_seen_courses_container"
);
let last_tickets_container_body = document.querySelector(
  ".last_tickets_container_body"
);
let coursePrice = 0;
// get userCourse
getUserInfo().then((data) => {
  console.log(data);
  if (data.courses.length) {
    myCourseGenerator(data.courses, last_seen_courses_container);
    data.courses.forEach((course) => {
      coursePrice += course.price;
    });
    myCoursePrice_label.innerHTML = coursePrice.toLocaleString() + "تومان";
  } else {
    myCoursePrice_label.innerHTML = "0 تومان";
    last_seen_courses_container.innerHTML = "";
    you_donthave_course.style.display = "block";
  }
  myCourse_label.innerHTML = data.courses.length + " دوره";
});

// get userTickets
fetch(`${mainRoute}tickets/user`, {
  headers: {
    Authorization: `Bearer ${getUserTokenFromcookie()}`,
  },
})
  .then((data) => data.json())
  .then((tickets) => {
    if (!tickets.length) {
      you_donthave_ticket.style.display = "block";
    }
    myTicketsGenerator(tickets);
    // console.log(tickets);
    myTickets_label.innerHTML = tickets.length + " تیکت";
  });

function myTicketsGenerator(tickets) {
  console.log(tickets);
  last_tickets_container_body.innerHTML = "";
  tickets.slice(0,3).forEach((ticket) => {
    last_tickets_container_body.insertAdjacentHTML(
      "beforeend",
      `
    
    <div class="tickets_box">
                    <a href="ticket_chat.html?tId=${
                      ticket.parent ? ticket.parent : ticket._id
                    }" class="ticket_name">${ticket.title}</a>
                    <div class="ticket_info">
                      <span class="ticket_date">${ticket.createdAt.substring(
                        0,
                        10
                      )}</span>
                      <span class="ticket_status ${
                        !ticket.answer ? "ended" : "answered"
                      }">${
        !ticket.answer ? "منتظر پاسخ" : "پاسخ داده شده"
      }</span>
                    </div>
                  </div>
    `
    );
  });
}