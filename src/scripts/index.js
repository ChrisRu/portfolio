import "../styles/style.css";

function isThemeDark() {
  return localStorage.getItem("theme") === "dark";
}

function updateTheme(isDark, animate = true) {
  const hasClassDark = document.body.classList.contains("dark");
  if (isDark !== hasClassDark) {
    localStorage.setItem("theme", isDark ? "dark" : "light");

    if (animate) {
      initAnimation(isDark);
    } else if (isDark) {
      document.body.classList.add("dark");
    }
  }
}

let animating = false;

function initAnimation(darkTheme) {
  if (animating) {
    return;
  }

  animating = true;

  const diameter =
    Math.sqrt(window.outerHeight ** 2 + window.outerWidth ** 2) / 2;

  const animationCircle = document.querySelector(".animation-circle");
  animationCircle.style.opacity = 1;
  animationCircle.style.backgroundColor = darkTheme ? "#181818" : "#fff";

  let current = 30;
  function animate() {
    if (current > diameter) {
      animationCircle.style.opacity = 0;

      if (darkTheme) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }

      animating = false;
      return;
    }

    current += (current * current) / 800;

    animationCircle.style.height = `${current}px`;
    animationCircle.style.width = `${current}px`;
    animationCircle.style.top = `${-(current / 2) + 80}px`;
    animationCircle.style.right = `${-(current / 2) + 80}px`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

function setupKeys(event) {
  switch (event.key) {
    case "d":
      updateTheme(true);
      break;
    case "l":
      updateTheme(false);
      break;
  }
}

function clickToggle() {
  updateTheme(!isThemeDark());
}

function main() {
  document
    .querySelector(".theme-toggle svg")
    .addEventListener("click", clickToggle);
  window.addEventListener("keydown", setupKeys);

  updateTheme(isThemeDark(), false);
  document.body.classList.remove("no-transition");
}

if (document.readyState == "complete") {
  main();
} else {
  document.addEventListener("DOMContentLoaded", main);
}
