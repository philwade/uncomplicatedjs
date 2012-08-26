(function($){

	var Slide = function(dom_slide, bullet_class){

		var has_bullets = false;
		var current_bullet = 0;
		var bullets = [];

		this.hide = function(){
			$(dom_slide).hide();
		}
		this.show = function(){
			$(dom_slide).show();
		}

		this.nextBullet = function(){
			$(bullets[current_bullet]).show();
			current_bullet++;
		}

		this.previousBullet = function(){
			$(bullets[current_bullet]).hide();
			current_bullet--;
		}

		this.hasNextBullet= function(){
			if(!has_bullets || (current_bullet + 1) > bullets.length)
			{
				return false;
			}
			return true;
		}

		if($(dom_slide).find(bullet_class).length > 0)
		{
			has_bullets = true;

			$(dom_slide).find(bullet_class).each(function(){
				$(this).hide();
				bullets.push(this);
			});
		}
	}

	var Slideshow = function(options){

		var defaults = $.extend({
			slide_class: '.slide',
			bullet_class: '.bullet',
		}, options);

		var current_slide = 0;
		var slides = [];

		this.init = function() {
			$(defaults.slide_class).hide();
			$(defaults.slide_class).each(function(){
				slides.push(new Slide(this, defaults.bullet_class));
			});

			slides[0].show();

			$(document).keydown(function(e){
				if(e.which == 39 || e.which == 32)
				{
					_next();
				}

				if(e.which == 37)
				{
					_previous();
				}
			});
		}

		this._next = function() {
			if(slides[current_slide].hasNextBullet())
			{
				slides[current_slide].nextBullet();
				return;
			}

			if(typeof slides[current_slide + 1] !== 'undefined')
			{
				slides[current_slide].hide();
				current_slide++;
				slides[current_slide].show();
			}
		}

		this._previous = function() {

			if(current_slide >= 1)
			{
				slides[current_slide].hide();
				current_slide--;
				slides[current_slide].show();
			}
		}

		return this;
	}

	$.fn.slideshow = function(options){
		show = Slideshow(options);
		show.init();

		return this;
	}
})(jQuery);
