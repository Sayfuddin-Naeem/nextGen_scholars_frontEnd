const user_login = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get form elements
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate form fields
    if (!username || !password) {
        showAlert('Both username and password are required.', 'error');
        return;
    }

    // Prepare form data
    const formData = {
        username: username,
        password: password
    };

    try {
        // Send POST request to login endpoint
        const response = await fetch(`${apiRootLink}/user/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value // Django CSRF token
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            // Store the token and other information in localStorage
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('token', result.token); // Store token
            localStorage.setItem('user_id', result.user_id); // Store user ID
            localStorage.setItem('user_type', result.user_type); // Store user type

            // Redirect based on user role
            window.location.href = result.redirect_url || '/user/profile/';
        } else {
            // Handle error response
            showAlert(result.error || 'An error occurred during login.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('An error occurred during login. Please try again later.', 'error');
    }
};

// Attach event listeners for login
document.getElementById('login-submit').addEventListener("click", user_login);
