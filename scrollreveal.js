const reveals = document.querySelectorAll('.reveal');

function checkReveals() {
  const reveals = document.querySelectorAll('.reveal');
  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom && rect.bottom > 0) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', checkReveals);
window.addEventListener('load', checkReveals);


window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    const boxBottom = el.getBoundingClientRect().bottom;

    if (boxTop < triggerBottom && boxBottom > 0) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
});

window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.reveal-on-load');
  
    setTimeout(() => {
      elements.forEach(el => el.classList.add('active'));
    }, 200);
  });
  