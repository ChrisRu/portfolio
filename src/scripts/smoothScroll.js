function ease(time, from, to, duration) {
  time /= duration / 2;
  if (time < 1) {
    return (to / 2) * time * time + from;
  } else {
    t--;
    return (-to / 2) * (time * (time - 2) - 1) + from;
  }
}

export default function smoothScroll(duration = 800, easing = undefined) {
  const startPositionY = window.pageYOffset;
  const startPositionX = window.pageXOffset;
  const targetPositionY = target.getBoundingClientRect().top;
  const targetPositionX = target.getBoundingClientRect().left;

  const distanceX = targetPositionX - startPositionX;
  const distanceY = targetPositionY - startPositionY;

  let startTime;

  function animate(currentTime) {
    if (startTime === undefined) {
      startTime = currentTime;
    }

    const elapsed = currentTime - startTime;

    window.scrollTo(
      (easing || ease)(elapsed, startPositionX, distanceX, duration),
      (easing || ease)(elapsed, startPositionY, distanceY, duration)
    );

    if (elapsed < duration) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}
