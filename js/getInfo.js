
function getItems(condition) {
    if (condition == null)
        $.ajax({
            url: '../php/getItems.php',
            type: 'GET',
            dataType: 'json',
            success: function (itemList) {
                return JSON.stringify(itemList);
            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        });
}