
var isloading = false;

showOrders('self');
function showOrders(way) {
    document.getElementById('loading').innerHTML = '<img src="../images/loading.gif" height="40px">';

    setTimeout(function () {
        $.ajax({
            url: '../php/getOrders.php',
            type: 'POST',
            data: way.toString(),
            contentType: 'text/plain',
            dataType: 'json',
            success: function (ordersList) {
                var itemsTable = '';

                for (i = 0; i < ordersList.length; i++) {
                    if (i % 2 != 0)
                        itemsTable += '<tr id="listColor">';
                    else
                        itemsTable += '<tr>';

                    itemsTable += '<td><img src="../images/order.png" style="height: 30px;"></td>';
                    itemsTable += `<td>${ordersList[i].orderID.toString().padStart(3, '0')}</td>`;
                    itemsTable += `<td>${ordersList[i].purManID}</td>`;
                    itemsTable += `<td>${ordersList[i].orderDT}</td>`;
                    itemsTable += `<td>${ordersList[i].devDate}</td>`;
                    itemsTable += `<td>$${ordersList[i].totalPrice}</td>`;
                    itemsTable += `<td><img id="details" src="../images/orderDetails.png" onclick="orderDetails('${ordersList[i].orderID}')"></td></tr>`;
                }

                isloading = false;
                document.getElementById('orderList').innerHTML = '<tr id="listColor"><th id="loading"></th><th>Order ID</th><th>Manager ID</th><th>Order Date Time</th><th>Delivery Date</th><th>Total Price</th><th></th></tr>'
                document.getElementById('orderList').innerHTML += itemsTable;
            },
            error: function (xhr, status, error) {
                console.log('xhr: ' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
            }
        });
    }, 400);
}

function orderDetails(orderID) {
    window.location.href = 'orderInfo.html?id=' + orderID;
}

function changeSelect(button) {
    if (isloading)
        return;

    isloading = true;

    if (button.value == "Show all orders") {
        showOrders('all');
        button.value = "Show your orders"
    }
    else {
        showOrders('self');
        button.value = "Show all orders"
    }
}