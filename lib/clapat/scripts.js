jQuery(function ($) {
  $(document).ready(function () {
    "use strict";

    
    ScrollEffects();

    ShowcaseSnapSlider();
  });

  /*--------------------------------------------------
	Function Cleanup Before Ajax
---------------------------------------------------*/

 

  /*--------------------------------------------------
Function Showcase Snap Slider
---------------------------------------------------*/

  function ShowcaseSnapSlider() {
    if ($(".snap-slider-holder").length > 0) {
      // Selectors and utilities
      const snapSliderHolder = document.querySelector(".snap-slider-holder");
      const snapSlides = gsap.utils.toArray(".snap-slide");
      const snapCaptionWrapper = document.querySelector(
        ".snap-slider-captions"
      );
      const snapCaptions = gsap.utils.toArray(".snap-slide-caption");
      const snapThumbsWrapper = document.querySelector(".snap-slider-thumbs");
      const snapThumbs = gsap.utils.toArray(".thumb-slide");
      const snapThumbImg = gsap.utils.toArray(".thumb-slide img");

      // Pin and animate thumbnails
      ScrollTrigger.create({
        trigger: snapSlides,
        start: "top top",
        end: () => "+=" + innerHeight * (snapSlides.length - 1),
        pin: snapThumbsWrapper,
        scrub: true,
      });

      gsap.fromTo(
        snapThumbs,
        { y: 0 },
        {
          y: -snapThumbs[0].offsetHeight * (snapThumbs.length - 1),
          scrollTrigger: {
            trigger: snapSliderHolder,
            scrub: true,
            start: "top top",
            end: "+=" + innerHeight * (snapSlides.length - 1),
          },
          ease: "none",
        }
      );

      // Pin and animate captions
      ScrollTrigger.create({
        trigger: snapCaptionWrapper,
        start: "top top",
        end: () => "+=" + innerHeight * (snapSlides.length - 1),
        pin: true,
        scrub: true,
      });

      gsap.fromTo(
        //이미지만 넘어가네
        snapCaptions,
        { y: 0 },
        {
          y: -snapCaptions[0].offsetHeight * (snapCaptions.length - 1),
          scrollTrigger: {
            trigger: snapSliderHolder,
            scrub: true,
            start: "top top",
            end: "+=" + innerHeight * (snapSlides.length - 1),
          },
          ease: "none",
        }
      );

      // Set initial heights for slides //반동을 주네?
      gsap.set(snapSlides, { height: window.innerHeight });

      // Create snapping effect
      const snapPoints = gsap.utils.snap(1 / (snapSlides.length - 1));
      ScrollTrigger.create({
        trigger: snapSlides,
        start: "top top",
        end: "+=" + innerHeight * (snapSlides.length - 1),
        snap: {
          snapTo: snapPoints,
          duration: { min: 0.2, max: 0.7 },
          delay: 0,
          ease: "power4.inOut",
        },
      });

      // Animate image transitions within slides //부드럽게 넘어가네 : 하수정
      snapSlides.forEach((slide, i) => {
        const imageWrappers = slide.querySelectorAll(".img-mask");
        const isLastSlide = i === snapSlides.length - 1;
        const isFirstSlide = i === 0;

        gsap.fromTo(
          imageWrappers,
          { y: isFirstSlide ? 0 : -window.innerHeight },
          {
            y: isLastSlide ? 0 : window.innerHeight,
            scrollTrigger: {
              trigger: slide,
              scrub: true,
              start: isFirstSlide ? "top top" : "top bottom",
              end: isLastSlide ? "top top" : undefined,
            },
            ease: "none",
          }
        );

        if (snapThumbImg[i]) {
          gsap.fromTo(
            snapThumbImg[i],
            { y: isFirstSlide ? 0 : -snapThumbImg[i].offsetHeight / 2 },
            {
              y: isLastSlide ? 0 : snapThumbImg[i].offsetHeight / 2,
              scrollTrigger: {
                trigger: slide,
                scrub: true,
                start: isFirstSlide ? "top top" : "top bottom",
                end: isLastSlide ? "top top" : undefined,
              },
              ease: "none",
            }
          );
        }
      }); ////부드럽게 넘어가네 끝 : 하수정

      // Snap Slider Project Load Events
    }
  } //End Showcase Parallax
});
window.ScrollEffects = function () {
  //필요함 : 하수정

  if (document.body.classList.contains("smooth-scroll")) {
    const ScrollArea = document.querySelector("#content-scroll");

    // Config

    // Initialise
    var scrollbar = Scrollbar.init(ScrollArea /*ScrollbarOptions*/);

    ScrollTrigger.scrollerProxy("#content-scroll", {
      scrollTop(value) {
        if (arguments.length) {
          scrollbar.scrollTop = value;
        }
        return scrollbar.scrollTop;
      },
    });

    scrollbar.addListener(ScrollTrigger.update);
    ScrollTrigger.defaults({ scroller: ScrollArea });
  } // End Smooth Scroll

 
}; // End Scroll Effects
