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
            this.animationWidth = 0;
            this.carouselOn = false;
            this.assignEvents();
        }

        assignEvents() {
            this.checkScrolling();
            $(window).on("resize", this.checkScrolling.bind(this));
            $(this.cards).on("mouseenter", this.pauseScrolling.bind(this));
            $(this.cards).on("mouseleave", this.returnToScrolling.bind(this));
        }

        checkScrolling() {
            //if carousel was attached, remove it
            if (this.carouselOn) {
                this.clearScrolling();
            }

            // check width of slides
            this.slides.forEach((slide)=> {
                this.animationWidth += $(slide).outerWidth(false);
            });

            // if slides out of container start scrolling
            if (this.animationWidth > $(this.cards).width()) {
                this.initScrolling();
            }
        }

        initScrolling() {
            // append the tail
            this.slides.slice(0, this.slidesNumber).clone().appendTo(this.container);

            var sliderHeight = $(this.cards).outerHeight(false);

            // set slider dimensions
            this.container.css({ width: this.animationWidth*2, height: sliderHeight });

            this.animationStyle.innerHTML = `
            @keyframes smoothscroll { 0% { margin-left: -24px; } 100% { margin-left: -${
                this.animationWidth + 24
            }px; } } 
            
            [data-sysflow-carousel]>div>div:first-of-type {-webkit-animation: smoothscroll ${
                this.speed
            }s linear infinite; -moz-animation: smoothscroll ${
                this.speed
            }s linear infinite; -ms-animation: smoothscroll ${
                this.speed
            }s linear infinite; -o-animation: smoothscroll ${
                this.speed
            }s linear infinite; animation: smoothscroll ${this.speed}s linear infinite; }`;

            // Insert styles to html
            this.startScrolling();

            this.carouselOn = true;
        }

        clearScrolling() {
            $(this.cards).css("justify-content", "center");
            this.stopScrolling();
            var allSlides = $(this.container).children();
            allSlides.slice(this.slidesNumber, allSlides.length).detach();
        }

        startScrolling() {
            $(this.cards).css("justify-content", "flex-start");
            document.head.append(this.animationStyle);
            // restart the animation (e.g. for safari & ie)
            var cl = $(this.cards).attr("class");
            $(this.cards)
                .removeClass(cl)
                .animate({ nothing: null }, 1, function () {
                    $(this).addClass(cl);
                });
        }

        pauseScrolling() {
            if (this.animationStyle.innerHTML.indexOf("running") !== -1) {
                this.animationStyle.innerHTML = this.animationStyle.innerHTML.replace(
                    "running",
                    "paused"
                );
            } else {
                this.animationStyle.innerHTML += `[data-sysflow-carousel]>div>div:first-of-type {animation-play-state: paused;}`;
            }
        }

        returnToScrolling() {
            this.animationStyle.innerHTML = this.animationStyle.innerHTML.replace(
                "paused",
                "running"
            );
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
