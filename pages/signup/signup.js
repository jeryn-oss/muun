import { signup } from '/firebase.js'

$('#signup-btn').click( () => {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const username = document.getElementById('username').value;
    const birthday = document.getElementById('birthday').value;
    const password = document.getElementById('password').value;

    signup(username, email, phone, birthday, password)
})