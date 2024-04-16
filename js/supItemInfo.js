
var url = new URLSearchParams(window.location.search);
var itemID = url.get('id');
var form;

//get item information
$.ajax({
    url: '../php/getItemInfo.php',
    type: 'POST',
    data: itemID,
    contentType: 'text/plain',
    dataType: 'json',
    success: function (itemsInfo) {
        //fill item informatino
        document.getElementById('supID').innerText = itemsInfo.supID.toString().padStart(3, '0');
        document.getElementById('itemID').innerText = itemsInfo.id;
        document.getElementById('itemIDHidden').value = itemsInfo.id;
        document.getElementById('itemName').value = itemsInfo.name;
        document.getElementById('description').value = itemsInfo.description;
        document.getElementById('quantity').value = itemsInfo.qty;
        document.getElementById('price').value = itemsInfo.price;
        document.getElementById('items').setAttribute('src', '../images/' + itemsInfo.file + '?tmp=' + Math.random());
        document.getElementById('itemImageHidden').value = itemsInfo.file;
    },
    error: function (xhr, status, error) {
        console.log('xhr: ' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
    }
});

//submit
$(document).ready(() => {
    $('#itemInfoForm').submit((event) => {
        event.preventDefault();
        form = event.target; //get form data

        //confirm message box
        var msg = '<h2 id="msg2">Confirm edit?</h2>';
        msg += '<table><tr><td>';
        msg += '<input type="button" value="Yes" id="chick" onclick="editItemInfo()">';
        msg += '</td><td>';
        msg += '<input type="button" value="No" id="chick">';
        msg += '</td></tr></table><br>';
        showMessage(msg);
    });
});

function editItemInfo() {
    var formData = new FormData(form);

    //add image data in form data if uploaded
    if (document.getElementById('image').value != '') {
        console.log('have image');
        var fileInput = form.querySelector('input[type="file"]');
        var file = fileInput.files[0];
        formData.append('image', file);
    }

    setTimeout(function () { //message box animation offset
        $.ajax({
            url: '../php/sendEditRequest.php',
            type: 'POST',
            data: formData,
            contentType: 'text/plain',
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.edit == 'success')
                    showMessage(data.msg, 'edit.html');
                else
                    showMessage(data.msg);
            },
            error: function (xhr, status, error) {
                console.log('xhr: ' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
            }
        });
    }, 501);
}