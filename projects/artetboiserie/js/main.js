document.addEventListener('DOMContentLoaded', function () {
    // var shapes = "path, rect, circle, ellipse, polyline",
    // tl = gsap.timeline({repeat: 1});
    // tl = gsap.timeline({repeat:1});
    // TweenLite.to("#preloader", 5, {drawSVG:1, repeat:1, yoyo:true});
    // var tl = new TimelineMax({repeat:-1, repeatDelay:1});
    // tl.to('#preloader', 1, {startAt:{drawSVG:'0% 0%'}, drawSVG:'0% 100%', ease:Quad.easeInOut})
    //     .to('#preloader', 1, {drawSVG:'100% 100%', ease:Quad.easeInOut})
    // gsap.to("#preloader", {x: 100, duration: 1});

    //        tl.fromTo('path', {drawSVG:"0%"}, {duration: 1, drawSVG:"50% 50%", stagger: 0.5})
    // .fromTo('path', {drawSVG:"100%"}, {duration: 2, drawSVG:"10%", immediateRender:false}, "+=0.1")


});

$(document).ready(function () {




    var bgvideo = document.getElementById("video");


    if (bgvideo) {
        bgvideo.play();
    }



    var allVideos = document.getElementsByTagName('video');

    if (allVideos.length) {
        for (let i = 0; i < allVideos.length; i++) {
            console.log(allVideos[i]);
            if ($(this).hasClass('.controls_false')) {
                //$(this).controls = false;
            }
            if ($(window).width() <= '1025') {
                allVideos[i].controls = false;
            } else {

            }

            allVideos[i].play();
        }
    }




    let currentLang = $('.js-lang-switcher .active').text();
    let formMarkup;

    if ($('.video-slider').length) {
        $('.video-slider').slick({
            loop: true
        });
    };

    if ($('.video-slider').length) {

        let currVideoInit = $('.video-slider .slick-current').find('video');

        if (currVideoInit) {
            console.log(currVideoInit);
            currVideoInit[0].pause();
            currVideoInit[0].currentTime = 0;
            currVideoInit[0].play();
        }

    }
    let $status = $('.video-slider-status');
    if ($('.video-slider').length) {

        $('.video-slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.html('<span> ' + i + '</span>' + ' / ' + slick.slideCount);
            let currVideo = $('.video-slider .slick-current').find('video');
            if (currVideo.length) {
                currVideo[0].pause();
                currVideo[0].currentTime = 0;
                currVideo[0].play();
            }
        });
    }
    //    if ($('.video-slider-item.slick-current.slick-active').length){
    // $('.video-slider-item.slick-current.slick-active').find('video').play();
    //    }
    // document.getElementById('video').play();

    // if (window.innerWidth < 640) {
    // if (typeof $('.gallery-list .container').slick !== "undefined") {


    //     $('.gallery-list .container').slick({
    //     vertical: true,
    //     verticalSwiping: true,
    //     speed: 600,
    //     infinite: false
    // });
    // }
    // }


    $('.scroll-to-page-top').click(function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    var newValue, oldValue;
    $(window).scroll(function (e) {


        newValue = window.pageYOffset;
        console.log(newValue);
        console.log(oldValue);
        //Subtract the two and conclude


        // Update the old value
        if ($(this).scrollTop() > 400) {
            if (oldValue - newValue < 0) {
                $('.scroll-to-page-top').fadeOut(500); // Fading out the button on scroll if less than 150px
            } else {
                $('.scroll-to-page-top').fadeIn(500); // Fading out the button on scroll if less than 150px
            }

        } else {
            if (oldValue - newValue > 0) {
                $('.scroll-to-page-top').fadeOut(500); // Fading in the button on scroll after 150px
            }
        }
        oldValue = newValue;
    });


    if (currentLang.includes('EN')) {
        formMarkup = '<div class="popup-form-wrapper"><div class="popup-form">\n' +
            '    <div class="close">\n' +
            '        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '            <path d="M29.089 0.072998L15.1292 13.9871L1.16929 0.072998L0.323242 0.916296L14.2831 14.8304L0.323248 28.7445L1.1693 29.5877L15.1292 15.6736L29.089 29.5877L29.9351 28.7445L15.9752 14.8304L29.9351 0.916296L29.089 0.072998Z" fill="#A46251"/>\n' +
            '        </svg>\n' +
            '    </div>\n' +
            '    <div class="popup-form-title">\n' +
            '        We help to decide what you want and advise on how to achieve this. <strong>Leave your phone number and we will call you back!</strong>\n' +
            '    </div>\n' +
            '        <form action=""  method="post" class="popup-form-js">\n' +
            '            <input type="text" name="f_name" class="popup-field" placeholder="Your name">\n' +
            '            <input type="text" name="f_phone" class="popup-field" placeholder="Phone">\n' +
            '            <input type="submit" class="popup-submit" value="Waiting for a call">\n' +
            '        </form>\n' +
            '</div></div>';
    }

    if (currentLang.includes('FR')) {
        formMarkup = '<div class="popup-form-wrapper"><div class="popup-form">\n' +
            '    <div class="close">\n' +
            '        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '            <path d="M29.089 0.072998L15.1292 13.9871L1.16929 0.072998L0.323242 0.916296L14.2831 14.8304L0.323248 28.7445L1.1693 29.5877L15.1292 15.6736L29.089 29.5877L29.9351 28.7445L15.9752 14.8304L29.9351 0.916296L29.089 0.072998Z" fill="#A46251"/>\n' +
            '        </svg>\n' +
            '    </div>\n' +
            '    <div class="popup-form-title">\n' +
            '        Nous aidons à décider ce que vous voulez et vous conseillons sur la manière de les réaliser. <strong>Laissez votre numéro de téléphone et nous vous rappellerons!</strong>\n' +
            '    </div>\n' +
            '        <form action="" method="post" class="popup-form-js">\n' +
            '            <input type="text" name="f_name" class="popup-field" placeholder="Votre nom">\n' +
            '            <input type="text" name="f_phone" class="popup-field" placeholder="Téléphone">\n' +
            '            <input type="submit" class="popup-submit" value="En attente d\'un appel">\n' +
            '        </form>\n' +
            '</div></div>';
    }

    $('body').append(formMarkup);

    // $('body').on('click', 'a.button:not(.no-trigger)', function (e) {
    //     e.preventDefault();
    //     $('body').find('.popup-form-wrapper').fadeIn();
    //     $('body').addClass('no-scroll');
    // });

    $('body').on('click', 'a.trigger-contact-form', function (e) {
        e.preventDefault();
        $('body').find('.popup-form-wrapper').fadeIn();
        $('body').addClass('no-scroll');
    });

    $('body').on('click', '.close', function (e) {
        e.preventDefault();
        $('body').removeClass('no-scroll');
        $('body').find('.popup-form-wrapper').fadeOut();
    });

    $('body').on('submit', '.popup-form-js', function (e) {
        e.preventDefault();
        let inputs = $(this).find('.popup-field');
        let filled = 0;
        inputs.each(function () {
            if ($(this).val()) {
                filled++;
            }
        });

        if (filled == 2) {
            $('body').find('.popup-form-title').fadeOut();
            $('body').find('.popup-form-js').fadeOut();
            if (!$('body').find('.thank-you-title').length) {

                if (currentLang.includes('FR')) {
                    $('body').find('.popup-form').append('<div class="popup-form-title"><h1 class="thank-you-title">Merci!</h1></div>');
                }

                if (currentLang.includes('EN')) {
                    $('body').find('.popup-form').append('<div class="popup-form-title"><h1 class="thank-you-title">Thank you!</h1></div>');
                }
            }
        } else {

            if (currentLang.includes('EN')) {
                if (!$('body').find('.form-submission-comment').length) {
                    $('body').find('.popup-form-title').append('<br><span class="red form-submission-comment">Please fill in all fields</span>');
                }
            }

            if (currentLang.includes('FR')) {
                if (!$('body').find('.form-submission-comment').length) {
                    $('body').find('.popup-form-title').append('<br><span class="red form-submission-comment">Remplissez tous les champs</span>');
                }
            }
        }
    });


});


