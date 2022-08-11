function signin() {
    var user = $("#username").val()
    var pass = $('#password').val()
  
    if (pass == '') {
        $('#info').text('enter password')
        $('#info').css('opacity', '1')
        $('#info').css('color', 'red')
        setTimeout(() => {
            $('#info').css('opacity', '0')
        }, 5000)
    }
  
    if (user == '') {
        $('#info').text('enter username')
        $('#info').css('opacity', '1')
        $('#info').css('color', 'red')
        setTimeout(() => {
            $('#info').css('opacity', '0')
        }, 5000)
    }
  
    if (user != '' && pass != '') {
        signup()
    }
  }