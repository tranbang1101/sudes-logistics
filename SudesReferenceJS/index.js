let isloadIdex = 0;
$(window).on('scroll  mousemove touchstart',function(){
	try{
		if(!isloadIdex){
			isloadIdex = 1;
			$(document).ready(function ($) {
				var swiper_blogs = null;
				function initSwiperBlogs() {
					swiper_blogs = new Swiper('.swiper_blogs', {
						slidesPerView: 1,
						spaceBetween: 20,
						watchOverflow: true,
						slidesPerGroup: 1,
						grabCursor: true,
						navigation: {
							nextEl: '.swiper_blogs .swiper-button-next',
							prevEl: '.swiper_blogs .swiper-button-prev',
						},
						breakpoints: {
							640: {
								slidesPerView: 1,
								spaceBetween: 15
							},
							768: {
								slidesPerView: 2,
								spaceBetween: 20
							},
							992: {
								slidesPerView: 3,
								spaceBetween: 20
							},
							1024: {
								slidesPerView: 3,
								spaceBetween: 20
							},
							1200: {
								slidesPerView: 4,
								spaceBetween: 20
							},
							1500: {
								slidesPerView: 4,
								spaceBetween: 20
							}
						}
					});
				}
				function destroySwiperBlogs() {
					if (swiper_blogs) {
						swiper_blogs.destroy(true, true);
						swiper_blogs = null;
					}
				}
				function toggleSwiperBlogs() {
					if ($(window).width() <= 767 && swiper_blogs) {
						destroySwiperBlogs();
					} else if ($(window).width() > 767 && !swiper_blogs) {
						initSwiperBlogs();
					}
				}
				toggleSwiperBlogs();
				$(window).on('resize', function() {
					toggleSwiperBlogs();
				});
			});
		}
	}catch(e){
		console.log(e);
	}
});
function callbackFuncGroup(sectionName) {
	setTimeout(function(){
		awe_lazyloadImage();
		if(window.BPR && window.BPR.loadBadges){
			window.BPR.initDomEls()
			window.BPR.loadBadges()
		}
	},200);

}
function lazyBlockProduct(sectionName, rootMargin, callback) {
	awe_lazyloadImage();
	var section = $('.' + sectionName);
	var template = $('script[data-template="' + sectionName + '"]').html();
	var observer = new IntersectionObserver(function(entries) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				$('div[data-section="' + sectionName + '"]', entry.target).html(template);
				observer.unobserve(entry.target);
				callbackFuncGroup(sectionName);
				if (typeof callback === 'function') {
					callback();
				}
			}
		});
	}, { rootMargin: rootMargin });
	observer.observe(section.get(0));
}
function lazyBlockContent(sectionName, rootMargin, callback) {
	
	var section = $('.' + sectionName);
	var template = $('script[data-template="' + sectionName + '"]').html();
	var observer = new IntersectionObserver(function(entries) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				$('div[data-section="' + sectionName + '"]', entry.target).html(template);
				awe_lazyloadImage();
				observer.unobserve(entry.target);
				if (typeof callback === 'function') {
					callback();
				}
			}
		});
	}, { rootMargin: rootMargin });
	observer.observe(section.get(0));
}