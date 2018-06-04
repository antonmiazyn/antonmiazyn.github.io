/*tabs*/

/*titles*/

var l = document.querySelectorAll(".l");

/*steps*/

var c = document.querySelectorAll(".c");

/*action*/

l[0].onclick = function () {
    l[0].classList.add("services-tabs_active");
    l[1].classList.remove("services-tabs_active");
    c[0].style.display = "flex";
    c[1].style.display = "none";
}

l[1].onclick = function () {
    l[1].classList.add("services-tabs_active");
    l[0].classList.remove("services-tabs_active");
    c[1].style.display = "flex";
    c[0].style.display = "none";
}

