let darkTheme = window.localStorage.getItem('theme') === 'dark' ? true : false;

function toggleTheme() {
  darkTheme = !darkTheme;
  updateTheme();
  window.localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
}

function updateTheme() {
  if (darkTheme) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
document.addEventListener("DOMContentLoaded", updateTheme);
