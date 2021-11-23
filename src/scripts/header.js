(function() {
  let last_known_scroll_position = 0;
  let ticking = false;
  let header = document.querySelector('.header');

  function doSomething(scroll_pos) {
    // Делаем что-нибудь с позицией скролла

    if (scroll_pos > 5) {
      header.classList.add('_active')
    } else {
      header.classList.remove('_active')
    }
  }

  window.addEventListener('scroll', function(e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        doSomething(last_known_scroll_position);
        ticking = false;
      });

      ticking = true;
    }
  });
})()
