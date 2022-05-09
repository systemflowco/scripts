(() => {
    class Carousels {
        constructor(elem) {
            this.cards = elem;

            this.assignEvents();
        }

        assignEvents() {

         
            const sliderCss = document.createElement("link");
            sliderCss.setAttribute("rel", "stylesheet");
            sliderCss.setAttribute("as", "style");
            sliderCss.href = "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css";

            document.head.appendChild(sliderCss);

            const sliderLink = document.createElement("script");
            sliderLink.src =
                "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.2/min/tiny-slider.js";

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
                    controls:false,
                    autoplay:true,
                    speed: 1000,
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
