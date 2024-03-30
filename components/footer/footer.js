let footerTemp = document.createElement("template");
footerTemp.innerHTML = `
<link
rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
/>
<link rel="stylesheet" href="components/footer/footer.css"/>

<footer>
<div class="section">
  <div class="aboutus">
    <h3>درباره ما</h3>
    <p>
      سبزلرن یک اکادمی خصوصی آموزش برنامه نویسی هست که با هدف تحویل نیروی
      متخصص بر پایه تولید محتوای غیرسطحی فعالیت میکند
    </p>
  </div>
  <div class="footerLinks">
    <div class="Linkbox Linkbox1">
      <h3>دسترسی سریع</h3>
      <ul>
        <li><a href="./terms_conditions.html">قوانین و مقررارت</a></li>
        <li><a href="./my-account/send_ticket.html">ارسال تیکت</a></li>
        <li><a href="./courses.html">همه دوره ها</a></li>
      </ul>
    </div>
    <div class="Linkbox Linkbox2">
      <h3>لینک های مفید</h3>
      <ul>
        <li><a href="">آموزش جاوااسکریپت</a></li>
        <li><a href="">آموزش پایتون</a></li>
        <li><a href="">آموزش HTML</a></li>
        <li><a href="">آموزش CSS</a></li>
      </ul>
    </div>
    <div class="Linkbox Linkbox3">
      <h3>شبکه های اجتماعی</h3>
      <ul>
        <li>
          <a href="">@sabzlearn_<i class="fa-brands fa-telegram"></i></a>
        </li>
        <li>
          <a href="">@sabzlearn<i class="fa-brands fa-instagram"></i></a>
        </li>
      </ul>
    </div>
  </div>
</div>
<div class="copy-Right-Box">
  <p class="">ساخته شده با ❤️ در سبزلرن</p>
  <p class="">Copyright © 2019-<span class="now_year_label"></span> Sabzlearn. All rights reserved.</p>
</div>
</footer>

`;

class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(footerTemp.content.cloneNode(true));

    const nowYear = new Date().getFullYear();
    this.now_year_label = this.shadowRoot.querySelector(".now_year_label");
    this.now_year_label.innerHTML = nowYear;
  }
}
export { Footer };
