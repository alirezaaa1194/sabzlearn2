import { mainRoute, getUserTokenFromcookie } from "../../../js/funcs/utils.js";

const campaignPercentInput = document.getElementById("campaign-percent-input");
const campaignPercentBtn = document.getElementById("campaign-percent-btn");
const getCampaines = async () => {
  let res = await fetch(`${mainRoute}offs`, {
    headers: {
      Authorization: `Bearer ${getUserTokenFromcookie()}`,
    },
  });
  let data = await res.json();
  campainGenerator(data);
};

const campainGenerator = (campaines) => {
  const campaigns_container = document.querySelector(".campaigns_container");
  campaigns_container.innerHTML = "";
  console.log(campaines);
  campaines.forEach((campain, index) => {
    campaigns_container.insertAdjacentHTML(
      "beforeend",
      `
  <tr>
                <td>${index + 1}</td>
                <td>${campain._id.substring(0, 4)}</td>
                <td>${campain.percent}%</td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn delete_campain_btn" data-target="${
                    campain._id
                  }">
                    حذف
                  </button>
                </td>
              </tr>
  `
    );
  });

  const delete_campain_btn = document.querySelectorAll(".delete_campain_btn");
  delete_campain_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteCampainHandler(btn.dataset.target);
    });
  });
};
const deleteCampainHandler = (id) => {
  Swal.fire({
    icon: "warning",
    title: "آیا از حذف کردن کمپین اطمینان دارید؟",
    confirmButtonText: "بله",
    showCancelButton: true,
    cancelButtonText: "خیر",
  }).then((res) => {
    if (res.isConfirmed) {
      fetch(`${mainRoute}offs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getUserTokenFromcookie()}`,
        },
      }).then(() => {
        Swal.fire({
          title: "کمپین با موفقیت حذف شد",
          confirmButtonText: "اوکی",
        });
        getCampaines();
      });
    }
  });
};
window.addEventListener("load", () => {
  getCampaines();
});
campaignPercentBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createNewCampain();
});
const createNewCampain = () => {
  if (campaignPercentInput.value) {
    fetch(`${mainRoute}offs/all`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getUserTokenFromcookie()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ discount: campaignPercentInput.value.trim() }),
    }).then((res) => {
      if (res.status == 200) {
        Swal.fire({
          icon: "success",
          title: "کمپین با موفقیت برگزار شد",
          confirmButtonText: "اوکی",
        });
        getCampaines();
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
