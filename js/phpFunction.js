function phpFunction(action, valueName, value, href) {
    var data = {
        action: action,
        valueName: valueName,
        value: value
    };
    var xhr = new XMLHttpRequest();
    
    xhr.open('POST', '../php/phpFunction.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200)
                window.location.href = href;
        }
    };
    xhr.send(JSON.stringify(data));
}