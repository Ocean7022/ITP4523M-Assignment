
var form;

//submit
$(document).ready(() => {
    $('#itemInfoForm').submit((event) => {
        event.preventDefault();
        form = event.target;

        //confirm message box
        var msg = '<h2 id="msg2">Confirm insert item?</h2>';
        msg += '<table><tr><td>';
        msg += '<input type="button" value="Yes" id="chick" onclick="insertItem()">';
        msg += '</td><td>';
        msg += '<input type="button" value="No" id="chick">';
        msg += '</td></tr></table><br>';
        showMessage(msg);
    });
});
 
function insertItem() {
    //get form data
    var formData = new FormData(form);

    //add image file in form data
    var fileInput = form.querySelector('input[type="file"]');
    var file = fileInput.files[0];
    formData.append('image', file);

    setTimeout(function () { //message box animation offset
        $.ajax({
            url: '../php/sendInsertRequest.php',
            type: 'POST',
            data: formData,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (response) {
                showMessage(response.msg);
                if (response.insert == 'success') { //refresh the form if the update was successful
                    document.getElementById('itemInfoForm').reset();
                    document.getElementById('image').value = '';
                }
            },
            error: function (xhr, status, error) {
                console.log('xhr: ' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
            }
        });
    }, 501);
}