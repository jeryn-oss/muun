import { signup } from '/js/firebase.js'

$('#signup-btn').click(() => { signupAction() });
$('html').keypress(function (e) {
    if (e.which == 13) {
        signupAction()
    }
});

function signupAction() {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const username = document.getElementById('username').value;
    const birthday = document.getElementById('birthday').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirmpassword').value;
    if (email != '') {
        if (phone) {
            if (birthday) {
                if (username) {
                    if (password) {
                        if (password == confirm) {
                            try {
                                signup(username, email, phone, birthday, password)
                            }catch (e){
                                console.log(e)
                            }finally {
                                console.log('error')
                            }
                        } else {
                            $('#confirmpassword').css('border', 'red 2px solid')
                            setTimeout(() => {
                                $('#confirmpassword').css('border', '')
                            }, 5000)
                        }
                    } else {
                        $('#password').css('border', 'red 2px solid')
                        setTimeout(() => {
                            $('#password').css('border', '')
                        }, 5000)
                    }
                } else {
                    $('#username').css('border', 'red 2px solid')
                    setTimeout(() => {
                        $('#username').css('border', '')
                    }, 5000)
                }
            } else {
                $('#birthday').css('border', 'red 2px solid')
                setTimeout(() => {
                    $('#birthday').css('border', '')
                }, 5000)
            }
        } else {
            $('#phone').css('border', 'red 2px solid')
            setTimeout(() => {
                $('#phone').css('border', '')
            }, 5000)
        }
    } else {
        $('#email').css('border', 'red 2px solid')
        setTimeout(() => {
            $('#email').css('border', '')
        }, 5000)
    }


}