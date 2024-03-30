import {
  getUserInfo,
  getUserTokenFromcookie,
  mainRoute,
} from "../funcs/utils.js";
let allTicket_count_label = document.querySelector(".allTicket_count_label");
let noanswerdTicket_label = document.querySelector(".noanswerdTicket_label");
let closedTicket_Label = document.querySelector(".closedTicket_Label");

let last_tickets_container = document.querySelector(".last_tickets_container");

fetch(`${mainRoute}tickets/user`, {
  headers: {
    Authorization: `Bearer ${getUserTokenFromcookie()}`,
  },
})
  .then((data) => data.json())
  .then((tickets) => {
    myTicketsGenerator(tickets);
  });

function myTicketsGenerator(tickets) {
  console.log(tickets);
  let answeredTickets = tickets.filter((ticket) => ticket.answer);
  let noAnsweredTickets = tickets.filter((ticket) => !ticket.isAnswer);
  allTicket_count_label.innerHTML = tickets.length + " تیکت";
  noanswerdTicket_label.innerHTML = noAnsweredTickets.length - answeredTickets.length + " تیکت";
  closedTicket_Label.innerHTML = answeredTickets.length + " تیکت";

  last_tickets_container.innerHTML = "";

  if (!tickets.length) {
    last_tickets_container.innerHTML =
      '<span class="you_donthave_ticket" style="color: var(--TextLightColor); text-align: center; margin: 20px 0; display:inline-block; width:100%;">هیچ تیکتی ارسال نکرده اید</span>';
  }
  tickets.forEach((ticket) => {
    last_tickets_container.insertAdjacentHTML(
      "beforeend",
      `
    
    <div class="tickets_box">
                <div class="ticket_name_box">
                  <span class="ticket_code">#${ticket._id.substring(
                    ticket._id.length - 4,
                    ticket._id.length
                  )}</span>
                  <a href="ticket_chat.html?tId=${
                    ticket.parent ? ticket.parent : ticket._id
                  }" class="ticket_name">${ticket.title}</a>
                </div>
                <div class="ticket_info">
                  <span class="ticket_date">${ticket.createdAt.substring(
                    0,
                    10
                  )} (${ticket.createdAt.substring(12, 19)})</span>
                  <span class="ticket_departman ended">${
                    ticket.departmentID
                  }</span>
                  <span class="ticket_status ${
                    ticket.answer ? "answered" : "ended"
                  }">${ticket.answer ? "پاسخ داده شده" : "منتظر پاسخ"}</span>
                </div>
              </div>
    `
    );
  });
}
