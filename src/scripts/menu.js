(function() {
  console.log('menu');

  const menuToggle = document.querySelector('.menu__toggle');

  if (menuToggle) {
    const menu = document.querySelector('.menu');
    const body = document.querySelector('body')

    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      menu.classList.toggle('menu--opened')
      body.classList.toggle('body--locked')
    })

  }
})();
