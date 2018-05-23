import { $, $$, createElement } from './util';

const state = {
  currentSlide: 0,
  stopInterval: false,
  slides: [],
  controls: null,
  dots: []
};

function updateSlide(index, interval) {
  state.currentSlide = index % state.slides.length;

  if (interval === true && state.stopInterval === true) {
    return;
  }

  Array.from($$('.dot')).forEach((dot, dotIndex) => {
    if (dotIndex === state.currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  state.slides.forEach((slide, slideIndex) => {
    if (slideIndex !== state.currentSlide) {
      slide.classList.add('hidden');
    } else {
      slide.classList.remove('hidden');
    }
  });
}

function createDots() {
  state.slides.forEach((slide, index) => {
    const dot = createElement(index === 0 ? 'dot active' : 'dot', '', 'button');
    dot.addEventListener('click', () => {
      state.stopInterval = true;
      return updateSlide(index);
    });
    state.controls.appendChild(dot);
  });
}

function setupKeys(event) {
  if (event.keyCode === 39 && state.currentSlide < state.slides.length - 1) {
    state.stopInterval = true;
    updateSlide(state.currentSlide + 1);
  }

  if (event.keyCode === 37 && state.currentSlide > 0) {
    state.stopInterval = true;
    updateSlide(state.currentSlide - 1);
  }
}

export default () => {
  state.controls = $('.project-controls');
  state.slides = $$('.project-slide');

  createDots();

  state.dots = $$('.dot');

  window.addEventListener('keydown', setupKeys);
  setInterval(function() {
    updateSlide(state.currentSlide + 1, true);
  }, 10000);
};
