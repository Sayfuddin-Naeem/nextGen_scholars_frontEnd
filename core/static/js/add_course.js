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

        const response = await fetch(`${apiRootLink}/course/`, {
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
            console.log(result.message);
        }
    } catch (error) {
        //console.error('Error:', error);
        showAlert('An error occurred during registration. Please try again later.', 'error');
    }
};