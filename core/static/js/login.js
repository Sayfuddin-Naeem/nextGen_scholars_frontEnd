const user_login = async () => {
    document.getElementById('login-submit').onclick = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        // Get form elements
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
    
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
                if (result.redirect_url) {
                    // Redirect to admin panel if applicable
                    window.location.href = result.redirect_url;
                } else {
                    // Redirect to user profile for non-admin users
                    window.location.href = '/user/profile/';
                }
            } else {
                // Handle error response
                showAlert(result.error || 'An error occurred during login.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showAlert('An error occurred during login. Please try again later.', 'error');
        }
    };
};

const user_logout = async () => {
    try {
        // Send GET request to the logout endpoint
        const response = await fetch(`${apiRootLink}/user/logout/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`, // Send the token for authentication
            },
        });

        // Check if the response is successful
        if (response.ok) {
            const result = await response.json();
            console.log(result.message); // Log the successful logout message

            localStorage.setItem('loggedIn', 'false');

            // Clear localStorage to remove stored user data
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('user_type');

            // Optionally, redirect to the login page or home page after logout
            window.location.href = '/user/login/';
        } else {
            // Handle error response
            const errorResult = await response.json();
            console.error('Error during logout:', errorResult);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Trigger the logout process when the logout button is clicked
document.getElementById('logout-btn').addEventListener('click', user_logout);

document.addEventListener("DOMContentLoaded", user_login);
