(() => {
    class Carousels {
        constructor(elem) {
            this.cards = elem;

            this.assignEvents();
        }

        assignEvents() {
            console.log(this.cards);

            const sliderLink = document.createElement("script");
            sliderLink.src =
                "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.2/min/tiny-slider.js";
            sliderLink.id = "tiny-slider-script";

            document.head.appendChild(sliderLink);

            sliderLink.onload = ()=>{
                loveSlider=tns({
                    container:this.cards,
                    items:1,
                    slideBy:"page",
                    gutter:10,
                    nextButton:document.querySelector(".slider-arrow-right"),
                    prevButton:document.querySelector(".slider-arrow-left"),
                    loop:true,
                    autoplay:true,
                    navPosition:"bottom",
                    responsive:{640:{items:2},1020:{items:3}}
                })
            }
          



        }

     
    }

    const carousels = document.querySelectorAll("[data-sysflow-carousel]");

    if (carousels) {
        carousels.forEach((carousel) => {
            new Carousels(carousel);
        });
    }
})();
