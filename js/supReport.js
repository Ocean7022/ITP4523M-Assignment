

fillItemsList();
function fillItemsList() {
    $.ajax({
        url: '../php/getItems.php',
        type: 'POST',
        data: 'Report', //get items list way
        contentType: 'text/plain',
        dataType: 'json',
        success: function (itemsList) {
            var itemsTable = '<tr id="listColor"><th style="width: 70px;"></th><th>Item ID</th><th>Item Name</th><th>Total Sale</th><th>Amount($)</th><th></th><th>';
            for (i = 0; i < itemsList.length; i++) {
                if (i % 2 != 0)
                    itemsTable += '<tr id="listColor">';
                else
                    itemsTable += '<tr>';

                itemsTable += `<td><img id="items" src="../images/${itemsList[i].image}?tmp=${Math.random()}" style="height: 40px;"></td>`;
                itemsTable += `<td>${itemsList[i].id.toString().padStart(3, '0')}</td>`;
                itemsTable += `<td>${itemsList[i].name}</td>`;
                itemsTable += `<td>${itemsList[i].total}</td>`;
                itemsTable += `<td>$${itemsList[i].amount}</td>`;
                itemsTable += `<td><img id="editAndDelete" onclick="confirmDelete('${itemsList[i].id}')" src="../images/delete.png" style="height: 40px;"></a></td>`;
            }
            document.getElementById('itemsList').innerHTML = itemsTable;
        },
        error: function (xhr, status, error) {
            console.log('xhr: ' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
        }
    });
}

function confirmDelete(itemID) {
    //confirm message box
    var msg = '<h2 id="msg2">Confirm delete?</h2>';
    msg += '<table><tr><td>';
    msg += `<input type="button" value="Yes" id="chick" onclick="deleteItem('${itemID}')">`;
    msg += '</td><td>';
    msg += '<input type="button" value="No" id="chick">';
    msg += '</td></tr></table><br>';
    showMessage(msg);
}

function deleteItem(itemID) {
    setTimeout(function () { //message box animation offset
        $.ajax({
            url: '../php/sendDeleteItemRequest.php',
            type: 'POST',
            data: itemID,
            contentType: 'text/plain',
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (data) {
                showMessage(data.msg);
                if (data.delete == 'success')
                    fillItemsList();
            },
            error: function (xhr, status, error) {
                console.log('xhr: ' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
            }
        });
    }, 501);
}