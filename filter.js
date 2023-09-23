document.addEventListener("keydown", function (e) {
    if (e.key === "F12") {
        e.preventDefault();
    }
});
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);
