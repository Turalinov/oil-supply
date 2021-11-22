(function () {


  const animItems = document.querySelectorAll('._anim-items');



  if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll)
    function animOnScroll() {
      for (let i = 0; i < animItems.length; i++) {
        const animItem = animItems[i];

        const animItemHeight = animItem.offsetHeight; //высота элемента 182
        const animItemOffset = offset(animItem).top; //позиция объекта относительно вверха окна
        const animStart = 4; // коэффициент регулирования начала анимация

        let animItemPoint = window.innerHeight - animItemHeight / animStart; // 700 - 200 /4 = 750
        if ( animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;; // 800 - 800 / 4 = 1000
        }

        if ((pageYOffset > animItemOffset - animItemPoint) && (pageYOffset < animItemOffset + animItemHeight)) //возвращает количество пикселей, на которое прокручен документ по вертикали
        {
          animItem.classList.add('_active');
        } else {
          if (!animItem.classList.contains('_anim-no-hide')) {
            animItem.classList.remove('_active');
          }
        }

      }
    }


    function offset(el) {

      const rect = el.getBoundingClientRect(); // размер элемента и его позицию относительно  viewport

      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      // pageXOffset - текущая прокрутка слева ,
      // document.documentElement - html,
      // scrollTop - сколько прокручено вверх
      const scrollTop = window.pageXOffset || document.documentElement.scrollTop;


      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
      }

    }


    setTimeout(() => {
      animOnScroll()
    }, 400);

  }
})()
