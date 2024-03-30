let accordion_item_header = document.querySelectorAll(".accordion_item_header");
let accordion_item_body = document.querySelectorAll(".accordion_item_body");

accordion_item_header.forEach((item) => {
  item.addEventListener("click", (e) => {
    accordion_item_header.forEach((item) => {
      if (
        item.className.includes("accordion_item_header") &&
        item.dataset.target != item.dataset.target
      ) {
        item.classList.remove("active");
      }
    });
    item.classList.toggle("active");

    accordion_item_body.forEach((body) => {
      if (item.dataset.target === body.id) {
        if (getComputedStyle(body).height == "0px") {
          body.style.height = body.scrollHeight + "px";
        } else {
          body.style.height = "0px";
        }
      } else {
        body.style.height = "0px";
      }
    });
  });
});

window.addEventListener("load", () => {
  accordion_item_header.forEach((item) => {
    if (item.className.includes("active")) {
      accordion_item_body.forEach((body) => {
        if (item.dataset.target === body.id) {
          if (getComputedStyle(body).height == "0px") {
            body.style.height = body.scrollHeight + "px";
          } else {
            body.style.height = "0px";
          }
        } else {
          body.style.height = "0px";
        }
      });
    }
  });
});
