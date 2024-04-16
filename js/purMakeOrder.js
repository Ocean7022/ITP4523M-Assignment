
var priceQueue = [];
var isCounting = false;

showItems();
function showItems() {
    var itemsTable = '<tr id="listColor" style="height: 50px;"><th></th><th>Item ID</th><th>Item Name</th><th>Item Price</th><th>Order Quantity</th></tr>';

    $.ajax({
        url: '../php/getItems.php',
        type: 'POST',
        data: 'All', //get items list way
        contentType: 'text/plain',
        dataType: 'json',
        success: function (itemsList) {
            for (i = 0; i < itemsList.length; i++) {
                if (i % 2 != 0)
                    itemsTable += '<tr id="listColor" style="height: 50px;">';
                else
                    itemsTable += '<tr style="height: 50px;">';

                itemsTable += `<td><img id="items" src="../images/${itemsList[i].image}?tmp=${Math.random()}" style="height: 40px;"></td>`;
                itemsTable += `<td><p>${itemsList[i].id.toString().padStart(3, '0')}</p></td><td><p>${itemsList[i].name}</p></td>`;
                itemsTable += `<td><p class="price" data-value="${itemsList[i].price}">$${Number(itemsList[i].price).toFixed(2)}</p></td>`;
                itemsTable += `<td><input id="quantityBox" type="number" class="quantity" name="item${itemsList[i].id}" min="0" max="10000" value="0"></td></tr>`;
            }

            document.getElementById('itemsList2').innerHTML = itemsTable;
            setListener(); //use at count total price
        },
        error: function (xhr, status, error) {
            console.log('xhr: ' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
        }
    });
}

function setListener() {
    const orderQuantity = document.querySelectorAll('.quantity'); //get all quantity from calss quantity
    const itemPrice = document.querySelectorAll('.price'); //get all price from calss price

    orderQuantity.forEach(element => { //get all items order quantity and price
        element.addEventListener('change', function () {
            countTotalPrice(orderQuantity, itemPrice);
        });
    });
}

//collect the total number of items and calculate the total price
function countTotalPrice(orderQuantity, itemPrice) {
    var totalItems = 0;
    var totalPrice = 0;

    //collect data
    for (var num = 0; num < orderQuantity.length; num++) {
        totalItems += parseInt(orderQuantity[num].value);
        totalPrice += parseInt(orderQuantity[num].value) * parseInt(itemPrice[num].getAttribute("data-value"));
    }

    document.getElementById('tbTotalItems').value = totalItems;
    document.getElementById('tbTotalPrice').value = totalPrice;
    priceQueue.push(totalPrice);
    if (!isCounting)
        discountCalculator(); //calculating discounts from the total price
}

//get discount and new order price
function discountCalculator() {
    if (!isCounting) { //start loading icon
        document.getElementById('loading1').innerHTML = '<img src="../images/loading.gif" height="30px">';
        document.getElementById('loading2').innerHTML = '<img src="../images/loading.gif" height="30px">';
    }

    console.log('count');

    isCounting = true;
    var totalPrice;

    //Prevent users from operating too quickly
    //Causes too frequent requests to the server
    setTimeout(function () {
        if (priceQueue.length > 1) { //if queue length over 1, del queue and call back
            priceQueue.shift();
            discountCalculator();
        }
        else { //if queue length = 1, send price to discount calculator
            totalPrice = priceQueue.shift();

            $.ajax({
                url: '../php/discountCalculator.php',
                type: 'POST',
                data: totalPrice.toString(),
                contentType: 'text/plain',
                dataType: 'json',
                success: function (response) {
                    document.getElementById('tbTotalPriceNew').value = response.NewOrderAmount; //set total price
                    document.getElementById('tbDiscountRate').value = response.DiscountRate; //set discount
                    document.getElementById('loading1').innerHTML = ''; //remove loadign icon
                    document.getElementById('loading2').innerHTML = ''; //remove loadign icon
                    isCounting = false;
                },
                error: function (xhr, status, error) {
                    console.log('xhr: ' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
                }
            });
        }
    }, 150)
}

//submit
$(document).ready(() => {
    $('#orderForm').submit((event) => {
        event.preventDefault();
        document.getElementById('serMsg').innerHTML = '';

        //returns error message if the user does not enter anything
        if (document.getElementById('tbTotalItems').value <= 0) {
            document.getElementById('serMsg').innerHTML = 'The total number of items cannot be 0!';
            return;
        }

        //get form data
        const formData = $('#orderForm').serialize();

        $.ajax({
            url: '../php/sendOrderRequest.php',
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function (response) {
                console.log(response.makeOrder);
                if (response.makeOrder == 'fail')
                    document.getElementById('serMsg').innerHTML = 'The quantity of the item <style001>' + response.item + '</style001> ordered exceeds the stock!<br><br><br><style001>Warehouse stock has ' + response.qty + '</style001>';
                else if (response.makeOrder == 'success') {
                    showMessage('Order submit successfully<br>Order ID : ' + response.newOrderNum);

                    //reset the form
                    showItems();
                    document.getElementById('tbTotalItems').value = 0;
                    document.getElementById('tbTotalPrice').value = 0;
                    document.getElementById('tbTotalPriceNew').value = 0;
                    document.getElementById('tbDiscountRate').value = 0;
                    document.getElementById('serMsg').innerHTML = '';
                }
            },
            error: function (xhr, status, error) {
                console.log('xhr: ' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
            }
        });
    });
});