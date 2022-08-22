import { signout } from '/js/firebase.js'

$("#signout-btn").click(() => {
    $('#signout-btn').css('display', 'none')
    $('.item').css('display', 'flex')
    signout()
});