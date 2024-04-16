function showAndHide(textBoxID, imgID) {
    var textBox = document.getElementById(textBoxID);
    var img = document.getElementById(imgID);
    img.addEventListener("click", function () {
        if (textBox.getAttribute("type") == "password") {
            textBox.setAttribute("type", "text");
            document.getElementById(imgID).innerHTML = '<img src="../images/showPwd.png" style="width: 45px;">';
        }
        else {
            textBox.setAttribute("type", "password");
            document.getElementById(imgID).innerHTML = '<img src="../images/hidePwd.png" style="width: 45px;">';
        }
    });
}