import {
  isUserLogedIn,
  getUserInfo,
  getMenus,
  logOut,
  getUserTokenFromcookie,
  getQueryParams,
} from "../../js/funcs/utils.js";

let headerTemp = document.createElement("template");
headerTemp.innerHTML = `
<link
rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
/>
<link rel="stylesheet" href="components/header/header.css"/>

<div class="cover"></div>
<div class="dropDownAccountCover"></div>
<header>
<nav class="Navbar">
  <div class="responsiveNavbar">
    <button class="OpenBtn">
      <i class="fa fa-bars"></i>
    </button>
    <nav class="navbar2">
      <div class="navHeader">
        <img src="images/logo.webp" class="Logo" alt="سبز لرن" />
        <h3 class="websiteTitle">سبزلرن</h3>
        <button class="closeBtn">
          <i class="fa fa-close"></i>
        </button>
      </div>
      <div class="navBody">
        <div class="searchBox2">
          <i class="fa fa-search search_box_btn2"></i>
          <input type="text" class="search search_box_input2" placeholder="جستجو" name="s" />
        </div>
        <ul class="menubar">
          <li class="menuItem">
            <a
              class="menuLink"
              href="./cms/cms-ui/cms-ui.html"
              
              >پنل مدیریت</a
            >
          </li>

          <li class="menuItem">
            <a class="menuLink" 
              >مقالات<i class="fa fa-angle-down"></i
            ></a>
            <ul class="responsiveSubmenu">
              <li class="responsiveMenuItem">
                <a href="#">ویو جی اس</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">طراحی سایت</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">شروع برنامه نویسی</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">سی اس اس</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">ری اکت جی اس</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">جی کوئری</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">تست نفوذ و امنیت وب</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">پروژه های برنامه نویسی</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">بوت استرپ</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">اچ تی ام ال</a>
              </li>
            </ul>
          </li>

          <li class="menuItem">
            <a
              class="menuLink"
              href="#"
              onclick="openAndCloseDropdown(event)"
              >مهارت های نرم</a
            >
          </li>

          <li class="menuItem">
            <a class="menuLink" 
              >پایتون<i class="fa fa-angle-down"></i
            ></a>
            <ul class="responsiveSubmenu">
              <li class="responsiveMenuItem">
                <a href="#">مصور سازی داده با پایتون</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">متخصص جنگو</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">ترفند های کاربردی با پایتون</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">پروژه های کاربردی با پایتون</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">دوره آموزش پایتون</a>
              </li>
            </ul>
          </li>

          <li class="menuItem">
            <a class="menuLink" 
              >امنیت<i class="fa fa-angle-down"></i
            ></a>
            <ul class="responsiveSubmenu">
              <li class="responsiveMenuItem">
                <a href="#">آموزش جاوااسکریپت سیاه</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">آموزش Burp Suite</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">آموزش پایتون سیاه</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">آموزش کالی لینوکس</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">آموزش هکر قانونمند - CEH V11</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">لینوکس با گرایش امنیت</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">شبکه با گرایش امنیت</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">نقشه راه ورود به دنیای هک و امنیت</a>
              </li>
            </ul>
          </li>

          <li class="menuItem">
            <a class="menuLink" 
              >فرانت اند<i class="fa fa-angle-down"></i
            ></a>
            <ul class="responsiveSubmenu">
              <li class="responsiveMenuItem">
                <a href="#">آموزش NPM</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">آموزش وی اس کد - Vscode</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">آموزش ویو جی اس</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">آموزش جامع ری اکت ReactJS</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">آموزش جاوااسکریپت</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">آموزش بوت استرپ</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">آموزش اصولی طراحی قالب</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">آموزش Tailwind CSS</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">آموزش CSS Grid</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">آموزش FlexBox</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">آموزش CSS</a>
              </li>

              <li class="responsiveMenuItem">
                <a href="#">آموزش HTML</a>
              </li>
            </ul>
          </li>

          <!-- <li class="menuItem">
      <a class="menuLink"
        >فرانت اند <i class="fa fa-angle-down"></i
      ></a>
      <ul class="responsiveSubmenu">
        <li class="responsiveMenuItem">
          <a href="">test submenu</a>
        </li>
        <li class="responsiveMenuItem">
          <a href="">test submenu</a>
        </li>
        <li class="responsiveMenuItem">
          <a href="">test submenu</a>
        </li>
        <li class="responsiveMenuItem">
          <a href="">test submenu</a>
        </li>
        <li class="responsiveMenuItem">
          <a href="">test submenu</a>
        </li>
      </ul>
    </li> -->
        </ul>
      </div>
      <div class="SwitchThemeBar">
        <button class="SwitchTeheme SwitchTeheme2">
          <i class="fa fa-moon"></i>
        </button>
        <span class="themeTitle"></span>
      </div>
    </nav>
  </div>
  <div class="LogoBox LogoBox1">
    <a href="index.html">
      <img src="images/logo.webp" class="Logo" alt="Logo" />
    </a>
  </div>
  <div class="NavigationBar">
    <ul>
      <li>
        <a href="./cms/cms-ui/cms-ui.html" class="NavItem">پنل مدیریت </a>
      </li>

      <li>
        <a href="#" class="NavItem"
          >مقالات
          <i class="fa fa-angle-down"></i>
          <ul class="SubMenu">
            <li><a href="#">ویو جی اس</a></li>

            <li><a href="#">طراحی سایت</a></li>

            <li><a href="#">شروع برنامه نویسی</a></li>

            <li><a href="#">سی اس اس</a></li>

            <li><a href="#">ری اکت جی اس</a></li>

            <li><a href="#">جی کوئری</a></li>

            <li><a href="#">تست نفوذ و امنیت وب</a></li>

            <li><a href="#">پروژه های برنامه نویسی</a></li>

            <li><a href="#">بوت استرپ</a></li>

            <li><a href="#">اچ تی ام ال</a></li>
          </ul>
        </a>
      </li>

      <li>
        <a href="#" class="NavItem">مهارت های نرم </a>
      </li>

      <li>
        <a href="#" class="NavItem"
          >پایتون
          <i class="fa fa-angle-down"></i>
          <ul class="SubMenu">
            <li><a href="#">مصور سازی داده با پایتون</a></li>

            <li><a href="#">متخصص جنگو</a></li>

            <li><a href="#">ترفند های کاربردی با پایتون</a></li>

            <li><a href="#">پروژه های کاربردی با پایتون</a></li>

            <li><a href="#">دوره آموزش پایتون</a></li>
          </ul>
        </a>
      </li>

      <li>
        <a href="#" class="NavItem"
          >امنیت
          <i class="fa fa-angle-down"></i>
          <ul class="SubMenu">
            <li><a href="#">آموزش جاوااسکریپت سیاه</a></li>

            <li><a href="#">آموزش Burp Suite</a></li>

            <li><a href="#">آموزش پایتون سیاه</a></li>

            <li><a href="#">آموزش کالی لینوکس</a></li>

            <li><a href="#">آموزش هکر قانونمند - CEH V11</a></li>

            <li><a href="#">لینوکس با گرایش امنیت</a></li>

            <li><a href="#">شبکه با گرایش امنیت</a></li>

            <li><a href="#">نقشه راه ورود به دنیای هک و امنیت</a></li>
          </ul>
        </a>
      </li>

      <li>
        <a href="#" class="NavItem"
          >فرانت اند
          <i class="fa fa-angle-down"></i>
          <ul class="SubMenu">
            <li><a href="#">آموزش NPM</a></li>

            <li><a href="#">آموزش وی اس کد - Vscode</a></li>

            <li><a href="#">آموزش ویو جی اس</a></li>

            <li><a href="#">آموزش جامع ری اکت ReactJS</a></li>

            <li><a href="#">آموزش جاوااسکریپت</a></li>

            <li><a href="#">آموزش بوت استرپ</a></li>

            <li><a href="#">آموزش اصولی طراحی قالب</a></li>

            <li><a href="#">آموزش Tailwind CSS</a></li>

            <li><a href="#">آموزش CSS Grid</a></li>

            <li><a href="#">آموزش FlexBox</a></li>

            <li><a href="#">آموزش CSS</a></li>

            <li><a href="#">آموزش HTML</a></li>
          </ul>
        </a>
      </li>
    </ul>
  </div>
</nav>
<div class="LogoBox LogoBox2">
  <a href="index.html">
    <img src="images/logo.webp" class="Logo" alt="Logo" />
  </a>
</div>
<div class="SiteSetting">
  <div class="SearchBox">
    <input
      type="text"
      class="SearchInput search_box_input1"
      placeholder="جستجو"
      name="s"
      id=""
    />
    <button class="search_box_btn1">
      <i class="SearchIcon fa-solid fa-magnifying-glass"></i>
    </button>
  </div>
  <button class="SwitchTeheme SwitchTeheme1">
    <i class="fa-solid fa-moon"></i>
    <!-- fa fa-sun -->
  </button>
  <button class="UserAccountBtn">
    <i class="fa fa-user"></i>
  </button>
  <div class="Account-Btn">
    <a href="loginBy_email.html" class="login-Btn">ورود</a>
    <a href="signin.html" class="sign-in-Btn">عضویت</a>
    <a href="loginBy_email.html" class="Responsive-login-btn"><i class="fa fa-user"></i></a>
  </div>
  <div class="userInfoCard">
    <div class="CardHeader">
      <i class="fa fa-user"></i>
      <div class="info">
        <h4 class="userName">علیرضا نوری</h4>
        <h4 class="cartBox">موجودی: 0 تومان</h4>
      </div>
    </div>
    <div class="CardBody">
      <ul>
        <li>
          <a href="./my-account"><i class="fa fa-home"></i> پیشخوان</a>
        </li>
        <li>
          <a href="./my-account/my-courses.html"><i class="fa fa-folder"></i> دوره های من</a>
        </li>
        <li>
          <a href="./my-account/account-content.html"><i class="fa-regular fa-user"></i> جزئیات حساب</a>
        </li>
        <li>
          <a href="./my-account/tickets.html"><i class="fa fa-ticket"></i> تیکت های پشتیبانی</a>
        </li>
      </ul>
    </div>
    <div class="CardFooter">
      <button class="exit-Btn">
        <i class="fa fa-external-link"></i> خروج
      </button>
    </div>
  </div>
</div>
</header>

`;

