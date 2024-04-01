import {
  mainRoute,
  getUserTokenFromcookie,
  getAllCourses,
} from "../../../js/funcs/utils.js";

let courseId = -1;
const insert_sesson_btn = document.querySelector(".insert_sesson_btn");
const getSession = async () => {
  let res = await fetch(`${mainRoute}courses/sessions`);
  let data = await res.json();
  sessionsGenerator(data);
};

const sessionsGenerator = (sessions) => {
  //   console.log(sessions);
  const sessionsContainer = document.querySelector(".sessionsContainer");
  sessionsContainer.innerHTML = "";
  sessions.forEach((session) => {
    sessionsContainer.insertAdjacentHTML(
      "beforeend",
      `
    <tr>
                      <td>${session._id.substring(0, 4)}</td>
                      <td>${session.title}</td>
                      <td>${session.free ? "رایگان" : "نقدی"}</td>
                      <td>${session.time}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-danger delete_session_btn"
                          id="delete-btn"
                          data-target="${session._id}"
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
    `
    );
  });

  const delete_session_btn = document.querySelectorAll(".delete_session_btn");
  delete_session_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteSessionHandler(btn.dataset.target);
    });
  });
};
const deleteSessionHandler = (id) => {
  Swal.fire({
    icon: "warning",
    title: "آیا از حذف کردن جلسه اطمینان دارید؟",
    confirmButtonText: "بله",
    showCancelButton: true,
    cancelButtonText: "خیر",
  }).then((res) => {
    if (res.isConfirmed) {
      fetch(`${mainRoute}courses/sessions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getUserTokenFromcookie()}`,
        },
      }).then(() => {
        Swal.fire({
          title: "جلسه با موفقیت حذف شد",
          confirmButtonText: "اوکی",
        });
        getSession();
      });
    }
  });
};

const courseSelectHandler = () => {
  let course_select_box = document.querySelector(".course_select_box");
  getAllCourses().then((courses) => {
    course_select_box.innerHTML = "";
    course_select_box.insertAdjacentHTML(
      "beforeend",
      `
    <option value="-1">دوره موردنظر را انتخاب کنید</option>
    `
    );
    courses.forEach((course) => {
      course_select_box.insertAdjacentHTML(
        "beforeend",
        `
    <option value="${course._id}">${course.name}</option>
    `
      );
    });

    course_select_box.addEventListener("change", () => {
      courseId = course_select_box.value;
    });
  });
};
const insertNewSession = () => {
  insert_sesson_btn.value='درحال بارگزاری'
  let session_name_input = document.querySelector(".session_name_input");
  let session_time_input = document.querySelector(".session_time_input");
  let session_video_input = document.querySelector(".session_video_input");
  let session_free_price_input = document.querySelector(
    ".session_free_price_input"
  );
  let session_noFree_price_input = document.querySelector(
    ".session_noFree_price_input"
  );
  if (
    session_name_input.value.trim() &&
    session_time_input.value.trim() &&
    session_video_input.files[0] &&
    (session_free_price_input.checked || session_noFree_price_input.checked)
  ) {
    let formData = new FormData();

    formData.append("title", session_name_input.value.trim());
    formData.append("time", +session_time_input.value.trim());
    formData.append("video", session_video_input.files[0]);
    formData.append(
      "free",
      session_free_price_input.checked
        ? 1
        : session_noFree_price_input.checked
        ? 0
        : ""
    );

    fetch(`${mainRoute}courses/${courseId}/sessions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getUserTokenFromcookie()}`,
      },
      body: formData,
    }).then((res) => {
      if (res.status == 201) {
        Swal.fire({
          title: "جلسه با موفقیت اضافه شد",
          confirmButtonText: "اوکی",
        });

        session_name_input.value = "";
        session_time_input.value = "";
        session_video_input.value = "";
        insert_sesson_btn.value='افزودن'
        course_select_box.value='دوره موردنظر را انتخاب کنید'
        getSession();
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "لطفا فیلد را پرکنید",
      confirmButtonText: "اوکی",
    });
  }
};

insert_sesson_btn.addEventListener("click", (e) => {
  e.preventDefault();
  insertNewSession();
});
window.addEventListener("load", () => {
  getSession();
  courseSelectHandler();
});
