jQuery(".down-arrow").click(function() {
    jQuery([document.documentElement, document.body]).animate({
        scrollTop: jQuery("#products-list").offset().top
    }, 800);
});

jQuery(".to-top").click(function() {
    jQuery([document.documentElement, document.body]).animate({
        scrollTop: jQuery("#top").offset().top
    }, 800);
});
