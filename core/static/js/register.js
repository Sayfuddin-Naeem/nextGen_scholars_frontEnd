// get department, designation, specialization data and show in the field 
const get_selectOption_and_show = (fieldApiUrl, fieldId)=>{
    const apiUrl = `${apiRootLink}/${fieldApiUrl}`;

// Fetch department data
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON response
    })
    .then(data => {
        console.log("Field Data:", data);
        display_select_option(fieldId, data);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
};
//  display select option into the field
const display_select_option = (fieldId, data)=>{

    const field = document.querySelector(`#${fieldId}`);
    let field_option = "";
    // if(fieldId == "department" || fieldId == "designation")
    //     field_option = '<option class="bg-secondary" value="" selected>-- Select --</option>';

    data.forEach((option) => {
        console.log(option);
        field_option += `
            <option class="bg-secondary" value="${option.name}">${option.name}</option>
        `
    });
    field.innerHTML += field_option;
};

// user creation
const user_creation = async (userTypeInput) => {
    const userType = userTypeInput.value;
    const form = new FormData(document.querySelector('#register'));

    const fileElement = document.querySelector('#profile_picture');
    const imageFile = fileElement.files[0]; // Get the selected file from the input

    // Prepare common formData fields
    form.append('username', form.get('username')?.trim() || '');
    form.append('first_name', form.get('first_name')?.trim() || '');
    form.append('last_name', form.get('last_name')?.trim() || '');
    form.append('email', form.get('email')?.trim() || '');
    form.append('phone_number', form.get('phone_number')?.trim() || '');
    form.append('password', form.get('password')?.trim() || '');
    form.append('confirm_password', form.get('confirm_password')?.trim() || '');
    form.append('profile.date_of_birth', form.get('date_of_birth') || '');
    form.append('profile.department', form.get('department') || '');
    form.append('profile.profile_picture', imageFile || null);

    if (userType === "teacher") {
        form.append('profile.teacher.designation', form.get('designation') || '');
        form.append('profile.teacher.specializations', JSON.stringify(form.getAll('specializations')) || '[]'); // Convert array to string
        form.append('profile.teacher.bio', form.get('bio') || '');
    } else if (userType === "student") {
        form.append('profile.student.year_of_study', form.get('year_of_study') || '');
    }

    try {
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;

        if (!csrfToken) {
            throw new Error('CSRF token not found.');
        }

        const response = await fetch(`${apiRootLink}/user/${userType}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,  // Use the CSRF token
            },
            body: form,  // Use FormData directly
        });

        const result = await response.json();

        if (response.ok) {
            showAlert('Registration successful! Check your email for confirmation.');
            localStorage.setItem('user_email', form.get('email'));
            window.location.href = '/user/confirm_email'; // Redirect on success
        } else {
            showAlert(`Error: ${result.message || 'Registration failed'}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('An error occurred during registration. Please try again later.', 'error');
    }
};


// form Step Switching
const form_step_switching = () => {
    const userTypeInput = document.getElementById("user_type_value");
    const nextPrevBtn = document.getElementById("nextPrev");
    const submitBtn = document.getElementById("form-submit");
    const rgTab1 = document.getElementById("rgTab1");
    const rgTab2 = document.getElementById("rgTab2");

    // fetch department, designation and specializations data for department, designation and specializations select field 
    get_selectOption_and_show('department/', 'department');
    get_selectOption_and_show('teacher/designation/', 'designation');
    get_selectOption_and_show('teacher/specialization/', 'specializations');

    nextPrevBtn.onclick = () => {

        let text = nextPrevBtn.innerHTML;

        if (text === "Next") {
            // Validate form fields in rgTab1 before proceeding
            if (validateStep1()) {

                // Add fade-out animation to the current tab
                rgTab1.classList.add("fade-out");

                // After fade-out animation ends, switch tabs
                setTimeout(() => {
                    rgTab1.classList.add("d-none");
                    rgTab2.classList.remove("d-none");
                    rgTab2.classList.add("fade-in");

                    // Clean up the animation classes after the animation is complete
                    setTimeout(() => {
                        rgTab1.classList.remove("fade-out");
                        rgTab2.classList.remove("fade-in");
                    }, 500);

                    // Update button text and display
                    nextPrevBtn.innerHTML = "Previous";
                    submitBtn.classList.remove("d-none");
                }, 500); // Match this timeout with the animation duration (0.5s)
            }
        } else if (text === "Previous") {
            // Add fade-out animation to the current tab
            rgTab2.classList.add("fade-out");

            // After fade-out animation ends, switch tabs
            setTimeout(() => {
                rgTab2.classList.add("d-none");
                rgTab1.classList.remove("d-none");
                rgTab1.classList.add("fade-in");

                // Clean up the animation classes after the animation is complete
                setTimeout(() => {
                    rgTab2.classList.remove("fade-out");
                    rgTab1.classList.remove("fade-in");
                }, 500);

                // Update button text and display
                nextPrevBtn.innerHTML = "Next";
                submitBtn.classList.add("d-none");
            }, 500); // Match this timeout with the animation duration (0.5s)
        }
    };

    submitBtn.onclick = async (e) => {
        e.preventDefault(); // Prevent form submission to validate first

        if (validateStep1() && validateStep2()) {
            user_creation(userTypeInput);
        }
    };

    user_switching(userTypeInput);
};

// User Switching
const user_switching = (userTypeInput) => {
    // Get student info or teacher info section
    const student_info = document.getElementById("student-info");
    const teacher_info = document.getElementById("teacher-info");
    const as_student = document.getElementById('as_student');
    const as_teacher = document.getElementById('as_teacher');

    as_student.onclick = () => {
        userTypeInput.value = "student";
        teacher_info.classList.add("fade-out");

        setTimeout(() => {
            as_student.classList.add("active_user");
            as_teacher.classList.remove("active_user");

            teacher_info.classList.add("d-none");
            student_info.classList.remove("d-none");
            student_info.classList.add("fade-in");

            setTimeout(() => {
                teacher_info.classList.remove("fade-out");
                student_info.classList.remove("fade-in");
            }, 500);

        }, 500);
    };

    as_teacher.onclick = () => {
        userTypeInput.value = "teacher";
        student_info.classList.add("fade-out");

        setTimeout(() => {
            as_student.classList.remove("active_user");
            as_teacher.classList.add("active_user");

            student_info.classList.add("d-none");
            teacher_info.classList.remove("d-none");
            teacher_info.classList.add("fade-in");

            setTimeout(() => {
                student_info.classList.remove("fade-out");
                teacher_info.classList.remove("fade-in");
            }, 500);

        }, 500);
    };
};

// Helper function to validate date of birth
const validateDOB = (dob) => {
    const minimumAge = 10;
    
    // Check if the field is empty
    if (!dob.value) {
        showAlert('Please enter your date of birth.', 'error');
        return false;
    }
    
    // Convert the value into a Date object
    const dobDate = new Date(dob.value);
    const today = new Date();
    
    // Check if the date is valid
    if (isNaN(dobDate.getTime())) {
        showAlert('Please enter a valid date.', 'error');
        return false;
    }

    // Calculate age in years
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    
    // Adjust if the birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
        age--;
    }
    
    // Check if age is at least the minimum required
    if (age < minimumAge) {
        showAlert(`You must be at least ${minimumAge} years old.`, 'error');
        return false;
    }
    
    // Passed validation
    return true;
};

const validateProfilePicture = (image)=>{
    const file = image.files[0];

    // File validation
    if (file) {

        // Check file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            showAlert('Invalid file type. Please upload a JPEG, PNG, or JPG image.', 'error');
            return false;
        }
        // Check file size (e.g., max 3MB)
        const maxSize = 3 * 1024 * 1024; // 3MB in bytes
        if (file.size > maxSize) {
            showAlert('File size exceeds the maximum limit of 3MB.', 'error');
            return false;
        }
        return true;
    }
    return true;
};

