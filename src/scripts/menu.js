(function() {

  const menuToggle = document.querySelector('.menu__toggle');

  if (menuToggle) {
    const menu = document.querySelector('.menu');
    const body = document.querySelector('body')

    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      menu.classList.toggle('menu--opened')
      body.classList.toggle('body--locked')
    })




  const menuLinks = document.querySelectorAll('.menu__link');

  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', (e) => {
      e.preventDefault();

      let blockId = menuLink.getAttribute('href')
      if (blockId != "#") {
        document.querySelector(blockId).scrollIntoView({
          behavior: 'smooth',
        })
      }



      if (menu.classList.contains('menu--opened')) {
            menu.classList.remove('menu--opened')
            body.classList.remove('body--locked')
      }
    })
  })






  }




})();
