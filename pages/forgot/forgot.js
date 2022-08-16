import { forgot } from '/js/firebase.js'

$('#code-btn').click( async function(){
    var e = $('#text').val()
    if (e != '') {
        var d = await forgot(e);
    }
})