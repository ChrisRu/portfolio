let darkTheme = window.localStorage.getItem('theme') === 'dark' ? true : false;

function toggleTheme() {
  darkTheme = !darkTheme;
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
  animationCircle.style.backgroundColor = toColor ? '#000' : '#fff';

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

document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
document.addEventListener("DOMContentLoaded", updateTheme);
