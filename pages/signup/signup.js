import { signup, confirmPhone, validateEmail, checkUsername } from '/js/firebase.js'

$('#signup-btn').click(() => { signupAction() });
$('html').keypress(function (e) {
    if (e.which == 13) {
        signupAction()
    }
});


async function signupAction() {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirmpassword').value;
    if (validateEmail(email)) {
        if (confirmPhone(phone)) {
            if ( await checkUsername(username)) {
                if (password) {
                    if (password == confirm) {
                        signup(username, email, phone, password)
                    } else {
                        $('#info').text('Passwords do not match')
                        $('#info').css('opacity', '1')
                        $('#info').css('color', 'red')
                        setTimeout(() => {
                            $('#info').css('opacity', '0')
                        }, 5000)
                        $('#confirmpassword').css('border', 'red 2px solid')
                        setTimeout(() => {
                            $('#confirmpassword').css('border', '')
                        }, 5000)
                    }
                } else {
                    $('#info').text('Password is required')
                    $('#info').css('opacity', '1')
                    $('#info').css('color', 'red')
                    setTimeout(() => {
                        $('#info').css('opacity', '0')
                    }, 5000)
                    $('#password').css('border', 'red 2px solid')
                    setTimeout(() => {
                        $('#password').css('border', '')
                    }, 5000)
                }
            } else {
                $('#info').text('Username not available')
                $('#info').css('opacity', '1')
                $('#info').css('color', 'red')
                setTimeout(() => {
                    $('#info').css('opacity', '0')
                }, 5000)
                $('#username').css('border', 'red 2px solid')
                setTimeout(() => {
                    $('#username').css('border', '')
                }, 5000)
            }
        } else {
            $('#info').text('Iinvalid phone or already in use')
            $('#info').css('opacity', '1')
            $('#info').css('color', 'red')
            setTimeout(() => {
                $('#info').css('opacity', '0')
            }, 5000)
            $('#phone').css('border', 'red 2px solid')
            setTimeout(() => {
                $('#phone').css('border', '')
            }, 5000)
        }
    } else {
        $('#info').text('Invalid email')
        $('#info').css('opacity', '1')
        $('#info').css('color', 'red')
        setTimeout(() => {
            $('#info').css('opacity', '0')
        }, 5000)
        $('#email').css('border', 'red 2px solid')
        setTimeout(() => {
            $('#email').css('border', '')
        }, 5000)
    }
}