import { signin } from "/js/firebase.js"

$("#signin-btn").click(() => {
    signIn()
});
$('html').keypress(function (e) {
    if (e.which == 13) {
        signIn()
    }
});


function signIn(){
    var user = $("#username").val()
    var pass = $('#password').val()

    if (pass == '') {
        $('#info').text('enter password')
        $('#info').css('opacity', '1')
        $('#info').css('color', 'red')
        setTimeout(() => {
            $('#info').css('opacity', '0')
        } , 5000)
    }

    if (user == '') {
        $('#info').text('enter username')
        $('#info').css('opacity', '1')
        $('#info').css('color', 'red')
        setTimeout(() => {
            $('#info').css('opacity', '0')
        } , 5000)
    }

    if (user != '' && pass != '') {
        signin(user, pass)
    }
}