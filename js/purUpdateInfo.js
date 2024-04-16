

fillUserInfo();
function fillUserInfo() {
    $.ajax({
        url: '../php/getUserInfo.php',
        type: 'GET',
        dataType: 'json',
        success: function (userData) {
            document.getElementById('userName').innerText = userData.name;
            document.getElementById('id').innerText = userData.id;
            document.getElementById('contact').value = userData.contact;
            document.getElementById('address').value = userData.address;

            //reset to password text box
            document.getElementById('oldPwd').value = '';
            document.getElementById('newPwd1').value = '';
            document.getElementById('newPwd2').value = '';
        },
        error: function (xhr, status, error) {
            console.log('xhr: ' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
        }
    });
}

//submit
$(document).ready(() => {
    $('#userInfoForm').submit((event) => {
        event.preventDefault();

        var oldPwd = document.getElementById('oldPwd').value;
        var newPwd1 = document.getElementById('newPwd1').value;
        var newPwd2 = document.getElementById('newPwd2').value;

        //Check the password entered by the user
        if ((oldPwd.length + newPwd1.length + newPwd2.length) !== 0) { //if password box text length > 0 check password 
            if (newPwd1 != newPwd2) {
                showMessage('New Password not match!');
                return;
            }
            document.getElementById('type').value = 'passwordAndOther'; //update with password
        } else
            document.getElementById('type').value = 'OtherOnly'; //update with no password

        const formData = $('#userInfoForm').serialize();

        $.ajax({
            url: '../php/sendUpdateRequest.php',
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function (response) {
                showMessage(response.msg);
                if (response.update == 'success') //refresh the form if the update was successful
                    fillUserInfo();
            },
            error: function (xhr, status, error) {
                console.log('xhr: ' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
            }
        });
    });
});