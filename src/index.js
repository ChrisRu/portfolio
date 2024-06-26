import "./style.css";

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
      document.querySelector("link[rel='icon']").href = "/favicon-dark.png";
    }
  }
}

let animating = false;

function easing(x) {
  return x * x * 0.04;
}

function initAnimation(darkTheme) {
  if (animating) {
    return;
  }

  animating = true;

  const toggleButton = document.querySelector(".theme-toggle");
  const toggleButtonBoundingRect = toggleButton.getBoundingClientRect();

  const animationCircleDefaultSize = 18;

  const diameter =
    Math.sqrt(window.outerHeight ** 2 + window.outerWidth ** 2) / 2 / animationCircleDefaultSize;

  const animationCircle = document.querySelector(".animation-circle");
  animationCircle.style.opacity = 1;
  animationCircle.style.backgroundColor = darkTheme ? "#181818" : "#fff";
  animationCircle.style.height = animationCircleDefaultSize + "px";
  animationCircle.style.width = animationCircleDefaultSize + "px";
  animationCircle.style.top =
    toggleButtonBoundingRect.top +
    toggleButtonBoundingRect.height / 2 -
    animationCircleDefaultSize / 2 +
    "px";
  animationCircle.style.left =
    toggleButtonBoundingRect.left +
    toggleButtonBoundingRect.width / 2 -
    animationCircleDefaultSize / 2 +
    "px";

  let current = 1;
  function animate() {
    if (current > diameter) {
      animationCircle.style.opacity = 0;

      if (darkTheme) {
        document.body.classList.add("dark");
        document.querySelector("link[rel='icon']").href = "/favicon-dark.png";
      } else {
        document.body.classList.remove("dark");
        document.querySelector("link[rel='icon']").href = "/favicon-light.png";
      }

      animating = false;
      return;
    }

    current += easing(current);

    animationCircle.style.transform = `scale(${current})`;

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
  document.querySelector(".theme-toggle").addEventListener("click", clickToggle);
  window.addEventListener("keydown", setupKeys);

  updateTheme(isThemeDark(), false);
  document.body.classList.remove("no-transition");
}

if (document.readyState == "complete") {
  main();
} else {
  document.addEventListener("DOMContentLoaded", main);
}
