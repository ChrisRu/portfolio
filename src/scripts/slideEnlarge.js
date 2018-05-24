import { $$ } from './util';

function addListeners() {
  const slides = $$('.project-slide');

  slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      slides.forEach((slide, currentSlide) => {
        if (index === currentSlide) {
          slide.classList.add('big');
        } else {
          slide.classList.remove('big');
        }
      });
    });
  });
}

export default () => {};
