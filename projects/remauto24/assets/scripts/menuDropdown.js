var mainMenu = document.querySelector(".main_menu-categories");
var menuDropdown = document.querySelector(".main_menu-dropdown");
var menuArrow = document.querySelector(".main_menu-arrow");
        
menuDropdown.onclick = function () {
    if(getComputedStyle(mainMenu).display == "none") {
        mainMenu.style.display = "flex";
        menuArrow.style.borderTopColor = "transparent";
        menuArrow.style.borderBottomColor = "#f5f5f5";
        menuArrow.style.top = "calc(50% - 8px)";
    } else {
        mainMenu.style.display = "none";
        menuArrow.style.borderTopColor = "#f5f5f5";
        menuArrow.style.borderBottomColor = "transparent";
        menuArrow.style.top = "calc(50% - 3px)";
    }
}