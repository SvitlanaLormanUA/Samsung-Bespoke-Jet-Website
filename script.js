document.addEventListener('DOMContentLoaded', function () {
  const swiperTexts = document.querySelectorAll('.swiper-txt');
  const images = [
    '/assets/Vacuum Placeholder.png',
    '/assets/Image-2.png',
    '/assets/Image-3.png',
    '/assets/Image-4.png',
    '/assets/Vacuum Placeholder.png',
  ];
  const textIndex = document.querySelector('#idex-swiper-num'); 
  const pictureAd = document.querySelector('#picture-ad');
  let currentIndex = 0;
  let autoSlideInterval;

  function updateContent(index) {
    swiperTexts.forEach((txt, idx) => {
      txt.style.opacity = idx === index ? 1 : 0;
    });
    gsap.to(pictureAd, {
      x: '-1%',
      duration: 1,
      onComplete: () => {
        pictureAd.style.transition = 'none';
        pictureAd.src = images[index];
      //pictureAd.style.transform = 'translateX(1%)';

        gsap.to(pictureAd, {
          x: '1%',
          duration: 1,
        });
      },
    });

    // Оновлення індексу
    textIndex.textContent = `${index + 1}/${images.length}`;
  }

  function changeSlide(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    updateContent(currentIndex);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      changeSlide(1);
    }, 3000); 
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  startAutoSlide();
  updateContent(currentIndex);

  document.getElementById('next-btn').addEventListener('click', () => {
    stopAutoSlide();
    changeSlide(1);
  });

  document.getElementById('prev-btn').addEventListener('click', () => {
    stopAutoSlide();
    changeSlide(-1);
  });
});


const createTimeline = () => {
  const maxWidth = 1710; 
  const currentWidth = window.innerWidth;
  const scaleFactor = Math.min(currentWidth / maxWidth, 1.5); 

  const timeline = gsap.timeline({
    defaults: { duration: 1.5, ease: "power3.out" }
  });

  timeline.fromTo(
    "#samsung-logo",
    { x: "-100%", opacity: 0 }, 
    { 
      x: `${ currentWidth < 768 ? 94 : 22 * scaleFactor}%`,
      opacity: 1,
   
    }
  );

  timeline.fromTo(
    ".bespoke-jet-text-huge ",
    { x: "-100%", opacity: 0 },
    {
      x: `${-25 * scaleFactor}%`,  
     
      opacity: 1
    },
    "<" 
  );

  timeline.fromTo(
    ".moving-text p",
    { x: "-100%", opacity: 0 },
    {
      x: `${currentWidth < 768 ? 50 : 10 * scaleFactor}%`,
   
      opacity: 1,
      stagger: {
     
        amount: 0.5,
        from: "start",
        ease: "power3.out"
      }
    }
  );

  timeline.fromTo(
    "#samsung-logo",
    { y: 0 }, 
    {
      y:   -70 * scaleFactor,
      ease: "power3.out"
    },
    "<"
  );
  timeline.to(
    ".bespoke-jet-text-huge h1, .bespoke-jet-text-huge .ord-text",
    {
      display: "none",
    },
    "<" 
  );
  timeline.to(
    "#picture-ad",
    { 
      scaleX: 0.5, 
      transformOrigin: "right", 
      duration: 1.5,
      border: "2px solid black",
    },
    "<" 
  );
  timeline.to(
    ".swiper",
    { 
     display: "block",
    },
  );
  timeline.to(
    ".swiper-buttons",
    { 
     display: "flex",
    },
 
  );


  timeline.to (
    "#tiny-descr",
    {
      width: `${currentWidth < 768 ? "15em" : "100%"}`,
      color: "black",
      bottom: 0,
      marginLeft: `${currentWidth < 768 ? "8em" : "20em"}`,
      left: `${currentWidth < 768 ? "0%" : "6%"}`,
    }
  );

  return timeline;
};

let timeline = createTimeline();

const button = document.querySelector("#trigger");
button.addEventListener("click", () => {
  timeline.timeScale(4); 
  timeline.reverse(); 
});

// Resize event optimization
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    timeline.kill(); 
    timeline = createTimeline();
  }, 200);
});
