import {
  isUserLogedIn,
  getUserInfo,
  getUserTokenFromcookie,
  mainRoute,
  getAllCourses,
  getAllCategories,
} from "../../../js/funcs/utils.js";

const submitBtn = document.querySelector(".submit-btn");
const courseName_input = document.querySelector(".courseName_input");
const coursePrice_input = document.querySelector(".coursePrice_input");
const courseCategory_input = document.querySelector(".courseCategory_input");
const courseCover_input = document.querySelector(".courseCover_input");
const courseShortName_input = document.querySelector(".courseShortName_input");
const presell_input = document.querySelector(".presell_input");
const courseSatusElem = document.querySelector(".courseSatusElem");
const startCourseStatus_input = document.querySelector(
  ".startCourseStatus_input"
);
const courseDescription_input = document.querySelector(
  ".courseDescription_input"
);

let categoryId = null;

window.addEventListener("load", () => {
  getAllCourses().then((res) => {
    coursesGenerator(res);
  });
});

const coursesGenerator = (courses) => {
  const courses_container = document.querySelector(".courses_container");
  courses_container.innerHTML = "";
  courses.forEach((course) => {
    courses_container.insertAdjacentHTML(
      "beforeend",
      `
    <tr>
    <td id="id">${course._id.substring(0, 5)}</td>
    <td id="name">
      <a href="">${course.name}</a>
    </td>
    <td id="price">${
      course.price ? course.price.toLocaleString() : "رایگان"
    }</td>
    <td id="condition">${course.registers}</td>
    <td id="price">${course.support}</td>
    <td id="price">${course.categoryID.title}</td>
    <td id="price">${course.courseAverageScore}</td>

    <td id="condition">${
      course.status == "start"
        ? "درحال برگزاری"
        : course.status == "presell"
        ? "پیش فروش"
        : "تمام شده"
    }</td>

    <td>
        <button type="button" class="btn btn-primary edit-btn-${
          course._id
        }" data-target="${course._id}" id="edit-btn">ویرایش</button>
    </td>
    <td>
        <button type="button" class="btn btn-danger delete-btn-${
          course._id
        }" data-target="${course._id}" id="delete-btn">حذف</button>
    </td>
</tr> 
    
    `
    );

    let editCourseBtn = document.querySelector(`.edit-btn-${course._id}`);
    let deleteCourseBtn = document.querySelector(`.delete-btn-${course._id}`);

    editCourseBtn.addEventListener("click", (e) => {
      editCourseHandler(course);
    });
    deleteCourseBtn.addEventListener("click", (e) => {
      deleteCourseHandler(course);
    });
  });
};

function editCourseHandler(course) {}
function deleteCourseHandler(course) {
  Swal.fire({
    title: "آیا از حذف دوره اطمینان دارید؟",
    confirmButtonText: "بله",
    showCancelButton: true,
    cancelButtonText: "خیر",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`${mainRoute}courses/${course._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getUserTokenFromcookie()}`,
        },
      }).then(() => {
        Swal.fire({
          title: "دوره با موفقیت حذف شد",
          confirmButtonText: "اوکی",
        });
        getAllCourses().then((res) => {
          coursesGenerator(res);
        });
      });
    }
  });
}

getAllCategories().then((res) => {
  // console.log(res);
  res.forEach((cat) => {
    courseCategory_input.insertAdjacentHTML(
      "beforeend",
      `
    <option value="${cat.title}" id="${cat._id}">${cat.title}</option>
    `
    );
  });
});

courseCategory_input.addEventListener("change", () => {
  document.querySelectorAll("option").forEach((option) => {
    if (option.value == courseCategory_input.value) {
      categoryId = option.id ? option.id : null;
    }
  });
});
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    courseName_input.value &&
    courseShortName_input.value &&
    coursePrice_input.value &&
    categoryId &&
    (presell_input.value || startCourseStatus_input.value)
  ) {
    let formDate = new FormData();

    formDate.append("name", courseName_input.value.trim());
    formDate.append("description", courseDescription_input.value.trim());
    formDate.append("shortName", courseShortName_input.value.trim());
    formDate.append("categoryID", categoryId);
    formDate.append("price", +coursePrice_input.value);
    formDate.append("support", courseSatusElem.value.trim());
    formDate.append(
      "status",
      presell_input.checked
        ? "presell"
        : startCourseStatus_input.checked
        ? "start"
        : ""
    );
    formDate.append("cover", courseCover_input.files[0]);

    fetch(`${mainRoute}courses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getUserTokenFromcookie()}`,
      },
      body: formDate,
    }).then((res) => {
      getAllCourses().then((res) => {
        coursesGenerator(res);
      });
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "لطفا فیلد هارا پرکنید",
      confirmButtonText: "اوکی",
    });
  }
});
