document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const uid64 = urlParams.get('uid64');
    const token = urlParams.get('token');
    const status_success = document.querySelector('#status-success');
    const status_fail = document.querySelector('#status-fail');
    const spinner = document.getElementById('spinner');

    const email_link = document.querySelector('#email_link');
    const email = localStorage.getItem('user_email');
    if (email && email_link) {
        email_link.innerHTML = email;
    }

    if (uid64 && token) {
        spinner.style.display = 'block';
        fetch(`${apiRootLink}/user/activate/${uid64}/${token}/`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            spinner.style.display = 'none';
            if (data.message) {
                status_success.classList.remove('d-none');
            } else if (data.error) {
                status_fail.classList.remove('d-none');
            }
        })
        .catch(error => {
            spinner.style.display = 'none';
            status_fail.classList.remove('d-none');
        });
    } else {
        status_fail.classList.remove('d-none');
    }
});