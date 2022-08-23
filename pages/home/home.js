import { signout, getUserInfo } from '/js/firebase.js'

onload = () => {
    $('#hello').text("Hello: " + getUserInfo('username'))
}

$('#get-info').click(() => {
    var info = getUserInfo('json')
    var text = `
    info: {
        Username: ${info.providerData[0].displayName}  
            Email: ${info.email}
                UID: ${info.uid}
                PhotoURL: ${info.photoURL}
            EmailVerified?: ${info.emailVerified}
        isAnonymous?: ${info.isAnonymous}
    }
                `
    alert('Info', text, 'open')
})

$("#signout-btn").click(() => {
    $('#buttons').css('display', 'none')
    $('#hello').css('display', 'none')
    $('alert').css('display', 'none')
    $('.item').css('display', 'flex')
    signout()
});

$('#close-btn').click(() => {
    alert(null, null, 'close')
});

function alert(tittle, text, action) {
    if (action == 'open') {
        $('#title').text(tittle)
        $('#text').text(`${text}`)
        $('#alert').css('opacity', '0')
        $('#alert').css('display', 'flex')
        setTimeout(() => {
            $('#alert').css('opacity', '1')
        }, 200);

    }
    if (action == 'close') {
        setTimeout(() => {
            $('#alert').css('display', 'none')
        }, 200);
        $('#alert').css('opacity', '0')
    }
}

/*/

{
    "uid": "QEp1LpIcOPWISdCQyictA19wP0z2",
    "email": "jeryn@gmail.com",
    "emailVerified": false,
    "displayName": "jeryn",
    "isAnonymous": false,
    "providerData": [
        {
            "providerId": "password",
            "uid": "jeryn@gmail.com",
            "displayName": "jeryn",
            "email": "jeryn@gmail.com",
            "phoneNumber": null,
            "photoURL": null
        }
    ],
    "stsTokenManager": {
        "refreshToken": "AOEOulYIw-ViO8T3TxOZoFpCvLjBcPmzSt80JyPjEzGjoJpw_2Jp8rWBuNzEUhpwrXnOfTf6biypGeWis0SsXF6AvcyjYWaCMM_P9ha8bjCKT-5GBtUcXC9tdilSR0tGZhZOODw6qWYSyfVwQlGh_XkReBv0IpyOqiNVoaeYVoXiwGBrge-xafw78VMyWdVcNavQXPXwb8snPrvrnfvgo9SuCkFxHekimw",
        "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE4YmZhNzU2NDk4ZmRjNTZlNmVmODQ4YWY5NTI5ZThiZWZkZDM3NDUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiamVyeW4iLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbXV1bi04OGQyOCIsImF1ZCI6Im11dW4tODhkMjgiLCJhdXRoX3RpbWUiOjE2NjEyNjk2NTIsInVzZXJfaWQiOiJRRXAxTHBJY09QV0lTZENReWljdEExOXdQMHoyIiwic3ViIjoiUUVwMUxwSWNPUFdJU2RDUXlpY3RBMTl3UDB6MiIsImlhdCI6MTY2MTI2OTY1MiwiZXhwIjoxNjYxMjczMjUyLCJlbWFpbCI6ImplcnluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJqZXJ5bkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.NY4pWUzkCZWn8De6KuMiYyxRUqRV5S1IR8xy7qA6hCe3ZMMUVx2mQkFUx1PD5SK8I5Qbx1ohEoq5nAP6rgcXCu6kZ45EZjmS9LJL3XFMHLGrYFNCuqAzyOJM4tRlMBFLs9DEow6xURQuC6cYIeNfA4JOaK-x-ARTXXRLsMnuz9OI46yJztxz0x91kJUGiXY6xbd7n8wEdoZSjuOEOD1BuNmC1lOOBQTcEMXMpqMwju3ZrFz2ymWthKu4BCInZRu3-AWNrv6Cgm6s50Tj-2kS6UIqFqmnwUeqH1zjraCXwlnDS_1JF4A8i0axq6G7n43gntwadec5pfnVNI9C4TKlFQ",
        "expirationTime": 1661273252213
    },
    "createdAt": "1661185144876",
    "lastLoginAt": "1661269652210",
    "apiKey": "AIzaSyBlLGxeM4br2HcFJp6DSHGkQynRpLcLedo",
    "appName": "[DEFAULT]"
}

/*/