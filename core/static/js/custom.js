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

// Get all the menu items (adjust the selector if needed)
const addActiveClass_to_navLink = ()=> {
	const menuItem1 = document.getElementById("menu-item1");
	const menuItem2 = document.getElementById("menu-item2");
	const menuItem3 = document.getElementById("menu-item3");
	const menuItem4 = document.getElementById("menu-item4");
	const menuItem5 = document.getElementById("menu-item5");

	// Add active class funtion for use onclick
	const add_class_to_navLink = (element)=> {
		menuItem1.classList.remove("activeMenu");
		menuItem2.classList.remove("activeMenu");
		menuItem3.classList.remove("activeMenu");
		menuItem4.classList.remove("activeMenu");
		menuItem5.classList.remove("activeMenu");

		element.classList.add("activeMenu");
	};

	// Add activeMenu class first element by defualt
	menuItem1.classList.add("activeMenu");

	// add onclick listner
	menuItem1.onclick = ()=>{add_class_to_navLink(menuItem1);};
	menuItem2.onclick = ()=>{add_class_to_navLink(menuItem2);};
	menuItem3.onclick = ()=>{add_class_to_navLink(menuItem3);};
	menuItem4.onclick = ()=>{add_class_to_navLink(menuItem4);};
	menuItem5.onclick = ()=>{add_class_to_navLink(menuItem5);};
	
};

document.addEventListener('DOMContentLoaded', () => {
    //addActiveClass_to_navLink();
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


