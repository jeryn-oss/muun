import { resetPassword, getParameterByName } from '/js/firebase.js'

var url;
var mode;
var actionCode;
const lang = navigator.language || navigator.userLanguage;

document.addEventListener('DOMContentLoaded', function () {
    url = window.location.href
    actionCode = getParameterByName('oobCode')
    mode = getParameterByName('mode')
    console.log(actionCode)
    console.log(mode)
});

function reset() {
    const newPass = $('#newPass').val()
    resetPassword(actionCode, newPass)
}