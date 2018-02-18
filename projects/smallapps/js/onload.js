var screenSize = document.body.clientWidth;

if ( screenSize > 1024 ) {

	/*animation effects*/

	window.onload = function () {
		var hand = document.querySelector("header .wrapper img").style.opacity = 1;
		var header = document.querySelector(".performance").style.left = 0;
	}

	/*--------------------*/

	window.onscroll = function () {
		var scrolled = document.body.scrollTop;
		if ( scrolled > 300 ) {
			var featuresTitle = document.querySelector("#features .wrapper h1").style.opacity = 1;
			var featuresParagraph = document.querySelector("#features .wrapper .description").style.left = 0;
		} 

		if ( scrolled > 1450 ) {
			var learn = document.querySelector("#learn .wrapper .aligner .learn-info").style.left = 0;
		}

		if ( scrolled > 2200 ) {
			var galleryTitle = document.querySelector("#gallery .wrapper h1").style.opacity = 1;
			var galleryParagraph = document.querySelector("#gallery .wrapper .description").style.left = 0;
		} 

		if ( scrolled > 3350 ) {
			var info = document.querySelector("#info .wrapper .aligner .learn-info").style.top = 0;
		}

		if ( scrolled > 4250 ) {
			var reportTitle = document.querySelector("#report .wrapper h1").style.opacity = 1;
		}

		if ( scrolled > 4500 ) {
			var social = document.querySelector("footer .wrapper .social").style.opacity = 1;
		}
	}

}
