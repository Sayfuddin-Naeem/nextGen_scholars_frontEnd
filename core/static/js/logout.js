const user_logout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, user is not logged in.');
        return;
    }

    try {
        const response = await fetch(`${apiRootLink}/user/logout/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`, // Send the token for authentication
            },
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result.message); // Log the successful logout message

            // Clear localStorage to remove stored user data
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('user_type');
            localStorage.setItem('loggedIn', 'false');

            // Redirect to the login page or home page after logout
            window.location.href = '/user/login/';
        } else {
            const errorResult = await response.json();
            console.error('Error during logout:', errorResult);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


// Attach event listeners for logout
document.getElementById('menu-logout').addEventListener('click', user_logout);