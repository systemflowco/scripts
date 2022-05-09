(() => {
    class Carousels {
        constructor(elem) {
            this.cards = elem;

            this.assignEvents();
        }

        assignEvents() {

         
            const sliderCss = document.createElement("link");
            sliderCss.src = "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css";

            document.head.appendChild(sliderCss);
            
            const sliderLink = document.createElement("script");
            sliderLink.src =
                "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.2/min/tiny-slider.js";
            sliderLink.id = "tiny-slider-script";

            document.head.appendChild(sliderLink);

            sliderLink.onload = ()=>{
                tns({
                    container:this.cards,
                    fixedWidth: 304,
                    slideBy: 1,
                    gutter:24,
                    loop:true,
                    edgePadding: 50,
                    swipeAngle: false,
                    controls:false,
                    nav:false,
                    autoplay:true,
                    autoplayTimeout: 1000,
                    autoplayHoverPause: true,
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
