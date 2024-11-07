
const all_department = ()=>{
    // Define the URL for the department API
const departmentUrl = `${apiRootLink}/department/`;

// Fetch department data
fetch(departmentUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON response
    })
    .then(data => {
        console.log("Department Data:", data);
        displayDepartment(data);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
};

const displayDepartment = (data)=>{
    const department_container = document.querySelector("#department-container");
    data.forEach((dept) => {
        console.log(dept);
        const deptTemplate = `
            <div class="form-check col-3">
                <input 
                class="form-check-input" 
                type="radio" 
                name="department"
                id="dept-${dept.id}"
                data-slug="${dept.slug}"
                />
                <label class="form-check-label" for="dept-${dept.id}">
                ${dept.name}
                </label>
            </div>
        `
        department_container.innerHTML += deptTemplate;
    });

    department_container.addEventListener('click', (event) => {
        const single_dept = event.target.closest('.form-check-input');
        if (single_dept && single_dept.type === 'radio') {
            // Ensure the radio button is checked
            single_dept.checked = true;
    
            const dept_slug = single_dept.getAttribute('data-slug');
            console.log(dept_slug);
            get_course(dept_slug);
        }
    });
    
};

const get_course = (dept_slug = null)=>{
    // Define the URL for the department wise course API
    let courseUrl = `${apiRootLink}/course/?dept_slug=${dept_slug}`;
    if (dept_slug == null) {
        courseUrl = `${apiRootLink}/course/`;
    }

    // Fetch department wise course data
    fetch(courseUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            console.log("Course Data:", data); // Check the structure of the data here

            // If data is an object, access the array of courses within it
            if (Array.isArray(data)) {
                displayCourse(data);
            } else if (data.results && Array.isArray(data.results)) {
                displayCourse(data.results);  // If it's paginated data with a results key
            } else {
                console.error("Unexpected data structure:", data);
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
    });
};

const truncateText = (text, wordLimit)=> {
    // Split the text into an array of words
    const words = text.split(' ');

    if (words.length <= wordLimit) {
      return text;
    }
    // Slice the array to get only the first 'wordLimit' words and join them back into a string
    const truncatedText = words.slice(0, wordLimit).join(' ');
  
    return truncatedText + '...'; // Adding '...' to indicate truncation
  };

const displayCourse = (data)=>{
    const course_container = document.querySelector("#course-container");
    const total_course = document.querySelector("#total_course");
    total_course.innerHTML = `Course Found : ${data.length}`;

    let allCourse = "";
    data.forEach((course) => {
        const deptTemplate = `
            <div class="card mb-3 col-4" style="width: 22rem;">
            <img src="${course.course_image}" class="card-img-top object-fit-cover w-100" style="height: 200px;" alt="...">
            <div class="card-body d-flex flex-column flex-grow-1">
              <h5 class="card-title">${course.title}</h5>
              <h6 class="card-text">Department : ${course.department}</h6>
              <h6 class="card-text">Instructor : ${course.instructor}</h6>
              <p class="card-text"><span style='font-weight: 450;'>Description : </span>${truncateText(course.description, 30)}</p>
              <button data-course-id="${course.id}" class="enroll-now btn custom-btn fs-5 w-50 mx-auto">Enroll Now</button>
            </div>
          </div>
        `
        allCourse += deptTemplate;
    });
    
    course_container.innerHTML = "";
    course_container.innerHTML += allCourse;

    course_container.addEventListener('click', (event)=>{
        const single_course = event.target.closest('.enroll-now');
        if (single_course) {
            const course_id = single_course.getAttribute('data-course-id');
            console.log("course id : ",course_id);
            if(single_course.innerHTML == "Enroll Now"){
                //enroll_course(course_id);
                console.log("Enrolled");
                single_course.innerHTML = "Enrolled";
            }
        }
    });
};

const enroll_course = ()=> {

};

all_department();
get_course();