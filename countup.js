// SYSTEM FLOW Count up from 0 to selected value
(() => {
  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  const countups = document.querySelectorAll('[data-sysflow-countup]');

  if (countups) {
    countups.forEach((countup) => {
      const obj = countup.querySelector('[data-sysflow-countup-duration]');
      const duration = obj.getAttribute('data-sysflow-countup-duration');
      const start = Number(countup.getAttribute('data-sysflow-countup'));
      const end = obj.innerHTML;

      animateValue(obj, start, end, duration);
    });
  }
})();
