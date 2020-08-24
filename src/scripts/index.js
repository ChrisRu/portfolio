import "../styles/style.css";

const $ = document.querySelector.bind(document);

function toggleTheme(darkTheme) {
  localStorage.setItem("theme", darkTheme ? "dark" : "light");
  updateTheme(true, darkTheme);
}

function updateTheme(fromToggle, darkTheme) {
  const diameterValue =
    Math.sqrt(window.outerHeight ** 2 + window.outerWidth ** 2) / 2;

  const hasClassDark = $("body").classList.contains("dark");
  if ((darkTheme && hasClassDark) || (!darkTheme && !hasClassDark)) {
    return;
  }

  if (fromToggle === true) {
    initAnimate(diameterValue, darkTheme);
  } else {
    if (darkTheme) {
      $("body").classList.add("dark");
    }
  }
}

function initAnimate(diameter, darkTheme) {
  const animationCircle = $(".animation-circle");
  animationCircle.style.opacity = 1;
  animationCircle.style.backgroundColor = darkTheme ? "#181818" : "#fff";

  let current = 30;
  const animate = () => {
    if (current > diameter) {
      animationCircle.style.opacity = 0;

      if (darkTheme) {
        if ($("body").classList.contains("dark")) {
          return;
        }

        $("body").classList.add("dark");
      } else {
        if (!$("body").classList.contains("dark")) {
          return;
        }

        $("body").classList.remove("dark");
      }
    }

    current += (current * current) / 800;

    animationCircle.style.height = `${current}px`;
    animationCircle.style.width = `${current}px`;
    animationCircle.style.top = `calc(${-(current / 2)}px + 4.1em`;
    animationCircle.style.right = `calc(${-(current / 2)}px + 4.1em)`;

    requestAnimationFrame(animate);
  };

  animate();
}

function setupKeys(event) {
  if (event.keyCode === 76) {
    return toggleTheme(false);
  }

  if (event.keyCode === 68) {
    return toggleTheme(true);
  }
}

function clickToggle() {
  toggleTheme(!(localStorage.getItem("theme") === "dark"));
}

updateTheme(false, localStorage.getItem("theme") === "dark");
$(".theme-toggle svg").addEventListener("click", clickToggle);
window.addEventListener("keydown", setupKeys);
