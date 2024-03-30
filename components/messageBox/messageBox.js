let messageBoxTemp = document.createElement("template");
messageBoxTemp.innerHTML = `
<link
rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
/>
<link
      rel="stylesheet"
      href="components/messageBox/messageBox.css" rel="stylesheet"
    />
<link
      rel="stylesheet"
      href="../components/messageBox/messageBox.css" rel="stylesheet"
    />

<div class="messageBox">
<i class=""></i>
<div>
<h4 class="ErrorMessageTitle"></h4>
<p class="ErrorMessage"></p>
<span></span>
</div>
</div>
`;

class messageBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(messageBoxTemp.content.cloneNode(true));
  }
}
function showErrorMessage(txt, status) {
  // console.log(txt, status);
  let messageBox = document
    .querySelector("message-box")
    .shadowRoot.querySelector(".messageBox");

  let messageBoxTitle = document
    .querySelector("message-box")
    .shadowRoot.querySelector("h4");

  let messageBoxIcon = document
    .querySelector("message-box")
    .shadowRoot.querySelector("i");

  let ErrorMessage = document
    .querySelector("message-box")
    .shadowRoot.querySelector(".ErrorMessage");

  let timeLine = document
    .querySelector("message-box")
    .shadowRoot.querySelector("span");

  messageBox.style.cssText = `opacity: 1;
         visibility: visible;
         left:20px;
         `;

  timeLine.style.cssText = `animation: Error 4s forwards; background:${
    status === "error" ? "#F43F5E" : "var(--hoverGreenColor)"
  };
        `;

  messageBoxIcon.style.cssText = `background:${
    status === "error" ? "#F43F5E" : "var(--hoverGreenColor)"
  };
        `;

  messageBoxIcon.className = status === "error" ? "fa fa-close" : "fa fa-check";

  messageBoxTitle.innerHTML = status === "error" ? "خطا" : "موفق";
  ErrorMessage.innerHTML = txt;
  setTimeout(function () {
    messageBox.style.cssText = `opacity: 0;
        visibility: hidden;
        left:-100%;
        `;
    timeLine.style.cssText = `none`;
  }, 4000);
}
export { messageBox, showErrorMessage };
