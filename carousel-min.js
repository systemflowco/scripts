(()=>{class i{constructor(i){this.cards=i,this.animationSpeed=+i.dataset.sysflowCarousel,this.container=$(">div",this.cards),this.slides=$(">div>div",this.cards),this.firstSlide=$(">div>div:first-of-type",this.cards),this.slidesNumber=this.slides.length,this.speed=this.slidesNumber*this.animationSpeed,this.animationStyle=document.createElement("style"),this.carouselOn=!1,this.assignEvents()}assignEvents(){this.checkSmoothScrolling(),$(window).on("resize",this.checkSmoothScrolling.bind(this)),$(this.cards).on("mouseenter",this.stopScrolling.bind(this)),$(this.cards).on("mouseleave",this.checkSmoothScrolling.bind(this))}checkSmoothScrolling(){var i=$(this.cards).width()/this.firstSlide.outerWidth(!1);i=Math.ceil(i),console.log(i),this.carouselOn&&this.clearScrolling(),i<=this.slidesNumber&&this.initScrolling(i)}initScrolling(i){var s=0;this.slides.each(function(){s+=$(this).outerWidth(!1)}),this.slides.slice(0,i).clone().appendTo(this.container);var t=this.firstSlide.outerWidth(!1)*(this.slidesNumber+i),e=this.firstSlide.outerHeight(!1);this.container.css({width:t,height:e});var n=0,o=-s;this.animationStyle.innerHTML=`\n            @keyframes smoothscroll { 0% { margin-left: ${n}px; } 100% { margin-left: ${o}px; } } \n            \n            [data-sysflow-carousel]>div>div:first-of-type {-webkit-animation: smoothscroll ${this.speed}s linear infinite; -moz-animation: smoothscroll ${this.speed}s linear infinite; -ms-animation: smoothscroll ${this.speed}s linear infinite; -o-animation: smoothscroll ${this.speed}s linear infinite; animation: smoothscroll ${this.speed}s linear infinite; }`,this.startScrolling(),this.carouselOn=!0}clearScrolling(){$(this.cards).css("justify-content","center"),this.stopScrolling();var i=$(this.container).children();i.slice(this.slidesNumber,i.length).detach()}startScrolling(){$(this.cards).css("justify-content","flex-start"),document.head.append(this.animationStyle);var i=$(this.cards).attr("class");$(this.cards).removeClass(i).animate({nothing:null},1,function(){$(this).addClass(i)})}stopScrolling(){this.animationStyle.remove()}}$(window).on("load",()=>{const s=document.querySelectorAll("[data-sysflow-carousel]");s&&s.forEach(s=>{new i(s)})})})();