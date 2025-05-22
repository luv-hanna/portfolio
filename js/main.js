window.onload = function () {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const scrollContainer = document.querySelector("#scroll-container");
    const scrollbar = Scrollbar.init(scrollContainer, { damping: 0.05 });

    ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
            if (arguments.length) {
                scrollbar.scrollTop = value;
            }
            return scrollbar.scrollTop;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: scrollContainer.style.transform ? "transform" : "fixed"
    });

    scrollbar.addListener(ScrollTrigger.update);

    console.clear();

    document.fonts.ready.then(() => {
        document.querySelectorAll(".split").forEach((el) => {
            // SplitText 생성
            const split = new SplitText(el, {
                type: "words,lines",
                linesClass: "line"
            });

            // ScrollTrigger 애니메이션 연결
            gsap.from(split.lines, {
                scrollTrigger: {
                    trigger: el,
                    scroller: "#scroll-container",
                    start: "top 80%",
                    once: true,
                    markers: true,
                },
                duration: 0.6,
                yPercent: 100,
                opacity: 0,
                stagger: 0.1,
                ease: "expo.out"
            });
        });
    });

    // .section-01 profile line
    gsap.utils.toArray('.line').forEach((selector) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: selector,
                start: 'top 50%',
                end: 'top 60%',
                scrub: 1,
            }
        })
            .fromTo(selector, { opacity: 0, y: 100, }, { opacity: 1, y: 0, ease: 'none', duration: 5 }, 0)
    });


    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo("#img1", {
        width: ("300px"), height: () => {
            let img = document.querySelector("#img1"),
                wrapper = document.querySelector(".image"),
                ratio = img.naturalWidth / img.naturalHeight;
            return wrapper.offsetHeight * ratio * 0.5;
        }
    }, {
        width: "100%",
        height: () => {
            let img = document.querySelector("#img1"),
                wrapper = document.querySelector(".image"),
                ratio = img.naturalHeight / img.naturalWidth;
            return wrapper.offsetWidth * ratio;
        },
        duration: 2,
        delay: 1,
        scrollTrigger: {
            invalidateOnRefresh: true,
            trigger: ".image",
            start: "top top",
            end: "+=1500",
            pin: true,
            scrub: 1,
        }
    });


    const p = document.querySelector(".wrapper p");
    const words = p.innerText.split(" ");
    p.innerHTML = words.map(word => `<span class="word">${word} </span>`).join("");

    gsap.to(".word", {
        color: "#fff",
        y: 0,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".wrapper",
            start: "top 90%",
            end: "bottom 60%",
            scrub: true
        }
    });






};