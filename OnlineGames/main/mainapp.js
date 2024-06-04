window.addEventListener("load", () => {
    document.getElementById("closebtn").style.visibility = "hidden";
    for (let i = 0; i < 4; i++) {
        document.getElementById("link" + i).style.visibility = "hidden";
    }
    for (let i = 1; i < 4; i++) {
        document.getElementById("osztaly" + i).style.display = "none";
    }
})



function openNav() {
    document.getElementById("closebtn").style.visibility = "visible";
    document.getElementById("openbtn").style.visibility = "hidden";
    document.getElementById("mySidenav").style.width = "250px";
    for (let i = 0; i < 4; i++) {
        document.getElementById("link" + i).style.visibility = "visible";
    }
}

function closeNav() {
    document.getElementById("closebtn").style.visibility = "hidden";
    document.getElementById("openbtn").style.visibility = "visible";
    document.getElementById("mySidenav").style.width = "40px";
    for (let i = 0; i < 4; i++) {
        document.getElementById("link" + i).style.visibility = "hidden";
    }
}