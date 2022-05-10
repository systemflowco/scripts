(() => {
    class Carousels {
        constructor(elem) {
            this.cards = elem;
            this.container = $(">div", this.cards);
            this.slides = $(">div>div", this.cards);
            this.firstSlide = $(">div>div:first-of-type", this.cards);
            this.slidesNumber = this.slides.length;
            this.speed = this.slidesNumber * 2;
            this.animationStyle = document.createElement("style");
            this.carouselOn = false;
            this.assignEvents();
        }

        assignEvents() {
            // Please run it with window.onload, not with document.ready
            this.checkSmoothScrolling();
            $(window).on("resize", this.checkSmoothScrolling.bind(this));
        }

        checkSmoothScrolling() {
           
            // detect number of visible slides
            var slidesVisible = $(this.cards).width() / this.firstSlide.outerWidth(false);
            slidesVisible = Math.ceil(slidesVisible);

            // count slides to determine animation speed
            if (slidesVisible >= this.slidesNumber) {
                if(this.carouselOn){
                    this.clearSmoothScrolling();
                }
            } else {
                this.initSmoothScrolling(slidesVisible);
            }
        }

        initSmoothScrolling(n) {
            var animationWidth = 0;
            this.slides.each(function () {
                animationWidth += $(this).outerWidth(false);
            });

            // append the tail
            this.slides.slice(0, n).clone().appendTo(this.container);

            // Detect the slider width with appended tail
            var sliderWidth = 0;
            this.slides.each(function () {
                sliderWidth += $(this).outerWidth(false);
            });

            var sliderHeight = this.firstSlide.outerHeight(false);

            // set slider dimensions
            this.container.css({ width: sliderWidth, height: sliderHeight });

            this.animationStyle.innerHTML = `
            @keyframes smoothscroll { 0% { margin-left: 0px; } 100% { margin-left: -${animationWidth}px; } } 
            
            [data-sysflow-carousel]>div>div:first-of-type {-webkit-animation: smoothscroll ${this.speed} s linear infinite; -moz-animation: smoothscroll ${this.speed}s linear infinite; -ms-animation: smoothscroll ${this.speed}s linear infinite; -o-animation: smoothscroll ${this.speed}s linear infinite; animation: smoothscroll ${this.speed}s linear infinite; }`;

            // Insert styles to html
            this.appendAnimation();

            // restart the animation (e.g. for safari & ie)
            var cl = $(this.cards).attr("class");
            $(this.cards)
                .removeClass(cl)
                .animate({ nothing: null }, 1, function () {
                    $(this).addClass(cl);
                });

            this.carouselOn = true;
        }

        clearSmoothScrolling() {
            this.animationStyle.remove();
            var allSlides = $(this.container).children();
            console.log(allSlides);
            console.log(this.slidesNumber);
            console.log(allSlides.length);
            allSlides.slice(this.slidesNumber,allSlides.length).detach();
        }

        appendAnimation() {
            document.head.append(this.animationStyle);
        }
    }

    $(window).on("load", () => {
        const carousels = document.querySelectorAll("[data-sysflow-carousel]");

        if (carousels) {
            carousels.forEach((carousel) => {
                new Carousels(carousel);
            });
        }
    });
})();