var videos = document.getElementsByTagName("video");

// function checkScroll() {
//     var fraction = 0.8; // Play when 80% of the player is visible.
//
//     for(var i = 0; i < videos.length; i++) {
//
//         var video = videos[i];
//         var x = video.offsetLeft, y = video.offsetTop, w = video.offsetWidth, h = video.offsetHeight, r = x + w, //right
//             b = y + h, //bottom
//             visibleX, visibleY, visible;
//
//         visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
//         visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));
//
//         visible = visibleX * visibleY / (w * h);
//
//
//         console.log('visibleX' + visibleX);
//         console.log('visibleY' + visibleY);
//         console.log(w);
//         console.log(h);
//         console.log(visible);
//         console.log(fraction);
//
//         if(window.screen.width < 1024 ){
//             var fraction = 0.6; // Play when 80% of the player is visible.
//
//         }
//
//         if (visible > fraction) {
//             video.play();
//             console.log('play');
//         } else {
//             video.pause();
//             console.log('pause');
//         }
//
//     }
//
// }
//
// window.addEventListener('scroll', checkScroll, false);
// window.addEventListener('resize', checkScroll, false);

// Plugin isInViewport
!function (e, n) {
    "object" == typeof exports && "undefined" != typeof module ? n(require("jquery"), require("window")) : "function" == typeof define && define.amd ? define("isInViewport", ["jquery", "window"], n) : n(e.$, e.window)
}(this, function (e, n) {
    "use strict";

    function t(n) {
        var t = this;
        if (1 === arguments.length && "function" == typeof n && (n = [n]), !(n instanceof Array)) throw new SyntaxError("isInViewport: Argument(s) passed to .do/.run should be a function or an array of functions");
        return n.forEach(function (n) {
            "function" != typeof n ? (console.warn("isInViewport: Argument(s) passed to .do/.run should be a function or an array of functions"), console.warn("isInViewport: Ignoring non-function values in array and moving on")) : [].slice.call(t).forEach(function (t) {
                return n.call(e(t))
            })
        }), this
    }

    function o(n) {
        var t = e("<div></div>").css({ width: "100%" });
        n.append(t);
        var o = n.width() - t.width();
        return t.remove(), o
    }

    function r(t, i) {
        var a = t.getBoundingClientRect(), u = a.top, c = a.bottom, f = a.left, l = a.right,
            d = e.extend({ tolerance: 0, viewport: n }, i), s = !1, p = d.viewport.jquery ? d.viewport : e(d.viewport);
        p.length || (console.warn("isInViewport: The viewport selector you have provided matches no element on page."), console.warn("isInViewport: Defaulting to viewport as window"), p = e(n));
        var w = p.height(), h = p.width(), v = p[0].toString();
        if (p[0] !== n && "[object Window]" !== v && "[object DOMWindow]" !== v) {
            var g = p[0].getBoundingClientRect();
            u -= g.top, c -= g.top, f -= g.left, l -= g.left, r.scrollBarWidth = r.scrollBarWidth || o(p), h -= r.scrollBarWidth
        }
        return d.tolerance = ~~Math.round(parseFloat(d.tolerance)), d.tolerance < 0 && (d.tolerance = w + d.tolerance), l <= 0 || f >= h ? s : s = d.tolerance ? u <= d.tolerance && c >= d.tolerance : c > 0 && u <= w
    }

    function i(n) {
        if (n) {
            var t = n.split(",");
            return 1 === t.length && isNaN(t[0]) && (t[1] = t[0], t[0] = void 0), {
                tolerance: t[0] ? t[0].trim() : void 0,
                viewport: t[1] ? e(t[1].trim()) : void 0
            }
        }
        return {}
    }

    e = "default" in e ? e.default : e, n = "default" in n ? n.default : n,/**
     * @author  Mudit Ameta
     * @license https://github.com/zeusdeux/isInViewport/blob/master/license.md MIT
     */
        e.extend(e.expr[":"], {
            "in-viewport": e.expr.createPseudo ? e.expr.createPseudo(function (e) {
                return function (n) {
                    return r(n, i(e))
                }
            }) : function (e, n, t) {
                return r(e, i(t[3]))
            }
        }), e.fn.isInViewport = function (e) {
            return this.filter(function (n, t) {
                return r(t, e)
            })
        }, e.fn.run = t
});
//# isInViewport

// Play Video
$(function () {
    var $video = $('video');
    var $window = $(window);

    $window.scroll(function () {
        if ($video.length) {

            if ($video.is(":in-viewport")) {
                $video[0].play();
            } else {
                $video[0].pause();
            }
        }
    });
});