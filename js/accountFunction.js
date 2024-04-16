
//check uesr login
var userPosition = window.location.pathname;

console.log(userPosition);

$.ajax({
    url: '../php/checkLogin.php',
    type: 'POST',
    data: userPosition,
    contentType: 'text/plain',
    dataType: 'json',
    success: function (response) {
        console.log('Check : ' + response.check);
        console.log('Still time : ' + response.time);
        console.log('User name : ' + response.username);

        if (response.check == 'pass' && response.comName == null)
            document.getElementById('name').innerHTML = response.username + ' (' + response.userid + ')';
        else if (response.check == 'pass' && response.comName != null)
            document.getElementById('name').innerHTML = response.username + ' (' + response.userid + ')<br>' + response.comName;
        else if (response.check == 'fail')
            window.location.href = '../loggedOut.html'; //lead to login page
    },
    error: function (xhr, status, error) {
        console.log('xhr: ' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
    }
});

//login function
function login() {
    event.preventDefault();

    var id = document.getElementById('id').value;
    var pwd = document.getElementById('pwd').value;

    if (id == '' || pwd == '') {
        document.getElementById('msg').innerHTML = 'Please enter ID and password';
        return;
    } else {
        var loginInfo = { id: id, pwd: pwd };

        $.ajax({
            url: 'php/login.php',
            type: 'POST',
            data: JSON.stringify(loginInfo),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                if (response.login == 'pass')
                    window.location.href = response.link;
                else if (response.login == 'fail')
                    document.getElementById('msg').innerHTML = 'Wrong ID or password';
            },
            error: function (xhr, status, error) {
                console.log('xhr: ' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
            }
        });
    }
}

//logout function
function logout() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            window.location.href = '../loggedOut.html';
        }
    };
    xhttp.open('POST', '../php/logout.php', true);
    xhttp.send();
}

