export const saveUserTokenIncookies = (userToken, time) => {
  let now = new Date();
  now.setTime(now.getTime() + 24 * 60 * 60 * time * 1000);
  document.cookie = `userToken=${userToken}; path=/; expires=${now}`;
};

export const getUserTokenFromcookie = () => {
  return document.cookie.includes(";")
    ? document.cookie.substring(10, document.cookie.indexOf(";"))
    : document.cookie.substring(10);
};

export const isUserLogedIn = () => {
  return document.cookie.includes("userToken") ? true : false;
};

export const logOut = (userToken) => {
  let now = new Date();
  now.setTime(now.getTime() + 24 * 60 * 60 * -2 * 1000);
  document.cookie = `userToken=${userToken}; path=/; expires=${now}`;
};

export const redirectToLoginPage = () => {
  if (!isUserLogedIn()) {
    location.href =
      "https://alirezaaa1194.github.io/sabzlearn2/loginBy_email.html";
  }
};
export const redirectToPannel = () => {
  if (isUserLogedIn()) {
    location.href = "https://alirezaaa1194.github.io/sabzlearn2/my-account/";
  }
};

export const checkPhonePattern = (phoneNumber) => {
  let regEx = new RegExp(/^(?:0|98|\+98)\d{10}$/, "g");
  return regEx.test(phoneNumber);
};
export const checkEmailPattern = (email) => {
  let regEx = new RegExp(/^(\w+)(@+)(\w{1,})(\.\w+)$/, "g");
  return regEx.test(email);
};
export let mainRoute = `https://sabzlearn-project-backend.liara.run/v1/`;

export const getUserInfo = async () => {
  if (isUserLogedIn()) {
    const userToken = getUserTokenFromcookie();
    const userInfo = await fetch(`${mainRoute}auth/me`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const info = await userInfo.json();
    return info;
  }
};

export const updateUser = () => {
  let userNewData = {
    name: firstName_input.value.trim(),
    username: userName_input.value.trim(),
    email: email_input.value.trim(),
    phone: phone_number_input.value.trim(),
    password: new_password.value.trim(),
  };
  const userToken = getUserTokenFromcookie();

  return fetch(`${mainRoute}users/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify(userNewData),
  });
};

export const getAllCourses = async () => {
  const allCourses = await fetch(`${mainRoute}courses`);
  const courses = await allCourses.json();
  return courses;
};
export const getPopularCourses = async () => {
  const allCourses = await fetch(`${mainRoute}courses/popular`);
  const courses = await allCourses.json();
  return courses;
};
export const getPresellCourses = async () => {
  const allCourses = await fetch(`${mainRoute}courses/presell`);
  const courses = await allCourses.json();
  return courses;
};
export const getMenus = async () => {
  const allMenus = await fetch(`${mainRoute}menus`);
  const menus = await allMenus.json();
  return menus;
};
export const getArticles = async () => {
  const allArticles = await fetch(`${mainRoute}articles`);
  const articles = await allArticles.json();
  return articles;
};

export const getQueryParams = (qName) => {
  const query = new URLSearchParams(location.search).get(qName);
  return query;
};

export const getCourseByCategory = async (catName) => {
  const getCourse = await fetch(`${mainRoute}courses/category/${catName}`);
  const parseCourse = await getCourse.json();
  return parseCourse;
};
export const getAllCategories = async () => {
  const getCat = await fetch(`${mainRoute}category`);
  const parseCat = await getCat.json();
  return parseCat;
};

export const getFilteredCourses = async (filterName) => {
  //console.log(filterName);
  switch (filterName) {
    case "free-courses":
      return getAllCourses().then((data) => {
        return data.filter((course) => {
          return course.price == 0;
        });
      });
      break;
    case "presell-courses":
      return getPresellCourses().then((data) => {
        return data;
      });
      break;
    case "my-courses":
      return getUserInfo().then((info) => {
        return info.courses;
      });
      break;

    case "all_course":
      return getAllCourses().then((data) => {
        //console.log(data);
        return data;
      });
      break;

    case "Inexpensive_course":
      return getAllCourses().then((data) => {
        return data.filter((course) => {
          return course.price < 300_000;
        });
      });
      break;
    case "expensive_course":
      return getAllCourses().then((data) => {
        return data.filter((course) => {
          return course.price > 300_000;
        });
      });
      break;
    case "most_comment_course":
      return getAllCourses().then((data) => {
        return data.filter((course) => {
          return course.registers > 2;
        });
      });
      break;
    case undefined:
      return getAllCourses().then((data) => {
        return data;
      });
      break;
  }
};

export function getSearchedCourses(array, searchValue) {
  let outputCourses = array.filter((course) => {
    return (
      course.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      course.description.includes(searchValue)
    );
  });
  return outputCourses;
}
export const getCourseByName = async (name) => {
  let courseName = null;
  if (getQueryParams(name)) {
    courseName = getQueryParams(name);
    const getCourse = await fetch(`${mainRoute}courses/${courseName}`);
    const parseCourse = await getCourse.json();
    return parseCourse;
  }
};

export function getBlogByFilter(id) {
  return getArticles().then((data) => {
    switch (id) {
      case "normal_blogs":
        return data.slice(0, data.length);
        break;
      case "latest_blogs":
        return data;
        break;
      case "oldest_blogs":
        return data.reverse();
        break;
      case "most_comment_blogs":
        return data;
        break;
    }
  });
}

export function myCourseGenerator(courses, container) {
  container.innerHTML = "";
  courses.forEach((course) => {
    if (course) {
      container.insertAdjacentHTML(
        "beforeend",
        `
      <div class="course_box">
      <div class="course_box_header">
        <a href="../course.html?name=${course.shortName}">
          <img
            src="https://sabzlearn-project-backend.liara.run/courses/covers/${course.cover}"
            alt=""
          />
        </a>
      </div>
      <div class="course_box_body">
        <a href="../course.html?name=${course.shortName}">${course.name}</a>
      </div>
      <div class="course_box_footer">
        <div class="course_seen_time_label">
          <span>میزان مشاهده</span>
          <span>0%</span>
        </div>
        <div class="range_label">
          <span class="rang_percent"></span>
        </div>
      </div>
    </div>
    `
      );
    }
  });
}

export const isUserRegisteredToThisCourse = (courseId) => {
  if (isUserLogedIn()) {
    return getUserInfo().then((res) => {
      if (res.courses.length) {
        let isHave = res.courses.some((course) => {
          if (course) {
            return course._id === courseId;
          }
        });
        return isHave;
      } else {
        return false;
      }
    });
  } else {
    return false;
  }
};
