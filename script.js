document.addEventListener('DOMContentLoaded', function () {
  const windowWidth = window.innerWidth;
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

    if (windowWidth < 768) {
      pictureAd.src = images[index];
    } else {
      gsap.to(pictureAd, {
        x: '-1%',
        duration: 1,
        onComplete: () => {
          pictureAd.style.transition = 'none';
          pictureAd.src = images[index];
          gsap.to(pictureAd, {
            x: '1%',
            duration: 1,
          });
        },
      });
    }

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


  document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('readmore-txt')) {
      event.preventDefault();

      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Read More</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f5f5f5;
              }
              p {
                font-size: 1.5em;
                color: #333;
              }
            </style>
          </head>
          <body>
            <p>Details about this feature will be added soon. Stay tuned!</p>
          </body>
          </html>
        `);
        newWindow.document.close();
      } else {
        alert('Unable to open a new window. Please allow pop-ups for this site.');
      }
    }
  });
});


window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    location.reload(); // Перезавантаження для врахування змін у ширині
  }, 200);
});


const createTimeline = () => {
  const maxWidth = 1710; 
  const currentWidth = window.innerWidth;
  const isSmallScreen = currentWidth < 768;
  const scaleFactor = Math.min(currentWidth / maxWidth, 1.5);

  const timeline = gsap.timeline({
    defaults: { duration: 1.5, ease: "power3.out" }
  });

  timeline.fromTo(
    "#samsung-logo",
    { x: "-100%", opacity: 0 }, 
    { 
      x: `${isSmallScreen ? 30 : 22 * scaleFactor}%`,
      opacity: 1,
    }
  );

  timeline.fromTo(
    ".bespoke-jet-text-huge ",
    { x: "-100%", opacity: 0 },
    {
      x: `${isSmallScreen ? -10 : -20 * scaleFactor}%`,  
      opacity: 1,
    },
    "<"
  );

  timeline.fromTo(
    ".moving-text p",
    { x: "-100%", opacity: 0 },
    {
      x: `${isSmallScreen ? 20 : 10 * scaleFactor}%`,
      opacity: 1,
      stagger: {
        amount: 0.5,
        from: "start",
        ease: "power3.out",
      }
    }
  );

  timeline.fromTo(
    "#samsung-logo",
    { y: 0 }, 
    {
      y: isSmallScreen ? -50 : -92 * scaleFactor,
      ease: "power3.out",
    },
    "<"
  );

  timeline.to(
    "#bespoke-jet-text-huge-to-dis",
    {
      display: "none",
    },
    "<"
  );

  timeline.to(
    "#tiny-descr",
    {
      color: "black",
    },
    "<"
  );

  timeline.to(
    "#picture-ad",
    isSmallScreen
      ? { scaleY: 0.7, transformOrigin: "bottom", duration: 1.5 }
      : { scaleX: 0.5, transformOrigin: "right", duration: 1.5 },
    "<"
  );

  timeline.to(
    ".swiper",
    { 
      display: "block",
    }
  );

  timeline.to(
    ".swiper-buttons",
    { 
      display: "flex",
    },
    "<"
  );

  return timeline;
};

let timeline = createTimeline();

const button = document.querySelector("#trigger");
button.addEventListener("click", () => {
  timeline.timeScale(4); 
  timeline.reverse(); 
});


let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    timeline.kill(); 
    timeline = createTimeline();
  }, 200);
});
