import { mainRoute, getUserTokenFromcookie } from "../../../js/funcs/utils.js";
let commentsArray = [];
const getComments = async () => {
  let res = await fetch(`${mainRoute}tickets`, {
    headers: {
      Authorization: `Bearer ${getUserTokenFromcookie()}`,
    },
  });
  let data = await res.json();
  commentsArray = data;
  commentsGenerator(data);
};

const commentsGenerator = (comments) => {
  console.log(comments);
  const comments_container = document.querySelector(".comments_container");
  comments_container.innerHTML = "";
  comments.forEach((comment, index) => {
    comments_container.insertAdjacentHTML(
      "beforeend",
      `
    
      <tr>
      <td class="${
        comment.answer === 1 ? "answer-comment" : "no-answer-comment"
      }">${index + 1}</td>
      <td>${comment.title}</td>
      <td>${comment.course || "--"}</td>
      <td>${comment.user}</td>
      <td>${comment.createdAt.slice(0, 10)}</td>
      <td>${comment.departmentID}</td>
      <td>${comment.departmentSubID}</td>
      <td>
          <button type='button'class='btn btn-primary edit-btn show_comment_btn' id="${
            comment._id
          }">مشاهده</button>
      </td>
      <td>
          <button type='button' class='btn btn-primary edit-btn answer_comment_btn' id="${
            comment._id
          }">پاسخ</button>
      </td>
  </tr>

    `
    );
  });

  const show_comment_btn = document.querySelectorAll(".show_comment_btn");
  const answer_comment_btn = document.querySelectorAll(".answer_comment_btn");
  const accept_comment_btn = document.querySelectorAll(".accept_comment_btn");
  const reject_comment_btn = document.querySelectorAll(".reject_comment_btn");
  const remove_comment_btn = document.querySelectorAll(".remove_comment_btn");
  show_comment_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
      showCommentContent(btn.id);
    });
  });
  answer_comment_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
      answerCommentHandler(btn.id);
    });
  });
  accept_comment_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
      acceptCommentHandler(btn.id);
    });
  });
  reject_comment_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
      rejectCommentHandler(btn.id);
    });
  });
  remove_comment_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
      removeCommentHandler(btn.id);
    });
  });
};
window.addEventListener("load", () => {
  getComments();
});

const showCommentContent = (id) => {
  let mainComment = commentsArray.find((comment) => comment._id === id);
  Swal.fire({
    title: mainComment.body,
    confirmButtonText: "اوکی",
  });
};

const answerCommentHandler = async (id) => {
  let mainComment = commentsArray.find((comment) => comment._id === id);
  Swal.fire({
    input: "text",
    title: `در پاسخ به سوال ${mainComment.user}`,
    confirmButtonText: "ارسال",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`${mainRoute}tickets/answer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getUserTokenFromcookie()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: result.value, ticketID: id }),
      }).then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: "پاسخ با موفقیت ثبت شد",
            confirmButtonText: "اوکی",
          });
          getComments();
        }
      });
    }
  });
};
