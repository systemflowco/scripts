(() => {
    class Carousels {
        constructor(elem) {
            this.cards = elem;

            this.assignEvents();
        }

        assignEvents() {

            const sliderLink = document.createElement("script");
            sliderLink.src =
                "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.2/min/tiny-slider.js";
            sliderLink.id = "tiny-slider-script";

            document.head.appendChild(sliderLink);

            sliderLink.onload = ()=>{
                tns({
                    container:this.cards,
                    fixedWidth: 280,
                    slideBy: 1,
                    gutter:24,
                    loop:true,
                    edgePadding: 50,
                    swipeAngle: false,
                    nav:false,
                    autoplay:true,
                    autoplayTimeout: 1000,
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
