const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginErrorMessage = document.getElementById('login-error-message');
const registerErrorMessage = document.getElementById('register-error-message');
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');

loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    document.querySelector('.login-form').style.display = 'block';
    document.querySelector('.register-form').style.display = 'none';
});

registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    document.querySelector('.login-form').style.display = 'none';
    document.querySelector('.register-form').style.display = 'block';
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registration successful!');
            } else {
                registerErrorMessage.textContent = 'Username already taken';
            }
        })
        .catch(error => console.error(error));
});