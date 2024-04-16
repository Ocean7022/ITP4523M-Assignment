
var url = new URLSearchParams(window.location.search);
var orderID = url.get('id');
var stopSorting = false;
var sortDetail = {
    companyName: 'null',
    itemID: 'ASC',
    itemName: 'null',
    orderQty: 'null',
    itemPrice: 'null',
    totalPrice: 'null'
};
var title = {
    itemID: 'Item ID',
    itemName: 'Item Name',
    companyName: 'Suplier Name',
    orderQty: 'Order Quantity',
    itemPrice: 'Item Price',
    totalPrice: 'Total Price',
};

fillInfo();
//get order infomation
function fillInfo() {
    var data = {
        orderID: orderID,
        sortDetail
    };
    console.log(JSON.stringify(data));

    $.ajax({
        url: '../php/getOrderInfo.php',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            var orderInfo = data.orderInfo;
            var orderItmes = data.orderItmes;

            //fill order information
            document.getElementById('orderID').innerText = orderInfo.orderID.toString().padStart(3, '0');
            document.getElementById('managerID').innerText = orderInfo.purchaseManagerID;
            document.getElementById('managerName').innerText = orderInfo.name;
            document.getElementById('orderTime').innerText = orderInfo.orderDateTime;
            document.getElementById('deDate').innerText = orderInfo.deliveryDate;
            document.getElementById('deAddress').innerText = orderInfo.deliveryAddress;
            document.getElementById('amount').innerText = '$' + data.newPrice;
            document.getElementById('discount').innerText = data.discount;

            var itemsTable = '';

            //fill order items information
            for (i = 0; i < orderItmes.length; i++) {
                if (i % 2 != 0)
                    itemsTable += '<tr id="listColor">';
                else
                    itemsTable += '<tr>';

                itemsTable += `<td><img id="items" src="../images/${orderItmes[i].imageFile}?tmp=${Math.random()}" style="height: 40px;"></td>`;
                itemsTable += `<td>${orderItmes[i].itemID.toString().padStart(3, '0')}</td>`;
                itemsTable += `<td>${orderItmes[i].itemName}</td>`;
                itemsTable += `<td>${orderItmes[i].companyName}</td>`;
                itemsTable += `<td>${orderItmes[i].orderQty}</td>`;
                itemsTable += `<td>$${orderItmes[i].itemPrice}</td>`;
                itemsTable += `<td>$${orderItmes[i].totalPrice}</td></tr>`;
            }
            document.getElementById('info').innerHTML = itemsTable;

            //use on sort items list
            document.getElementById('itemID').addEventListener('click', function () { sortList('itemID') });
            document.getElementById('itemName').addEventListener('click', function () { sortList('itemName') });
            document.getElementById('companyName').addEventListener('click', function () { sortList('companyName') });
            document.getElementById('orderQty').addEventListener('click', function () { sortList('orderQty') });
            document.getElementById('itemPrice').addEventListener('click', function () { sortList('itemPrice') });
            document.getElementById('totalPrice').addEventListener('click', function () { sortList('totalPrice') });

            document.getElementById('loading').innerHTML = '';
            stopSorting = false;
        },
        error: function (xhr, status, error) {
            console.log('xhr: ' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
            document.getElementById('loading').innerHTML = '';
            stopSorting = false;
        }
    });
}

function sortList(selectColumn) {
    if (stopSorting)
        return;

    stopSorting = true;
    document.getElementById('loading').innerHTML = '<img src="../images/loading.gif" height="40px">';

    setTimeout(function () { //to prevent too fast operation
        sortDetail[selectColumn] = sortChange(sortDetail[selectColumn], selectColumn);
        fillInfo();
    }, 1000);
}

//change the sort condition
function sortChange(type, selectColumn) {
    if (type == 'null') {
        document.getElementById(selectColumn).innerHTML = '&and; ' + title[selectColumn];
        return 'ASC';
    }
    if (type == 'ASC') {
        document.getElementById(selectColumn).innerHTML = '&or; ' + title[selectColumn];
        return 'DESC';
    }
    if (type == 'DESC') {
        document.getElementById(selectColumn).innerHTML = title[selectColumn];
        return 'null';
    }
}

function confirm() {
    var msg = '<h2 id="msg2">Confirm delete?</h2>';
    msg += '<table><tr><td>';
    msg += '<input type="button" value="Yes" id="chick" onclick="deleteOrder()">';
    msg += '</td><td>';
    msg += '<input type="button" value="No" id="chick">';
    msg += '</td></tr></table><br>';
    showMessage(msg);
}

function deleteOrder() {
    setTimeout(function () { //message box animation offset
        $.ajax({
            url: '../php/SendDeleteOrderRequest.php',
            type: 'POST',
            data: orderID,
            contentType: 'text/plain',
            dataType: 'json',
            success: function (data) {
                if (data.delete == 'success')
                    showMessage(data.msg, 'view.html'); //go back after message clicked
                else
                    showMessage(data.msg);
            },
            error: function (xhr, status, error) {
                console.log('xhr: ' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
            }
        });
    }, 501);
}