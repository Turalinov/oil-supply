(function() {

  const links = document.querySelectorAll('.politics__link'); //для всех кнопок, которые будут открывать модальное окно мы навешиваем класс politics__link

  const body = document.querySelector('body'); // для того чтобы блокировать скролл

  const lockPadding = document.querySelectorAll('.lock-padding');
  //для фиксированных элементов таких как хедер задаем чтобы не дергался при отключения скролла у боди

  let unlock = true;

  const timeout = 800; //значение из transition для  адекватной работы блокировки скролла


  if (links.length > 0) {
    const modal = document.getElementById('modal-politics');


    links.forEach(link => {
        link.addEventListener('click', (e) => {
        e.preventDefault();

        modalOpen(modal);
      })
    });


    function modalOpen(modal) {
      if( modal && unlock) {



        bodyLock(); //блочим скролл

        modal.classList.add('modal--showed');

        modal.addEventListener('click', function(e) {
          if(!e.target.closest('.modal__content')) {
            modalClose(e.target.closest('.modal'));
          }
        })
      }
    }

    function modalClose(modalActive, doUnlock = true) {
      if(unlock) {

        modalActive.classList.remove('modal--showed');

        if(doUnlock) {
          bodyUnlock();
        }
      }
    }

    function bodyUnlock(){

      setTimeout(() => {

      //если элементы фикированные есть
      if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
          const el = lockPadding[i];

          el.style.paddingRight = "0px";

        }
          body.style.paddingRight = "0px";
          body.classList.remove('body--locked');
      }

      unlock = false;

      setTimeout(() => {
        unlock = true;
      }, timeout);


      }, timeout);
    }


    function bodyLock(){

      const innerWidth = window.innerWidth
      const offsetWidth = body.offsetWidth

      const lockPaddingValue = innerWidth - offsetWidth  + 'px';

      //если элементы фикированные есть
      if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
          const el = lockPadding[i];

          el.style.paddingRight = lockPaddingValue;

        }
      }

       body.style.paddingRight = lockPaddingValue;
       body.classList.add('body--locked');
       unlock = false;

       setTimeout(() => {
        unlock = true;
       }, timeout);

    }

    //close icon


    const close = modal.querySelectorAll('.modal__close'); //для всех элементов закрытия попапов навешиваем класс modal-close


    if( close.length > 0) {
      for(let index = 0; index < close.length; index++) {
        const el =  close[index];
        el.addEventListener('click', function(e) {
          modalClose(el.closest('.modal'));
          e.preventDefault();
        })
      }
    }


  }





})();
