// Add 'js' class to body
document.body.classList.add('js');

const apiRootLink = 'http://127.0.0.1:8000';

// alert show
const showAlert = (message, type = 'success') => {
    const toastEl = document.getElementById('custom-toast');
    const toastMessage = document.getElementById('toast-message');
    const toastHeader = document.getElementById('toast-header');
    
    // Set the message
    toastMessage.innerHTML = message;
    
    // Set the alert type (success or error)
    if (type === 'success') {
        toastHeader.classList.remove('bg-danger-subtle');
        toastHeader.classList.add('toast-bg-success');

    } else if (type === 'error') {
        toastHeader.classList.remove('toast-bg-success');
        toastHeader.classList.add('bg-danger-subtle');
    }
    
    // Initialize Bootstrap toast
    const toast = new bootstrap.Toast(toastEl);
    
    // Show the toast
    toast.show();
};

// Get all the menu items
const addActiveClass_to_navLink = ()=> {
	 // Add active class to menu items based on current URL
     const menuItems = document.querySelectorAll(".main-menu li a");
     const currentUrl = window.location.href;
 
     menuItems.forEach(item => {
         item.classList.remove("activeMenu"); // Clear any existing active classes
 
         if (item.href === currentUrl) {
             // Add 'activeMenu' if the link matches the current URL
             item.classList.add("activeMenu");
         }
 
         // Add click event to handle single-page applications
         item.addEventListener("click", ()=> {
             menuItems.forEach(link => link.classList.remove("activeMenu"));
             this.classList.add("activeMenu");
         });
     });
	
};

document.addEventListener('DOMContentLoaded', () => {
    addActiveClass_to_navLink();
    // Get the login status from localStorage
    const loggedIn = localStorage.getItem('loggedIn');
    console.log(loggedIn);

    // Check if the user is logged in (token exists)
    if (loggedIn === 'true') {
        // Show only logged-in user menu items
        document.querySelector('#menu-add_course').style.display = 'block';  // Add Course
        document.querySelector('#menu-profile').style.display = 'block';  // Profile
        document.querySelector('#menu-logout').style.display = 'block';  // Logout
        // Hide menu items for not logged-in users
        document.querySelector('#menu-register').style.display = 'none'; // Register
        document.querySelector('#menu-login').style.display = 'none'; // Login

    } else {
        //console.log('Yeah bro!');
        // Show only not logged-in user menu items
        document.querySelector('#menu-register').style.display = 'block'; // Register
        document.querySelector('#menu-login').style.display = 'block'; // Login

        // Hide menu items for logged-in users
        document.querySelector('#menu-add_course').style.display = 'none';  // Add Course
        document.querySelector('#menu-profile').style.display = 'none';  // Profile
        document.querySelector('#menu-logout').style.display = 'none';  // Logout
    }
});


