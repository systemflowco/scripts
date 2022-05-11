(() => {
    class Carousels {
        constructor(elem) {
            this.cards = elem;
            this.animationSpeed = +elem.dataset.sysflowCarousel;
            this.container = $(">div", this.cards);
            this.slides = $(">div>div", this.cards);
            this.firstSlide = $(">div>div:first-of-type", this.cards);
            this.slidesNumber = this.slides.length;
            this.speed = this.slidesNumber * this.animationSpeed;
            this.animationStyle = document.createElement("style");
            this.carouselOn = false;
            this.assignEvents();
        }

        assignEvents() {
            // Please run it with window.onload, not with document.ready
            this.checkSmoothScrolling();
            $(window).on("resize", this.checkSmoothScrolling.bind(this));
            $(this.cards).on("mouseenter", this.stopScrolling.bind(this));
            $(this.cards).on("mouseleave", this.checkSmoothScrolling.bind(this));
        }

        checkSmoothScrolling() {
            // detect number of visible slides
            var slidesVisible = $(this.cards).width() / this.firstSlide.outerWidth(false);
            slidesVisible = Math.ceil(slidesVisible);

            console.log(slidesVisible);
            if (this.carouselOn) {
                this.clearScrolling();
            }

            // count slides to determine animation speed
            if (slidesVisible <= this.slidesNumber) {   
                this.initScrolling(slidesVisible);
            }
        }

        initScrolling(n) {
            var animationWidth = this.firstSlide.outerWidth(false)*(this.slidesNumber);

            // append the tail
            this.slides.slice(0, n).clone().appendTo(this.container);

            // Detect the slider width with appended tail
            var sliderWidth = this.firstSlide.outerWidth(false)*(this.slidesNumber + n);

            var sliderHeight = this.firstSlide.outerHeight(false);

            // set slider dimensions
            this.container.css({ width: sliderWidth, height: sliderHeight });

            this.animationStyle.innerHTML = `
            @keyframes smoothscroll { 0% { margin-left: 0px; } 100% { margin-left: -${animationWidth}px; } } 
            
            [data-sysflow-carousel]>div>div:first-of-type {-webkit-animation: smoothscroll ${this.speed}s linear infinite; -moz-animation: smoothscroll ${this.speed}s linear infinite; -ms-animation: smoothscroll ${this.speed}s linear infinite; -o-animation: smoothscroll ${this.speed}s linear infinite; animation: smoothscroll ${this.speed}s linear infinite; }`;

            // Insert styles to html
            this.startScrolling();

            this.carouselOn = true;
        }

        clearScrolling() {
            $(this.cards).css('justify-content','center');
            this.stopScrolling();
            var allSlides = $(this.container).children();
            allSlides.slice(this.slidesNumber, allSlides.length).detach();
        }

        startScrolling() {
            $(this.cards).css('justify-content','flex-start');
            document.head.append(this.animationStyle);
            // restart the animation (e.g. for safari & ie)
            var cl = $(this.cards).attr("class");
            $(this.cards)
                .removeClass(cl)
                .animate({ nothing: null }, 1, function () {
                    $(this).addClass(cl);
                });
        }

        pauseScrolling(){
            var animationWidth = this.firstSlide.outerWidth(false)*(this.slidesNumber);

            this.animationStyle.innerHTML = `
            @keyframes smoothscroll { 0% { margin-left: 0px; } 100% { margin-left: -${animationWidth}px; } } 
            
            [data-sysflow-carousel]>div>div:first-of-type {-webkit-animation: smoothscroll ${10*this.speed}s linear infinite; -moz-animation: smoothscroll ${10*this.speed}s linear infinite; -ms-animation: smoothscroll ${10*this.speed}s linear infinite; -o-animation: smoothscroll ${10*this.speed}s linear infinite; animation: smoothscroll ${10*this.speed}s linear infinite; }`;

        }

        stopScrolling() {
            this.animationStyle.remove();
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
