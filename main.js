// var swiperOptions = new Swiper('.slider1', {
//     loop: true,
//     nav:false,
//     autoplay: {
//       delay: 1,
//       disableOnInteraction: false
//     },
//     slidesPerView: 'auto',
//     speed: 2000,
//     grabCursor: true,
//     mousewheelControl: true,
//     keyboardControl: true,
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev"
//     }
//   });

//   var swiper = new Swiper(".swiper-container", swiperOptions);
// Noise Background
const noise = () => {
    let canvas, ctx;

    let wWidth, wHeight;

    let noiseData = [];
    let frame = 0;

    let loopTimeout;


    // Create Noise
    const createNoise = () => {
        const idata = ctx.createImageData(wWidth, wHeight);
        const buffer32 = new Uint32Array(idata.data.buffer);
        const len = buffer32.length;

        for (let i = 0; i < len; i++) {
            if (Math.random() < 0.5) {
                buffer32[i] = 0xff000000;
            }
        }

        noiseData.push(idata);
    };


    // Play Noise
    const paintNoise = () => {
        if (frame === 9) {
            frame = 0;
        } else {
            frame++;
        }

        ctx.putImageData(noiseData[frame], 0, 0);
    };


    // Loop
    const loop = () => {
        paintNoise(frame);

        loopTimeout = window.setTimeout(() => {
            window.requestAnimationFrame(loop);
        }, (1000 / 25));
    };


    // Setup
    const setup = () => {
        wWidth = window.innerWidth;
        wHeight = window.innerHeight;

        canvas.width = wWidth;
        canvas.height = wHeight;

        for (let i = 0; i < 10; i++) {
            createNoise();
        }

        loop();
    };


    // Reset
    let resizeThrottle;
    const reset = () => {
        window.addEventListener('resize', () => {
            window.clearTimeout(resizeThrottle);

            resizeThrottle = window.setTimeout(() => {
                window.clearTimeout(loopTimeout);
                setup();
            }, 200);
        }, false);
    };


    // Init
    const init = (() => {
        canvas = document.getElementById('noise');
        ctx = canvas.getContext('2d');

        setup();
    })();
};

noise();
// swiper slide 1
let SwiperTop = new Swiper('.swiper--top', {
    spaceBetween: 0,
    centeredSlides: true,
    speed: 5000,
    autoplay: {
        delay: 1,
    },
    loop: true,
    slidesPerView: 'auto',
    allowTouchMove: false,
    disableOnInteraction: true
});


// swiper slide 2
let SwiperScnd = new Swiper('.swiper--scnd', {
    spaceBetween: 0,
    centeredSlides: true,
    speed: 6000,
    autoplay: {
        delay: 1,
    },
    loop: true,
    slidesPerView: 'auto',
    allowTouchMove: false,
    disableOnInteraction: true
});

// swiper slide 3
let SwiperThrd = new Swiper('.swiper--thrd', {
    spaceBetween: 0,
    centeredSlides: true,
    speed: 4000,
    autoplay: {
        delay: 1,
    },
    loop: true,
    slidesPerView: 'auto',
    allowTouchMove: false,
    disableOnInteraction: true
});


// rotate image
$(function() {
    var rotation = 0,
        scrollLoc = $(document).scrollTop();
    $(window).scroll(function() {
        var newLoc = $(document).scrollTop();
        var diff = scrollLoc - newLoc;
        rotation += diff, scrollLoc = newLoc;
        var rotationStr = "rotate(" + rotation + "deg)";
        $(".gear").css({
            "-webkit-transform": rotationStr,
            "-moz-transform": rotationStr,
            "transform": rotationStr
        });
    });
});


$(function() {
    var rotation = 0,
        scrollLoc = $(document).scrollTop();
    $(window).scroll(function() {
        var newLoc = $(document).scrollTop();
        var diff = scrollLoc - newLoc;
        rotation += diff, scrollLoc = newLoc;
        var rotationStr = "rotate(" + rotation + "deg)";
        $(".gear-2").css({
            "-webkit-transform": rotationStr,
            "-moz-transform": rotationStr,
            "transform": rotationStr
        });
    });
});

// Running AOS Animation
AOS.init();
AOS.init({
    duration: 800,
    easing: 'ease',
    // once: true

});

// Scroll Animation
// $(document).ready(function() {
$(window).scroll(function() {
    if ($(window).scrollTop() > 80) {
        $('.text-row .row').css('transform', 'translate3d(-10.4374%, 0px, 0px)');
    } else if ($(window).scrollTop() > 200) {
        console.log('200');
        $('.text-row .row').css('transform', 'translate3d(-12.4374%, 0px, 0px)');
    } else if ($(window).scrollTop() > 300) {
        console.log('300');
        $('.text-row .row').css('transform', 'translate3d(-14.4374%, 0px, 0px)');
    } else {
        $('.text-row .row').css('transform', 'translate3d(-8.4374%, 0px, 0px)');
    }
});
// });





//  rotation around circule
var ElementRevolver = (function() {
    
    function getPosition(settings, ellapsedTime) {
        var angle = getAngle(settings, ellapsedTime);
        return {
            x: Math.round(settings.center.x + settings.radius * Math.cos(angle)),
            y: Math.round(settings.center.y + settings.radius * Math.sin(angle))
        };
    }
    
    function getAngle(settings, ellapsedTime) {
        return ellapsedTime / settings.interval * 2 * Math.PI * settings.direction - settings.startPositionRad;
    }
    
    function start(id, settings) {
        var el = document.getElementById(id),
            startTime = (new Date()).getTime(),
            width = el.offsetWidth,
            height = el.offsetHeight;
        if(el['#rev:tm'] !== null) stop(id);
        el.style.position = settings.cssPosition || 'absolute';
        if(!settings.startPositionRad) settings.startPositionRad = settings.startPositionDeg / 180 * Math.PI;
        el['#rev:tm'] = setInterval(function() {
            var pos = getPosition(settings, (new Date()).getTime() - startTime);
            el.style.left = (pos.x - Math.round(width / 2)) + 'px';
            el.style.top = (pos.y - Math.round(height / 2)) + 'px';
        }, settings.updateInterval);
        if(settings.iterations > -1) setTimeout(function() {
            stop(id);
        }, settings.iterations * settings.interval);
    }
    
    function stop(id) {
        var el = document.getElementById(id);
        if(el['#rev:tm'] === null) return;
        clearInterval(el['#rev:tm']);
        el['#rev:tm'] = null;
    }
    
    return {
        start: start,
        stop: stop
    };
    
})();

ElementRevolver.start('moveMe', {
    radius: 80,
    center: { x: 150, y: 150 },
    // time in milliseconds for one revolution
    interval: 1000,
    // direction = 1 for clockwise, -1 for counterclockwise
    direction: 1,
    // number of times to animate the revolution (-1 for infinite)
    iterations: -1,
    // startPosition can be a degree angle
    // (0 = right, 90 = top, 180 = left, 270 = bottom)
    startPositionDeg: 90,
    // how often (in milliseconds) the position of the
    // circle should be attempted to be updated
    updateInterval: 50
});