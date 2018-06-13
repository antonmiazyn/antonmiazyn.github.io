/*animation*/

/*-----*/

window.onload = function () {
    
    setTimeout( function () { 
        
        var hero = document.querySelector(".hero-cover");

        var heroes = document.querySelector(".hero-content").children;

        for (var c = 0; c < heroes.length; c++) {
            heroes[c].classList.add("left-animate");
        }

        hero.classList.add("bg-serenity_1");
    
        var preloader = document.querySelector(".preloader");
        preloader.style.display = "none";
        
    }, 6000);
}

/*-----*/

function servicesAnimate() {
    var services = document.querySelector(".services-content");
    
    var servicesElements = document.querySelectorAll(".services-block");
    
    for (var q = 0; q < servicesElements.length; q++) {
        servicesElements[q].classList.add("opacity-change");
    }
    
    var servicesForm = document.querySelector(".order-form").classList.add("opacity-change");
    
    services.classList.add("bg-serenity_3");
    
    servicesM = false;
}

var servicesH = document.querySelector("#services").offsetTop;

var servicesM = true;

/*-----*/

var works = document.querySelector(".portfolio-content");

var worksH = works.offsetTop;

function worksAnimate() {
    
    var worksElements = document.querySelector(".jcarousel-wrapper");
    
    var worksButton = document.querySelector(".other-works");
    
    worksElements.classList.add("left-animate");
    worksButton.classList.add("left-animate");
    
    works.classList.add("bg-serenity_4");
    
    worksM = false;
}

var worksM = true;

/*-----*/

var contact = document.querySelector(".contact-content");

var contactH = contact.offsetTop;

function contactAnimate() {
    
    var contactList = document.querySelector(".contact-list");
    
    var contactMap = document.querySelector(".map-wrapper");
    
    contactList.classList.add("left-animate");
    contactMap.classList.add("left-animate");
    
    contact.classList.add("bg-serenity_5");
    
    contactM = false;
}

var contactM = true;

/*stats digits*/

var stats = document.querySelector("#team");

var statsH = stats.offsetTop;

var statsM = true;

function digitsUpA() {
    
    var nums = [4, 162, 158, 17];
    
    var a = 0;
    
    var statsDigits = document.querySelectorAll(".stats-number");
    
    var intervalLink = setInterval(function () {
        
        a++;
        
        var flag = true;

        for (var i = 0; i < nums.length; i++) {
            if (a <= nums[i]) {
                statsDigits[i].innerHTML = a;

                if (a < nums[i]) {
                    flag = false;
                }
                
            }
        }

        if (flag) {
            clearInterval(intervalLink);
        }
        
    }, 20);
    
    statsM = false;

}

function bgChangeA() {
    stats.classList.add("bg-serenity_2");
    
    statsM = false;
}

/*do*/

window.onscroll = function () {
    var pageH = pageYOffset + 342;
    
    if (statsM) {
        
        if (pageH >= statsH) {
            digitsUpA();
            bgChangeA();
        }
        
    }
    
    if (servicesM) {
        
        if (pageH >= servicesH) {
            servicesAnimate();
        }
        
    }
    
    if (worksM) {
        
        if (pageH >= worksH) {
            worksAnimate();
        }
        
    }
    
    if (contactM) {
        
        if (pageH >= contactH) {
            contactAnimate();
        }
        
    }
    
    if (pageYOffset > 100) {
        topline.style.opacity = ".85";      
    } else {
        topline.style.opacity = "1";
    }
    
    if (pageYOffset > 1400 && pageYOffset < 2430) {
        bottomline.style.position = "fixed";
        bottomline.style.bottom = "0";
        bottomline.style.left = "0";
        bottomline.style.right = "0";
        bottomline.style.opacity = ".85";      
    } else {
        bottomline.style.opacity = "1";
        bottomline.style.position = "static";
    }
    
}

/*services digits*/
