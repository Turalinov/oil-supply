(function() {
  console.log('contacts form');

  const form = document.getElementById('form-contacts');

  if( form ) {
  form.addEventListener('submit', function(e) {
    //отменяем действие по умолчанию
    e.preventDefault();

    //получаем кнопку
    const btn = form.querySelector('.form__btn');


    //получаем данные
    let inputs = form.elements;

    let obj = {};

    for (let i = 0; i < inputs.length; i++) {

      let input = inputs.item(i);
      let name  = input.name;
      let error = input.nextElementSibling

      let value = String(input.value).trim()
      let tagName = input.tagName.toLowerCase();


      console.log(tagName);
      if (tagName == 'button') {
          continue;
      }



      if (value == "")  {
        error.classList.add('form__error--active')
        return false;
      } else {
        error.classList.remove('form__error--active');
        obj[name] = value;
      }

      console.log(obj);
    }



    async function postData(url = '', data = {}) {

      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });


      if(response.ok) {
        let json = await response.json();
        console.log(json);
        return json;
      } else {
        alert('Ошибка HTTP: ' + response.status + 'Попробуйте еще раз позднее.');
      }
    }
    // /wp-content/themes/{theme}/action-form.php
    postData('action-form.php', { messageObj : obj})
    .then((data) => {
      if(data.status) {
        this.reset();
        alert('Thank you for contacting us, we will definitely contact you');
      }
    });

    console.log('форма отправлена');
  })

  }

})()
