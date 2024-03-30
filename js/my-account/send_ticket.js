import {
  messageBox,
  showErrorMessage,
} from "../../components/messageBox/messageBox.js";

import { getUserTokenFromcookie, mainRoute } from "../funcs/utils.js";
window.customElements.define("message-box", messageBox);
let ticket_departman = document.querySelector(".ticket_departman");
let ticket_subject = document.querySelector(".ticket_subject");
let ticket_txt = document.querySelector(".ticket_txt");
let send_btn = document.querySelector(".send_btn");

let departmentID = null;
let departmentSubID = "63b688c5516a30a651e98156";

fetch("https://sabzlearn-project-backend.liara.run/v1/tickets/departments")
  .then((data) => data.json())
  .then((departments) => {
    departments.forEach((department) => {
      ticket_departman.innerHTML += `<option id="${department._id}">${department.title}</option>`;
    });
  });

ticket_departman.addEventListener("change", () => {
  document.querySelectorAll("option").forEach((option) => {
    if (option.innerHTML === ticket_departman.value) {
      departmentID = option.id;
    }
  });
});

send_btn.addEventListener("click", () => {
  if (
    ticket_departman.value != "select_departman" &&
    ticket_subject.value &&
    ticket_txt.value
  ) {
    let newTicketInfo = {
      departmentID,
      departmentSubID,
      title: ticket_subject.value,
      priority: "1",
      body: ticket_txt.value,
    };

    fetch(`${mainRoute}tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUserTokenFromcookie()}`,
      },
      body: JSON.stringify(newTicketInfo),
    }).then((res) => {
      if (res.status === 201) {
        showErrorMessage("تیکت شما با موفقیت ثبت شد", "success");
        setTimeout(()=>{
            location.href='tickets.html'
        },1500)
      } else {
        showErrorMessage("خطای غیر منتظره رخ داد", "error");
      }
    });
  } else {
    showErrorMessage("لطفا فیلد هارا پرکنید", "error");
  }
});
