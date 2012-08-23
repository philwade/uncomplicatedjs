(function($){

	var Slide = function(dom_slide){
		this.hide = function(){
			$(dom_slide).hide();
		}
		this.show = function(){
			$(dom_slide).show();
		}
	}

	var Slideshow = function(options){
			var defaults = $.extend({
				slide_class: '.slide',
				bullet_class: '.bullet',
			}, options);

			var current_slide = 0;
			var slides = [];

			$(defaults.slide_class).hide();
			$(defaults.slide_class).each(function(){
				slides.push(new Slide(this));
			});


		this._next = function() {
			slides[current_slide].hide();
			current_slide++;
			slides[current_slide].show();
		}

		this._previous = function() {
			slides[current_slide].hide();
			current_slide--;
			slides[current_slide].show();
		}

		return this;
	}

	$.fn.slideshow = function(options){
		show = Slideshow(options);
		//bind slides here

		return this;
	}
})(jQuery);
