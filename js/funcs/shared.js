export function courseGenerator(container, courses, count, description) {
  container.innerHTML = "";
  courses.slice(0, count).forEach((course) => {
    // console.log(course);
    container.insertAdjacentHTML(
      "beforeend",
      `
        
        <div class="Product-Card">
        <div class="Card-header">
          <a href="course.html?name=${course.shortName}">
          <img src="https://sabzlearn-project-backend.liara.run/courses/covers/${
            course.cover
          }" alt="">
          </a>
          ${
            course.discount
              ? `<span class="free-lable">${course.discount}%</span>`
              : ""
          }
          ${!course.price ? `<span class="free-lable">100%</span>` : ""}
        </div>
        <div class="Card-Body">
          <div class="Category-Box">
           ${
             course.categoryID
               ? `<a href="course_category.html?cat=${
                   course.categoryID.name
                 }&catName=${course.categoryID.title}">${
                   course.categoryID.title
                 }</a>`
               : ""
           }
          </div>
          <h4 class="course-Name">
            <a href="course.html?name=${course.shortName}">${course.name}</a>
          </h4>
          <p class="course-Desc">${description ? course.description : ""}</p>
          <div class="Course-Info">
            <div class="Teacher-Info">
              <i class="fa fa-user"></i>
              <a href="#">${course.creator}</a>
              <i class="fa fa-clock"></i>
              <span></span>
            </div>
            <div class="Course-Star">
              <i class="fa fa-star"></i>
              <span>5.0</span>
            </div>
          </div>
        </div>
        <div class="Card-Footer">
          <div class="students-Box">
            <i class="fa fa-users"></i>
            <span class="Student-Number">${course.registers}</span>
          </div>
         ${
           course.price && !course.discount
             ? `
         <h4 class="Course-Price">${
           course.price.toLocaleString() + "تومان "
         }</h4>
         `
             : `
         
         <div class="price-Box">
         <h6 class="Course-Price">${
           course.price ? course.price.toLocaleString() + "تومان" : ""
         }</h6>
        ${
          !course.price
            ? `<h4>رایگان!</h4>`
            : `<h4>${
                (((100 - course.discount)/100)*course.price).toLocaleString() + "تومان"
              }</h4>`
        }
         </div>
  
         
         `
         } 
        </div>
      </div>
  
  
        `
    );
  });
}
