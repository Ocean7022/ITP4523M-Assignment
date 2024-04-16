var msgBoxBackground = document.getElementById("msgBoxBackground");
var msgBox = document.getElementById("msgBox");
var url = null;

function showMessage(text, location) {
    console.log(text);
    url = location;

    if (text != null)
        document.getElementById("msg2").innerHTML = text;
    msgBoxBackground.style.zIndex = 4;
    msgBox.style.zIndex = 5;

    msgBoxBackground.classList.add("msgBoxAnimation01");
    msgBox.classList.add("msgBoxAnimation01");
}

msgBoxBackground.addEventListener("click", function () {
    msgBoxBackground.classList.remove("msgBoxAnimation01");
    msgBox.classList.remove("msgBoxAnimation01");
    msgBoxBackground.classList.add("msgBoxAnimation02");
    msgBox.classList.add("msgBoxAnimation02");

    setTimeout(function () {
        if (url != null)
            window.location.href = url;

        msgBoxBackground.classList.remove("msgBoxAnimation02");
        msgBox.classList.remove("msgBoxAnimation02");
        msgBoxBackground.style.zIndex = 1;
        msgBox.style.zIndex = 1;
    }, 500);
});
