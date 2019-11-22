'use strict';

var navigate = document.getElementsByClassName('navigation-block'),
    menuNav = document.getElementsByClassName('nav'),
    burgerBtn = document.getElementsByClassName('burger'),
    burgerPlanc = document.getElementsByClassName('burger__plank'),
    brandLogo = document.getElementsByClassName('brand'),
    windowHeight = document.documentElement.clientHeight;

window.addEventListener('scroll', function () {
  var scrTop = document.documentElement.scrollTop;
  if (scrTop > 100) {
    navigate[0].style.position = 'fixed';
    // navigate[0].innerHTML = document.createElement('div').addClass('creativ');
  } else {
    navigate[0].style.position = 'absolute';
  }
});

function showMenu(e) {
  e.preventDefault();
  menuNav[0].classList.toggle('show-menu');
  navigate[0].classList.toggle('show-nav');
  brandLogo[0].classList.toggle('d-none');
  burgerPlanc[0].classList.toggle('close-menu');
}

burgerBtn[0].addEventListener('click', showMenu, false);

// собираем все якоря; устанавливаем время анимации и количество кадров
var anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    animationTime = 3000,
    framesCount = 20;

anchors.forEach(function (item) {
  // каждому якорю присваиваем обработчик события
  item.addEventListener('click', function (e) {
    // убираем стандартное поведение
    e.preventDefault();

    // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
    var coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

    // запускаем интервал, в котором
    var scroller = setInterval(function () {
      // считаем на сколько скроллить за 1 такт
      var scrollBy = coordY / framesCount;

      // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
      // и дно страницы не достигнуто
      if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        // то скроллим на к-во пикселей, которое соответствует одному такту
        window.scrollBy(0, scrollBy);
      } else {
        // иначе добираемся до элемента и выходим из интервала
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
      // время интервала равняется частному от времени анимации и к-ва кадров
    }, animationTime / framesCount);
  });
});