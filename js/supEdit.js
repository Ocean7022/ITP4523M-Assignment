
//fill items list
$.ajax({
    url: '../php/getItems.php',
    type: 'POST',
    data: 'Sup',
    contentType: 'text/plain',
    dataType: 'json',
    success: function (itemsList) {
        var itemsTable = '';

        for (i = 0; i < itemsList.length; i++) {
            if (i % 2 != 0)
                itemsTable += '<tr id="listColor">';
            else
                itemsTable += '<tr>';

            itemsTable += `<td><img id="items" src="../images/${itemsList[i].image}?tmp=${Math.random()}" style="height: 40px;"></td>`;
            itemsTable += `<td>${itemsList[i].id.toString().padStart(3, '0')}</td>`;
            itemsTable += `<td>${itemsList[i].name}</td>`;
            itemsTable += `<td>$${itemsList[i].price}</td>`;
            itemsTable += `<td>${itemsList[i].stockItemQty}</td>`;
            itemsTable += `<td><img id="editAndDelete" onclick="itemInfo('${itemsList[i].id}')" src="../images/edit.png"style="height: 40px;"></td></tr>`;
        }
        document.getElementById('itemsList').innerHTML += itemsTable;
    },
    error: function (xhr, status, error) {
        console.log('xhr: ' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
    }
});

function itemInfo($itemID) {
    window.location.href = 'itemInfo.html?id=' + $itemID;
}