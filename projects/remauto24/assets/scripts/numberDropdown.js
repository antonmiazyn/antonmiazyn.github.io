var headerPhone = document.querySelector(".header_numbers-hidden");
var headerDropdown = document.querySelector(".header_numbers-dropdown");
        
headerDropdown.onclick = function () {
    if(getComputedStyle(headerPhone).display == "none") {
        headerPhone.style.display = "block";
        headerDropdown.style.borderTopColor = "transparent";
        headerDropdown.style.borderBottomColor = "#181818";
        headerDropdown.style.top = "calc(50% - 6px)";
    } else {
        headerPhone.style.display = "none";
        headerDropdown.style.borderTopColor = "#181818";
        headerDropdown.style.borderBottomColor = "transparent";
        headerDropdown.style.top = "calc(50% - 1px)";
    }
}