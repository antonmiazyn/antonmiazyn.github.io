$(document).ready(function () {




    $('.menu-toggler-wrapper').click(function () {

        if ($('body').hasClass('menu-open')) {
            $('body').addClass('menu-close');
            setTimeout(function () {
                $('body').removeClass('menu-close menu-open');
            }, 800);
        } else {
            $('body').addClass('menu-open');
        }
    });







    var referrer_url = document.referrer;




    $('.sound_block').on('click', function () {
        if ($(this).hasClass('sound')) {
            $(this).removeClass('sound');
            $(this).prev('video').prop('muted', true);
        } else {
            $(this).addClass('sound');
            $(this).prev('video').volume = 0.4;
            $(this).prev('video').prop('muted', false);
        }
    });







    if (!referrer_url.includes('artetboiserie.fr')) {



        function stroleDecorLogoAnimation() {

            var path = document.querySelector('.logo-right-decor');
            var l = path.getTotalLength();
            var strokeLine = TweenMax.set(path, { strokeDasharray: l });
            TweenMax.fromTo(path, 9, { stroke: '#A46251', strokeDashoffset: l }, {
                strokeDashoffset: 0,
                stroke: '#A46251',
                delay: 1
            });

            var path2 = document.querySelector('.logo-left-decor');
            var l2 = path2.getTotalLength();
            var strokeLine2 = TweenMax.set(path2, { strokeDasharray: l2 });
            TweenMax.fromTo(path2, 9, { stroke: '#A46251', strokeDashoffset: l2 }, {
                strokeDashoffset: 0,
                stroke: '#A46251',
                delay: 1
            });
            let preloaderAnimItemParis13 = new TimelineMax();
            let preloaderAnimItemParis23 = new TimelineMax();
            preloaderAnimItemParis13.fromTo('.logo-left-decor', 3, {
                "opacity": 0,
                "transform": "translateY(25px) scale(.8)"
            }, { "opacity": 1, "transform": "translateY(0) scale(1)" });
            preloaderAnimItemParis23.fromTo('.logo-right-decor', 3, {
                "opacity": 0,
                "transform": "translateY(25px) scale(.8)"
            }, { "opacity": 1, "transform": "translateY(0) scale(1)" });
        }


        function roundDown(number, decimals) {
            decimals = decimals || 0;
            return (Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals));
        }

        function drawLogoDecor() {

            let letterLeft = document.querySelector('.logo-left-decor');
            console.log(letterLeft);
            let letterLeftD = letterLeft.getAttribute('d');
            letterLeft.setAttribute('d', '');
            letterLeftD = letterLeftD.split(',');
            console.log(letterLeftD);
            let letterRight = document.querySelector('.logo-right-decor');
            let letterRightD = letterRight.getAttribute('d');
            letterRight.setAttribute('d', '');
            letterRightD = letterRightD.split(',');
            let rightDecorIteration = 1400 / letterRightD.length;
            let leftDecorIteration = 1400 / letterLeftD.length;
            console.log(roundDown(rightDecorIteration));
            console.log(roundDown(leftDecorIteration));
            console.log(letterRightD);
            let leftCurrIteration = 0;
            let rightCurrIteration = 0;
            // document.querySelector('.logo-right-decor').classList.remove('opacity-0');
            // document.querySelector('.logo-left-decor').classList.remove('opacity-0');
            setTimeout(function () {

                let leftDrawDecorIntervalAnimation = setInterval(function () {
                    let currentLeftD = letterLeft.getAttribute('d');
                    if (leftCurrIteration == 0) {
                        letterLeft.setAttribute('d', letterLeftD[leftCurrIteration]);
                    } else {
                        letterLeft.setAttribute('d', currentLeftD + ',' + letterLeftD[leftCurrIteration]);
                    }
                    if (leftCurrIteration + 1 == letterLeftD.length) {
                        clearInterval(leftDrawDecorIntervalAnimation);
                    }
                    leftCurrIteration++;

                }, leftDecorIteration);

                let rightDrawDecorIntervalAnimation = setInterval(function () {
                    let currentRightD = letterRight.getAttribute('d');
                    if (rightCurrIteration == 0) {
                        letterRight.setAttribute('d', letterRightD[rightCurrIteration]);
                    } else {
                        letterRight.setAttribute('d', currentRightD + ',' + letterRightD[rightCurrIteration]);
                    }
                    if (rightCurrIteration + 1 == letterRightD.length) {
                        clearInterval(rightDrawDecorIntervalAnimation);
                    }
                    rightCurrIteration++;

                }, rightDecorIteration);
            }, 3000);

        }

        // drawLogoDecor();


        var animationIteation = 0;
        let preloaderAnim = setInterval(function () {
            animationIteation++;
            let animationIteationNumber = animationIteation;
            let preloaderAnimItem = new TimelineMax();

            //preloaderAnimItem.fromTo('.logo-item-' + animationIteationNumber, .2, { "opacity": 0 }, { "opacity": 1 });



            for (let animationIteationNumber = 0; animationIteationNumber < 13; animationIteationNumber++) {
                setTimeout(function timer() {
                    $('.logo-item-' + animationIteationNumber).css('opacity', '1');
                }, animationIteationNumber * 90);
            }

            if (animationIteation == 8) {
                let preloaderAnimItemParis1 = new TimelineMax();
                let preloaderAnimItemParis2 = new TimelineMax();
                preloaderAnimItemParis1.fromTo('.logo-left-decor', 3, { "opacity": 0 }, { "opacity": 1 });
                preloaderAnimItemParis2.fromTo('.logo-right-decor', 3, { "opacity": 0 }, { "opacity": 1 });
            }
            if (animationIteation == 28) {
                clearInterval(preloaderAnim);
            }
            if (animationIteation == 10) {
                stroleDecorLogoAnimation();
                let preloaderAnimItemParisWord = new TimelineMax();
                preloaderAnimItemParisWord.fromTo('.paris-word', 2, {
                    "opacity": 0,
                    "transform": "translateY(4px) scale(.9)"
                }, { "opacity": 1, "transform": "translateY(0) scale(1)" });

            }
        }, 150);
        jQuery('.hero').fadeOut();

        function removePreloader() {
            setTimeout(function () {


                jQuery('.preloader').fadeOut(2000);
                jQuery('.hero').fadeIn(2000);


                // var sdfsdfsdfsdfsdf = new TimelineMax();
                // sdfsdfsdfsdfsdf.fromTo(".hero .title", 1, {"opacity": 0, "transform": "translateY(-20px)"}, {"opacity": 1, "transform": "translateY(0)"});



                setTimeout(function () {
                    jQuery('.preloader').hide();


                    //$('.hero .container').fadeIn(2000);
                    // var GSAPheroTitleAppearence = new TimelineMax();
                    // GSAPheroTitleAppearence.fromTo(".hero .container", 1, {"opacity": 0, "transform": "scale(.95)"}, {"opacity": 1, "transform": "scale(1)"});

                }, 1500);



                let GSAPsliderChangeImage = new TimelineMax();
                GSAPsliderChangeImage.fromTo(".hero .swiper-slide img", 8, { "transform": "scale(1)" }, { "transform": "scale(1.1)" });

            }, 4500);
        }


        var tl = new TimelineMax();

        var tl1231231245656 = new TimelineMax();
        var tl22 = new TimelineMax({
            onComplete: removePreloader
        });


        let preloaderAnimItemParis135 = new TimelineMax();
        let preloaderAnimItemParis235 = new TimelineMax();

        preloaderAnimItemParis135.fromTo('.st1', 3, { "transform": "translateY(25px) scale(.8)" }, { "transform": "translateY(0) scale(1)" });
        preloaderAnimItemParis235.fromTo('.st0:not(.logo-right-decor,.logo-left-decor)', 3, { "transform": "translateY(25px) scale(.8)" }, { "transform": "translateY(0) scale(1)" });



        //start incialization main swiper slider
        if ($(".swiper-container").length) {

            setTimeout(function () {

                const swiperHero = new Swiper('.swiper-container', {
                    allowTouchMove: false,
                    initialSlide: 0,

                    fadeEffect: { crossFade: true },
                    slidesPerView: 1,
                    speed: 4000,

                    virtualTranslate: true,
                    loop: true,
                    effect: "fade",

                    autoplay: {
                        enabled: true,
                        delay: 4000,
                        disableOnInteraction: false
                    },
                    navigation: {
                        // nextEl: '.swiper-button-next',
                        // prevEl: '.swiper-button-prev',
                    },
                });



                swiperHero.on("init", function () {
                    //$(".hero .container").fadeOut();
                    $(".hero .swiper-button-next").fadeOut();
                    $(".hero .swiper-button-prev").fadeOut();

                });

                swiperHero.on('slideChange', function () {

                    $('.hero .container').fadeIn(2000);
                    $('body.front-page').removeAttr('style');
                    $('video').each(function () {
                        $(this).get(0).pause();
                        $(this).get(0).currentTime = 0;
                    });

                    let curSlide = this.slides[this.activeIndex];
                    const currentSlide = swiperHero.slides[curSlide]
                    active_slide = swiperHero.activeIndex - 1;
                    //console.log(swiperHero.activeIndex);

                    active_slide_html = $('.swiper-slide[data-swiper-slide-index="' + active_slide + '"]').html();
                    console.log(active_slide);
                    if ($('.swiper-slide[data-swiper-slide-index="' + active_slide + '"]').children("video").length > 0) {



                        var playPromise = $('.swiper-slide[data-swiper-slide-index="' + active_slide + '"]').children("video")[0].play();




                    }

                    $('.swiper-slide').each(function () {

                        if ($(this).attr('data-swiper-slide-index') == curSlide) {
                            //console.log($(this).html());
                        }
                    })

                    if ($('.swiper-slide-active').hasClass('swiper-slide-video')) {

                    }
                    //alert(swiperHero.activeIndex);
                    if (swiperHero.activeIndex == 0) {


                    }




                    $('.hero .swiper-slide').not('.swiper-slide-active').find('img').fadeOut();
                    $('.hero .swiper-slide').find('img').fadeIn();




                    let GSAPsliderChangeImage = new TimelineMax();
                    GSAPsliderChangeImage.fromTo(
                        ".hero .swiper-slide:not(.swiper-slide-active) img",
                        8,
                        { transform: "scale(1)" },
                        { transform: "scale(1.10)" }
                    );
                    if (swiperHero.activeIndex == 0) {

                    } else {

                    }
                });

                var tmp_summ_slide = 9;
                console.log('tmp_summ_slide=' + tmp_summ_slide);

                $('.swiper-button-next').on('click', function () {
                    swiperHero.slideTo(swiperHero.activeIndex + 1);
                    console.log('активний слайд=' + swiperHero.activeIndex);
                });
                $('.swiper-button-prev').on('click', function () {
                    swiperHero.slideTo(swiperHero.activeIndex - 1);

                });


                $(".hero .swiper-button-next").click(function () {
                    // alert(swiperHero.activeIndex);
                    if (swiperHero.activeIndex == 0) {

                    }
                });


            }, 2500);

        }

        //end incialization main swiper slider





    } else {
        //Умова знаходження користувача на сайті


        $('.hero .container').fadeIn(2000);
        $('.hero .swiper-slide').find('img').fadeIn();


        //start incialization main swiper slider
        if ($(".swiper-container").length) {

            setTimeout(function () {

                const swiperHero = new Swiper('.swiper-container', {
                    allowTouchMove: false,
                    initialSlide: 0,

                    fadeEffect: { crossFade: true },
                    slidesPerView: 1,
                    speed: 4000,

                    virtualTranslate: true,
                    loop: true,
                    effect: "fade",

                    autoplay: {
                        enabled: true,
                        delay: 4000,
                        disableOnInteraction: false
                    },
                    navigation: {
                        // nextEl: '.swiper-button-next',
                        // prevEl: '.swiper-button-prev',
                    },
                });



                swiperHero.on("init", function () {
                    //$(".hero .container").fadeOut();
                    $(".hero .swiper-button-next").fadeOut();
                    $(".hero .swiper-button-prev").fadeOut();

                });

                swiperHero.on('slideChange', function () {

                    $('.hero .container').fadeIn(2000);
                    $('body.front-page').removeAttr('style');
                    $('video').each(function () {
                        $(this).get(0).pause();
                        $(this).get(0).currentTime = 0;
                    });

                    let curSlide = this.slides[this.activeIndex];
                    const currentSlide = swiperHero.slides[curSlide]
                    active_slide = swiperHero.activeIndex - 1;
                    //console.log(swiperHero.activeIndex);

                    active_slide_html = $('.swiper-slide[data-swiper-slide-index="' + active_slide + '"]').html();
                    console.log(active_slide);
                    if ($('.swiper-slide[data-swiper-slide-index="' + active_slide + '"]').children("video").length > 0) {



                        var playPromise = $('.swiper-slide[data-swiper-slide-index="' + active_slide + '"]').children("video")[0].play();




                    }

                    $('.swiper-slide').each(function () {

                        if ($(this).attr('data-swiper-slide-index') == curSlide) {
                            //console.log($(this).html());
                        }
                    })

                    if ($('.swiper-slide-active').hasClass('swiper-slide-video')) {

                    }
                    //alert(swiperHero.activeIndex);
                    if (swiperHero.activeIndex == 0) {


                    }




                    $('.hero .swiper-slide').not('.swiper-slide-active').find('img').fadeOut();
                    $('.hero .swiper-slide').find('img').fadeIn();




                    let GSAPsliderChangeImage = new TimelineMax();
                    GSAPsliderChangeImage.fromTo(
                        ".hero .swiper-slide:not(.swiper-slide-active) img",
                        8,
                        { transform: "scale(1)" },
                        { transform: "scale(1.10)" }
                    );
                    if (swiperHero.activeIndex == 0) {

                    } else {

                    }
                });

                var tmp_summ_slide = 9;
                console.log('tmp_summ_slide=' + tmp_summ_slide);

                $('.swiper-button-next').on('click', function () {
                    swiperHero.slideTo(swiperHero.activeIndex + 1);
                    console.log('активний слайд=' + swiperHero.activeIndex);
                });
                $('.swiper-button-prev').on('click', function () {
                    swiperHero.slideTo(swiperHero.activeIndex - 1);

                });


                $(".hero .swiper-button-next").click(function () {
                    // alert(swiperHero.activeIndex);
                    if (swiperHero.activeIndex == 0) {

                    }
                });


            }, 2);

        }

        //end incialization main swiper slider




        jQuery('.preloader').remove();
        jQuery('.hero').fadeIn(2000);



        setTimeout(function () {

            // var GSAPheroTitleAppearence = new TimelineMax();
            // GSAPheroTitleAppearence.fromTo(".hero .container", 1, {"opacity": 0, "transform": "scale(.95)"}, {"opacity": 1, "transform": "scale(1)"});

        }, 1500);

        //$('.hero .swiper-slide').not('.swiper-slide-active').find('img').fadeOut();



        let GSAPsliderChangeImage = new TimelineMax();
        GSAPsliderChangeImage.fromTo(".hero .swiper-slide img", 8, { "transform": "scale(1)" }, { "transform": "scale(1.1)" });

    }


});