// Extended with role-based access control

const accessCtrl = () => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const userType = localStorage.getItem('user_type'); // Retrieve user type from localStorage
    const currentPath = window.location.pathname;

    const protectedPaths = ['/user/profile/', '/user/profile/change/password', '/user/profile/update/', '/add_course/'];
    const publicPaths = ['/user/login/', '/user/register/'];
    const teacherOnlyPaths = ['/add_course/']; // Only accessible to teachers

    if (protectedPaths.includes(currentPath) && !loggedIn) {
        window.location.href = '/user/login/';
    }

    if (loggedIn) {
        if(publicPaths.includes(currentPath))
            window.location.href = '/user/profile/';
        // Restrict certain pages to specific user roles
        if (teacherOnlyPaths.includes(currentPath) && userType !== 'teacher') {
            window.location.href = '/user/profile/';
        }
    }

};

accessCtrl();
