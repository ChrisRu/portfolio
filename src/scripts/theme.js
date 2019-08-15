import { $, storage } from './util';

let darkTheme = false;

function toggleTheme(isDark) {
  darkTheme = isDark;
  updateTheme(true);
  storage.set('theme', darkTheme ? 'dark' : 'light');
}

function updateTheme(fromToggle) {
  const diameterValue =
    Math.sqrt(window.outerHeight ** 2 + window.outerWidth ** 2) / 2;

  const hasClassDark = $('body').classList.contains('dark');
  if ((darkTheme && hasClassDark) || (!darkTheme && !hasClassDark)) {
    return;
  }

  if (fromToggle === true) {
    initAnimate(diameterValue, darkTheme);
  } else {
    if (darkTheme) {
      $('body').classList.add('dark');
    }
  }
}

function initAnimate(diameter, toColor) {
  const animationCircle = $('.animation-circle');
  animationCircle.style.opacity = 1;
  animationCircle.style.backgroundColor = toColor ? '#181818' : '#fff';

  let current = 20;
  const animate = () => {
    if (current > diameter) {
      animationCircle.style.opacity = 0;

      if (darkTheme) {
        if ($('body').classList.contains('dark')) {
          return;
        }

        $('body').classList.add('dark');
      } else {
        if (!$('body').classList.contains('dark')) {
          return;
        }

        $('body').classList.remove('dark');
      }
    }

    current += (current * current) / 800;

    animationCircle.style.height = `${current}px`;
    animationCircle.style.width = `${current}px`;
    animationCircle.style.top = `calc(${-(current / 2)}px + 2.9em)`;
    animationCircle.style.right = `calc(${-(current / 2)}px + 2.9em)`;

    requestAnimationFrame(animate);
  };

  return animate();
}

function setupKeys(event) {
  if (event.keyCode === 78) {
    return toggleTheme(true);
  }

  if (event.keyCode === 68) {
    return toggleTheme(false);
  }
}

function clickToggle() {
  toggleTheme(!darkTheme);
}

export default () => {
  darkTheme = storage.get('theme') === 'dark';
  updateTheme();
  $('.theme-toggle svg').addEventListener('click', clickToggle);
  window.addEventListener('keydown', setupKeys);
};
