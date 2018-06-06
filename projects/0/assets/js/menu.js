/*mobile menu*/

function show() {
    var menu = document.querySelector(".menu");
    var bars = document.querySelector(".show-menu_bars");
    var times = document.querySelector(".show-menu_times");
    
    if ( getComputedStyle(menu).display == "none" ) {
        menu.style.display = "block";
        bars.style.display = "none";
        times.style.display = "block";
    } else {
        menu.style.display = "none";
        bars.style.display = "block";
        times.style.display = "none";
    }
}