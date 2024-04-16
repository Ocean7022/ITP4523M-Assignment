var url = new URLSearchParams(window.location.search);
var msg = url.get('msg');
if (msg)
    showMessage(msg); 