class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(headerTemp.content.cloneNode(true));

    ///////////////////////////////////////////////////////////////////////////////

    this.OpenBtn = this.shadowRoot.querySelector(".OpenBtn");
    this.closeBtn = this.shadowRoot.querySelector(".closeBtn");

    this.navbar2 = this.shadowRoot.querySelector(".navbar2");
    this.themeTitle = this.shadowRoot.querySelector(".themeTitle");

    this.cover = this.shadowRoot.querySelector(".cover");

    this.UserAccountBtn = this.shadowRoot.querySelector(".UserAccountBtn");

    this.userInfoCard = this.shadowRoot.querySelector(".userInfoCard");
    this.userName_label = this.shadowRoot.querySelector(".userName");

    this.logoutBtn = this.shadowRoot.querySelector(".exit-Btn");

    this.dropDownAccountCover = this.shadowRoot.querySelector(
      ".dropDownAccountCover"
    );
    this.SwitchTeheme = this.shadowRoot.querySelectorAll(".SwitchTeheme");

    this.userAccountBtns = this.shadowRoot.querySelector(".Account-Btn");

    this.NavigationBar = this.shadowRoot.querySelector(".NavigationBar ul");
    this.menubar = this.shadowRoot.querySelector(".menubar");

    this.isOpenNavbar = false;

    this.SwitchTeheme1 = this.shadowRoot.querySelector(".SwitchTeheme1 i");
    this.SwitchTeheme2 = this.shadowRoot.querySelector(".SwitchTeheme2 i");

    this.search_box_input1 =
      this.shadowRoot.querySelector(".search_box_input1");

    this.search_box_btn1 = this.shadowRoot.querySelector(".search_box_btn1");

    this.search_box_input2 =
      this.shadowRoot.querySelector(".search_box_input2");
    this.search_box_btn2 = this.shadowRoot.querySelector(".search_box_btn2");

    this.isDark;

    this.events();

    // for load
    this.isUserLogedIn = isUserLogedIn;
    this.getUserInfo = getUserInfo;
    this.getMenus = getMenus;
    this.logOut = logOut;
    this.getUserTokenFromcookie = getUserTokenFromcookie;
    this.getQueryParams = getQueryParams;

    if (this.isUserLogedIn()) {
      this.shadowRoot.querySelector(".UserAccountBtn").classList.add("active");
      this.shadowRoot.querySelector(".Account-Btn").classList.add("hidden");
    } else {
      this.shadowRoot
        .querySelector(".UserAccountBtn")
        .classList.remove("active");
      this.shadowRoot.querySelector(".Account-Btn").classList.remove("hidden");
    }
    if (this.isUserLogedIn()) {
      this.getUserInfo().then((data) => {
        this.userName_label.innerHTML = data.name;
      });
    }

    this.getMenus().then((data) => {
      this.menusGenerator(data);
    });

    if (localStorage.getItem("theme") === null) {
      this.isDark = false;
    } else {
      if (localStorage.getItem("theme") == "light") {
        this.isDark = false;
      } else {
        this.isDark = true;
      }
    }
    if (this.isDark == false) {
      this.SwitchTeheme1.classList.replace("fa-sun", "fa-moon");
      this.SwitchTeheme2.classList.replace("fa-sun", "fa-moon");
      this.themeTitle.innerHTML = "تم تیره";
    } else {
      this.SwitchTeheme1.classList.replace("fa-moon", "fa-sun");
      this.SwitchTeheme2.classList.replace("fa-moon", "fa-sun");
      this.themeTitle.innerHTML = "تم روشن";
    }
    this.changeThemeMode();

    // for load

    if (this.getQueryParams("s")) {
      this.search_box_input1.value = this.getQueryParams("s");
      this.search_box_input2.value = this.getQueryParams("s");
    }
  }

  events() {
    this.OpenBtn.addEventListener("click", () => {
      this.openNavbar();
    });
    this.closeBtn.addEventListener("click", () => {
      this.openNavbar();
    });
    this.cover.addEventListener("click", () => {
      this.openNavbar();
    });

    this.UserAccountBtn.addEventListener("click", () => {
      this.openAndCloseDropdown();
    });
    this.dropDownAccountCover.addEventListener("click", () => {
      this.openAndCloseDropdown();
    });

    this.SwitchTeheme1.addEventListener("click", () => {
      this.loadHandler();
    });
    this.SwitchTeheme2.addEventListener("click", () => {
      this.loadHandler();
    });

    this.menubar.addEventListener("click", (e) => {
      if (e.target.className.includes("menuLink")) {
        this.openResponsiveSubMenu(e.target);
      } else if (e.target.parentElement.className.includes("menuLink")) {
        this.openResponsiveSubMenu(e.target.parentElement);
      }
    });
    this.logoutBtn.addEventListener("click", () => {
      this.logOut(this.getUserTokenFromcookie());
      location.reload();
      //   alert();
    });

    this.search_box_btn1.addEventListener("click", () => {
      this.searchBoxHandler(this.search_box_input1);
    });
    this.search_box_btn2.addEventListener("click", () => {
      this.searchBoxHandler(this.search_box_input2);
    });

    this.search_box_input1.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        this.searchBoxHandler(this.search_box_input1);
      }
    });
    this.search_box_input2.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        this.searchBoxHandler(this.search_box_input2);
      }
    });
  }

  loadHandler() {
    if (this.isDark == false) {
      this.SwitchTeheme1.classList.replace("fa-moon", "fa-sun");
      this.SwitchTeheme2.classList.replace("fa-moon", "fa-sun");
      this.themeTitle.innerHTML = "تم روشن";
      this.isDark = true;
      localStorage.setItem("theme", "dark");
    } else {
      this.SwitchTeheme1.classList.replace("fa-sun", "fa-moon");
      this.SwitchTeheme2.classList.replace("fa-sun", "fa-moon");
      this.themeTitle.innerHTML = "تم تیره";
      this.isDark = false;
      localStorage.setItem("theme", "light");
    }
    this.changeThemeMode();
  }

  openNavbar() {
    if (this.isOpenNavbar === false) {
      this.navbar2.style.right = "0%";
      this.cover.style.cssText = "visibility: visible; opacity:1;";
      document.body.style.overflowY = "hidden";
      this.isOpenNavbar = true;
    } else {
      this.navbar2.style.right = "-100%";
      this.cover.style.cssText = "visibility: hidden; opacity:0;";
      document.body.style.overflowY = "auto";
      this.isOpenNavbar = false;
    }
  }

  openAndCloseDropdown() {
    if (this.userInfoCard.style.visibility == "visible") {
      this.userInfoCard.style.visibility = "hidden";
      this.userInfoCard.style.opacity = "0";
      this.dropDownAccountCover.style.visibility = "hidden";
      this.dropDownAccountCover.style.opacity = "0";
    } else {
      this.userInfoCard.style.visibility = "visible";
      this.userInfoCard.style.opacity = "1";
      this.dropDownAccountCover.style.visibility = "visible";
      this.dropDownAccountCover.style.opacity = "1";
    }
  }

  changeThemeMode() {
    if (this.isDark == true) {
      //dark
      document.body.classList.add("dark");
      document.documentElement.style.setProperty(
        "--lightColor",
        "rgb(28 28 40)"
      );
      document.documentElement.style.setProperty(
        "--primaryLightColor",
        "rgb(28 28 40)"
      );
      document.documentElement.style.setProperty(
        "--borderColor",
        "rgb(50 51 77)"
      );
      document.documentElement.style.setProperty(
        "--hoverColor",
        "rgb(28 28 40)"
      );
      document.documentElement.style.setProperty(
        "--hoverBorderColor",
        "rgb(119 124 148)"
      );
      document.documentElement.style.setProperty(
        "--secondDynamicCoor",
        "rgb(50 51 77)"
      );
      document.documentElement.style.setProperty("--TextLightColor", "#fff");
      document.documentElement.style.setProperty(
        "--activeMenuItem2Hover",
        "#fff"
      );
      document.documentElement.style.setProperty("--cardTextColor", "#fff");
      document.documentElement.style.setProperty(
        "--mainColor",
        "rgb(28 28 40)"
      );
      document.documentElement.style.setProperty(
        "--FerechexHoverColor",
        "rgb(74 75 109)"
      );
      document.documentElement.style.setProperty(
        "--Warning-bg-color",
        "40, 41, 61"
      );
      document.documentElement.style.setProperty(
        "--category-color",
        "rgb(250 204 21)"
      );
      document.documentElement.style.setProperty(
        "--category-bg-color",
        "rgb(250 204 21 / 0.1)"
      );
      document.documentElement.style.setProperty(
        "--SecondTextLightColor",
        "rgb(148 163 184)"
      );
      document.documentElement.style.setProperty(
        "--bannerRedColor",
        "rgb(239 68 68)"
      );

      document.documentElement.style.setProperty(
        "--comment_background",
        "rgb(50 51 77)"
      );
      document.documentElement.style.setProperty(
        "--reply_background",
        "rgb(74 75 109)"
      );
      document.documentElement.style.setProperty(
        "--textarea_background",
        "rgb(50 51 77)"
      );

      document.documentElement.style.setProperty(
        "--textarea_color",
        "rgb(100 116 139)"
      );
      document.documentElement.style.setProperty("--blue_btn", "14 165 233");

      document.documentElement.style.setProperty(
        "--blue_btn",
        "rgb(78 129 251)"
      );
      document.documentElement.style.setProperty(
        "--blue_btn_hover",
        "rgb(37 99 235)"
      );

      document.documentElement.style.setProperty(
        "--cancel_btn",
        "rgb(50 51 77)"
      );
      document.documentElement.style.setProperty(
        "--cancel_btn_hover",
        " rgb(74 75 109 )"
      );

      document.documentElement.style.setProperty(
        "--video_download_bg_color",
        "46, 213, 115, .1"
      );
      document.documentElement.style.setProperty(
        "--video_download_color",
        "46, 213, 115"
      );

      document.documentElement.style.setProperty(
        "--video_download_hover_bg_color",
        "46, 213, 115, .1"
      );

      document.documentElement.style.setProperty(
        "--file_download_bg_color",
        "250, 204, 21, .1"
      );
      document.documentElement.style.setProperty(
        "--file_download_color",
        "250, 204, 21, 1"
      );
      document.documentElement.style.setProperty(
        "--file_download_hover_bg_color",
        "250, 204, 21, .1"
      );

      document.documentElement.style.setProperty(
        "--session_accordion_body_bg",
        "rgb(40 41 61)"
      );

      document.documentElement.style.setProperty(
        "--session_accordion_hover_body_bg",
        "rgb(50 51 77)"
      );
    } else {
      document.body.classList.remove("dark");
      //light
      document.documentElement.style.setProperty("--lightColor", "#fff");
      document.documentElement.style.setProperty(
        "--primaryLightColor",
        "rgb(243 244 246)"
      );
      document.documentElement.style.setProperty(
        "--borderColor",
        "rgb(243 244 246)"
      );
      document.documentElement.style.setProperty(
        "--hoverColor",
        "rgb(229 231 235)"
      );
      document.documentElement.style.setProperty(
        "--hoverBorderColor",
        "rgb(243 244 246)"
      );
      document.documentElement.style.setProperty("--secondDynamicCoor", "#fff");
      document.documentElement.style.setProperty(
        "--TextLightColor",
        "rgb(63 63 70)"
      );
      document.documentElement.style.setProperty(
        "--activeMenuItem2Hover",
        "#000"
      );
      document.documentElement.style.setProperty(
        "--cardTextColor",
        "rgb(100 116 139)"
      );
      document.documentElement.style.setProperty(
        "--mainColor",
        "rgb(243 244 246)"
      );
      document.documentElement.style.setProperty(
        "--FerechexHoverColor",
        "rgb(243 244 246)"
      );
      document.documentElement.style.setProperty(
        "--Warning-bg-color",
        "255, 255, 255"
      );
      document.documentElement.style.setProperty(
        "--category-color",
        "rgb(78 129 251)"
      );
      document.documentElement.style.setProperty(
        "--category-bg-color",
        "rgb(14 165 233 / 0.1)"
      );
      document.documentElement.style.setProperty(
        "--SecondTextLightColor",
        "rgb(100 116 139)"
      );

      document.documentElement.style.setProperty(
        "--bannerRedColor",
        "rgb(236 72 153)"
      );

      document.documentElement.style.setProperty(
        "--comment_background",
        "rgb(243 244 246)"
      );

      document.documentElement.style.setProperty(
        "--reply_background",
        "rgb(229 231 235)"
      );
      document.documentElement.style.setProperty(
        "--textarea_background",
        "rgb(243 244 246)"
      );
      document.documentElement.style.setProperty(
        "--textarea_color",
        " rgb(100 116 139)"
      );

      document.documentElement.style.setProperty(
        "--blue_btn",
        "rgb(14 165 233)"
      );
      document.documentElement.style.setProperty(
        "--blue_btn_hover",
        "rgb(2 132 199)"
      );
      document.documentElement.style.setProperty(
        "--cancel_btn",
        " rgb(229 231 235)"
      );
      document.documentElement.style.setProperty(
        "--cancel_btn_hover",
        " rgb(209 213 219)"
      );

      document.documentElement.style.setProperty(
        "--video_download_bg_color",
        "46, 213, 115, 1"
      );
      document.documentElement.style.setProperty(
        "--video_download_color",
        " 255, 255, 255"
      );
      document.documentElement.style.setProperty(
        "--video_download_hover_bg_color",
        "34, 197, 94"
      );
      document.documentElement.style.setProperty(
        "--file_download_bg_color",
        "250, 204, 21, 1"
      );
      document.documentElement.style.setProperty(
        "--file_download_color",
        "255, 255, 255"
      );
      document.documentElement.style.setProperty(
        "--file_download_hover_bg_color",
        "249, 161, 52"
      );

      document.documentElement.style.setProperty(
        "--session_accordion_body_bg",
        "rgb(255, 255, 255)"
      );
      document.documentElement.style.setProperty(
        "--session_accordion_hover_body_bg",
        "rgb(255, 255, 255)"
      );
    }
  }

  openResponsiveSubMenu(elem) {
    if (elem.classList == "menuLink active") {
      elem.classList.remove("active");
    } else {
      this.shadowRoot
        .querySelectorAll(".menuLink")
        .forEach(function (menuLinkItem) {
          menuLinkItem.classList.remove("active");
        });
      elem.classList.add("active");
    }
  }

  menusGenerator(menus) {
    //start NavigationBar
    // //console.log(menus);
    this.NavigationBar.innerHTML = "";

    menus.forEach((menu) => {
      this.NavigationBar.insertAdjacentHTML(
        "afterbegin",
        `
    <li>
    <a href="./course_category.html?cat=${menu.href}&catName=${
          menu.title
        }" class="NavItem">${menu.title} ${
          menu.submenus.length > 0 ? ' <i class="fa fa-angle-down"></i>' : ""
        }</a>
  </li>
    `
      );
      if (menu.submenus.length > 0) {
        const menusBox = this.shadowRoot.querySelector(".NavItem");
        // menusBox.querySelector('.SubMenu').innerHTML = "";
        menusBox.parentElement.insertAdjacentHTML(
          "beforeend",
          `
      <ul class="SubMenu"></ul>
      `
        );
        const subMenusBox = this.shadowRoot.querySelector(".SubMenu");
        subMenusBox.innerHTML = "";
        menu.submenus.forEach((submenu) => {
          subMenusBox.insertAdjacentHTML(
            "beforeend",
            `
        <li><a ${
          menu.title != "مقالات"
            ? `href="course.html?name=${submenu.href}"`
            : `href="blog.html?bName=${submenu.href}"`
        }>${submenu.title}</a></li>
        `
          );
        });
      }
    });
    //finish NavigationBar

    // start responsive menu
    this.menubar.innerHTML = "";
    menus.forEach((menu) => {
      this.menubar.insertAdjacentHTML(
        "afterbegin",
        `
  <li class="menuItem">
      <a ${
        !menu.submenus.length && menu.title != "مقالات"
          ? `href="./course_category.html?cat=${menu.href}&catName=${menu.title}"`
          : ""
      }   
      
      ${
        !menu.submenus.length && menu.title === "مقالات"
          ? `href="blog_category.html"`
          : ""
      }  class="menuLink">
      ${menu.title} ${
          menu.submenus.length > 0 ? '<i class="fa fa-angle-down"></i>' : ""
        }
    </a>
 </li>

  `
      );
      const menuItem = this.shadowRoot.querySelector(".menuItem");
      if (menu.submenus.length > 0) {
        menuItem.insertAdjacentHTML(
          "beforeend",
          `<ul class="responsiveSubmenu"></ul>`
        );

        menu.submenus.forEach((submenu) => {
          //console.log(submenu);
          menuItem.querySelector(".responsiveSubmenu").insertAdjacentHTML(
            "afterbegin",
            `

  <li class="responsiveMenuItem">
  <a ${
    menu.title != "مقالات"
      ? `href="course.html?name=${submenu.href}"`
      : `href="blog.html?bName=${submenu.href}"`
  }  class="responsiveMenuLink">${submenu.title}</a>
</li>

  `
          );
        });
      }
    });
    this.insertPanelLink();
    // finish responsive menu
  }

  insertPanelLink() {
    if (this.isUserLogedIn()) {
      this.getUserInfo().then((data) => {
        if (data.role === "ADMIN") {
          this.NavigationBar.insertAdjacentHTML(
            "afterbegin",
            `<li><a href="./panel/main">پنل مدیریت</a></li>`
          );
          this.menubar.insertAdjacentHTML(
            "afterbegin",
            `<li class="menuItem"><a href="./panel/main" class="menuLink">پنل مدیریت</a></li>`
          );
        }
      });
    }
  }

  searchBoxHandler(input) {
    location.href = `https://alirezaaa1194.github.io/sabzlearn2/courses.html?s=${input.value}`;
  }
}

export { Header };
