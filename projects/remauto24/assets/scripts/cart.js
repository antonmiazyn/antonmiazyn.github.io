var cart = document.querySelector(".cart_window-wrapper");
var cartWindow = document.querySelector(".cart_window");

var cartOpen = document.querySelector(".header_cart-arrow").onclick = function() {
    cart.style.display = "flex";
}

var cartCloser = document.querySelector(".cart_window-close").onclick = function() {
    cart.style.display = "none";
}