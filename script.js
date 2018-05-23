let darkTheme = window.localStorage.getItem('theme') === 'dark' ? true : false;

function toggleTheme(dark) {
  darkTheme = dark === undefined ? !darkTheme : dark;
  updateTheme(true);
  window.localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
}

function updateTheme(fromToggle) {
  const diameterValue = (Math.sqrt(Math.pow(window.outerHeight, 2) + Math.pow(window.outerWidth, 2)) * 2);

  const hasClassDark = document.body.classList.contains('dark');
  if ((darkTheme && hasClassDark) || (!darkTheme && !hasClassDark)) {
    return;
  }

  if (fromToggle === true) {
    initAnimate(diameterValue, darkTheme);
  } else {
    if (darkTheme) {
      document.body.classList.add('dark');
    }
  }
}

function initAnimate(diameter, toColor) {
  const animationCircle = document.querySelector('.animation-circle');
  animationCircle.style.opacity = 1;
  animationCircle.style.backgroundColor = toColor ? '#181818' : '#fff';

  let current = 20;
  return (function animate() {
    if (current > diameter) {
      animationCircle.style.opacity = 0;

      if (darkTheme) {
        if (document.body.classList.contains('dark')) {
          return;
        }

        document.body.classList.add('dark');
      } else {
        if (!document.body.classList.contains('dark')) {
          return;
        }

        document.body.classList.remove('dark');
      }
    }

    current += (current * current) / 800;

    animationCircle.style.height = current + 'px';
    animationCircle.style.width = current + 'px';
    animationCircle.style.top = 'calc(' + -(current / 2) + 'px + 1.9em)';
    animationCircle.style.right = 'calc(' + -(current / 2) + 'px + 1.9em)';

    requestAnimationFrame(animate);
  })();
}

function init() {
  updateTheme();
  createDots();
}

document.querySelector('.theme-toggle svg').addEventListener('click', toggleTheme);
document.addEventListener("DOMContentLoaded", init);

let currentSlide = 0;
let stopInterval = false;
const slides = Array.from(document.querySelectorAll('.project-slide'));
function updateSlide(index, interval) {
  currentSlide = index % slides.length;

  if (interval === true && stopInterval === true) {
    return;
  }

  Array.from(document.querySelectorAll('.dot')).forEach(function(dot, dotIndex) { 
    if (dotIndex === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  slides.forEach(function(slide, slideIndex) {
    if (slideIndex !== currentSlide) {
      slide.classList.add('hidden');
    } else {
      slide.classList.remove('hidden');
    }
  });
}

function createDots() {
  const controls = document.querySelector('.project-controls');
  const slides = Array.from(document.querySelectorAll('.project-slide'));

  slides.forEach(function(slide, index) {
    const dot = document.createElement('button');
    dot.className = index === 0 ? 'dot active' : 'dot';
    dot.addEventListener('click', function() {
      stopInterval = true;
      return updateSlide(index);
    });
    controls.appendChild(dot);
  });
}

setInterval(function() {
  updateSlide(currentSlide + 1, true);
}, 10000);

window.addEventListener('keydown', function(event) {
  if (event.keyCode === 39 && currentSlide < slides.length - 1) {
    stopInterval = true;
    updateSlide(currentSlide + 1);
  }

  if (event.keyCode === 37 && currentSlide > 0) {
    stopInterval = true;
    updateSlide(currentSlide - 1);
  }

  if (event.keyCode === 78) {
    toggleTheme(true);
  }

  if (event.keyCode === 68) {
    toggleTheme(false);
  }
})