// Helper function to validate email format
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// Helper function to validate Password
const validatePassword = (password, confirmPassword) => {
    // Password regex to check complexity (at least one lowercase, uppercase, number, and special char)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check if the passwords match
    if (password.value !== confirmPassword.value) {
        showAlert('Passwords do not match.', 'error');
        return false;
    }

    // Check password length (minimum 8 characters)
    if (password.value.length < 8) {
        showAlert('Password must be at least 8 characters long.', 'error');
        return false;
    }

    // Check for password complexity
    if (!passwordRegex.test(password.value)) {
        showAlert('Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.', 'error');
        return false;
    }

    return true; // If all validations pass
};

// Validation functions
const validateStep1 = () => {
    const username = document.getElementById('username');
    const firstName = document.getElementById('first_name');
    const lastName = document.getElementById('last_name');
    const dob = document.getElementById('dob');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm_password');

    // Basic validation logic (you can customize this based on your needs)
    if (!username.value) {
        showAlert('Please enter a username.', 'error');
        return false;
    }
    if (!firstName.value) {
        showAlert('Please enter your first name.', 'error');
        return false;
    }
    if (!lastName.value) {
        showAlert('Please enter your last name.', 'error');
        return false;
    }
    if (!validateDOB(dob)) {
        return false;
    }
    if (!email.value || !validateEmail(email.value)) {
        showAlert('Please enter a valid email address.', 'error');
        return false;
    }
    if (!phone.value || phone.value.length !== 11 || isNaN(phone.value)) {
        showAlert('Please enter a valid 11-digit phone number.', 'error');
        return false;
    }
    if (!password.value) {
        showAlert('Please enter a password.', 'error');
        return false;
    }
    if (!validatePassword(password, confirmPassword)) {
        return false;
    }

    return true; // Step 1 validation passed
};

const validateStep2 = () => {
    const department = document.getElementById('department');
    const profilePicture = document.getElementById('profile_picture');
    const userType = document.getElementById('user_type_value');
    const yearOfStudy = document.getElementById('year_of_study');
    const designation = document.getElementById('designation');
    const specializations = document.getElementById('specializations');
    // const bio = document.getElementById('bio');

    if (!department.value) {
        showAlert('Please select a department.', 'error');
        return false;
    }

    if (!validateProfilePicture(profilePicture)) {
        return false;
    }

    if (userType.value === 'student') {
        if (!yearOfStudy.value) {
            showAlert('Please enter your year of study.', 'error');
            return false;
        }
    } else if (userType.value === 'teacher') {
        if (!designation.value) {
            showAlert('Please select a designation.', 'error');
            return false;
        }
        if (!specializations.value) {
            showAlert('Please select at least one specialization.', 'error');
            return false;
        }
        // if (!bio.value) {
        //     showAlert('Please write a bio.', 'error');
        //     return false;
        // }
    }

    return true; // Step 2 validation passed
};

// Trigger form step switching when DOM is loaded
document.addEventListener("DOMContentLoaded", form_step_switching());
