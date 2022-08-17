import { resetPassword, getParameterByName } from '/js/firebase.js'

var url;
var mode;
var actionCode;
var continueUrl;
const lang = navigator.language || navigator.userLanguage;

document.addEventListener('DOMContentLoaded', function () {
    url = window.location.href
    actionCode = getParameterByName('oobCode')
    continueUrl = getParameterByName('continueUrl')
    console.log(actionCode)
    console.log(mode)
});

$('#submit-btn').click((e) => {reset()})

function reset() {
    const newPass = $('#text').val()
    const confirmPass = $('#conf-text').val()
    if(newPass == '' || confirmPass == '') {
        $('#info').text('enter a password')
        $('#info').css('opacity', '1')
        $('#info').css('color', 'red')
        setTimeout(() => {
            $('#info').css('opacity', '0')
        } , 5000)
    }
    else if(newPass.length < 6) {
        $('#info').text('password to short')
        $('#info').css('opacity', '1')
        $('#info').css('color', 'red')
        setTimeout(() => {
            $('#info').css('opacity', '0')
        } , 5000)
    }
    else if (newPass == confirmPass) {
        resetPassword(actionCode, newPass, continueUrl,lang)
    } else {
        $('#info').text('passwords do not match')
        $('#info').css('opacity', '1')
        $('#info').css('color', 'red')
        setTimeout(() => {
            $('#info').css('opacity', '0')
        } , 5000)
    }
}