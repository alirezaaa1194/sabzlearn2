import {
  getUserTokenFromcookie,
  getQueryParams,
  mainRoute,
} from "../funcs/utils.js";
let chatsContainer = document.querySelector(".chats");

window.addEventListener("load", () => {
  chatGenerator();
});

function chatGenerator() {
  fetch(`${mainRoute}tickets/answer/${getQueryParams("tId")}`, {
    headers: {
      Authorization: `Bearer ${getUserTokenFromcookie()}`,
    },
  })
    .then((res) => {
      if (res.status === 404) {
        chatsContainer.innerHTML =
          '<span style="text-align:center; color: var(--TextLightColor);">هنوز پاسخ داده نشده. لطفا منتظر بمانید.<span>';
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        chatsContainer.innerHTML = "";
        chatsContainer.insertAdjacentHTML(
          "beforeend",
          `
        <div class="ticket_chat Me">
        <span class="pm_main">${data.ticket}</span>
      </div>

      <div class="ticket_chat them">
        <p class="pm_main">${data.answer}</p>
      </div>



        
        `
        );
      }
    });
  //   getQueryParams("tId");
}
