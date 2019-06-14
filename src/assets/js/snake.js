(function ($) {

	$.fn.snakeify = function (options) {
		var settings = $.extend({
			inaccuracy: 30,
			speed: 200
		}, options);
		// this.find('.overlay').css({top: this.height()});
		// console.log(this.parent());

		this.mouseenter(function (e) {

			const container = $(this);
			const overlay = container.find('div[class^="overlay"]');
			const overlay2 = container.find('div[class^="image"]');
			const parentOffset = container.offset();
			const relX = e.pageX - parentOffset.left;
			const relY = e.pageY - parentOffset.top;
			const widthScreen = screen.width;

			if (widthScreen > 960) {
				//Entrance by right
				if (relX > container.width() - settings.inaccuracy) {
					overlay.addClass("overlay4-animation");
					overlay2.addClass("overlay4-animation-image");
				}
				//Entrance by left
				else if (relX < settings.inaccuracy) {
					overlay.addClass("overlay2-animation");
					overlay2.addClass("overlay2-animation-image");
				}
				//Entrance by top
				else if (relY < settings.inaccuracy) {
					overlay.addClass("overlay1-animation");
					overlay2.addClass("overlay1-animation-image");
				}
				//Entrance by bottom
				else if (relY > settings.inaccuracy) {
					overlay.addClass("overlay3-animation");
					overlay2.addClass("overlay3-animation-image");
				}
			}
			else {
				overlay.addClass("overlay4-animation");
				overlay2.addClass("overlay4-animation-image");
			}
		});
		this.click(function (e) {

			const container = $(this);
			const overlay = container.find('div[class^="overlay"]');
			const overlay2 = container.find('div[class^="image"]');
			const widthScreen = screen.width;

			if (widthScreen < 960 && overlay[0].className != 'overlay1 layout-align-space-around-stretch layout-row') {

				overlay.removeClass("overlay1-animation");
				overlay.removeClass("overlay2-animation");
				overlay.removeClass("overlay3-animation");
				overlay.removeClass("overlay4-animation");

				overlay2.removeClass("overlay1-animation-image");
				overlay2.removeClass("overlay2-animation-image");
				overlay2.removeClass("overlay3-animation-image");
				overlay2.removeClass("overlay4-animation-image");
			}
			else if (widthScreen < 960) {

				overlay.addClass("overlay4-animation");
				overlay2.addClass("overlay4-animation-image");
			}



		});
		this.mouseleave(function (e) {

			const container = $(this);
			const overlay = container.find('div[class^="overlay"]');
			const overlay2 = container.find('div[class^="image"]');

			overlay.removeClass("overlay1-animation");
			overlay.removeClass("overlay2-animation");
			overlay.removeClass("overlay3-animation");
			overlay.removeClass("overlay4-animation");

			overlay2.removeClass("overlay1-animation-image");
			overlay2.removeClass("overlay2-animation-image");
			overlay2.removeClass("overlay3-animation-image");
			overlay2.removeClass("overlay4-animation-image");
		});




	};
}(jQuery));

$('.snake').snakeify();