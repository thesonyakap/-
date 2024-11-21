document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".main__slider-blocks");
  let slides = Array.from(document.querySelectorAll(".main__slider-block"));
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  if (slides.length === 0) {
    console.error("Слайды не найдены! Проверьте класс `.main__slider-block`.");
    return;
  }

  const slideWidth = slides[0].offsetWidth; // Ширина одного слайда
  let currentSlideIndex = slides.length; // Начинаем с последнего реального слайда (учитывая клоны)

  // Клонируем первый и последний слайды
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  // Добавляем клоны в DOM
  slider.appendChild(firstClone); // Клон первого слайда в конец
  slider.insertBefore(lastClone, slider.firstChild); // Клон последнего слайда в начало

  // Обновляем список слайдов с учетом клонов
  slides = Array.from(document.querySelectorAll(".main__slider-block"));

  // Устанавливаем начальное смещение (на последний реальный слайд)
  slider.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;

  // Функция для смены слайдов
  function changeSlide(direction) {
    currentSlideIndex -= direction; // Уменьшаем индекс, чтобы двигаться вправо

    slider.style.transition = "transform 0.5s ease";
    slider.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;

    // После завершения перехода проверяем крайние случаи
    slider.addEventListener("transitionend", handleLoop);
  }

  // Логика зацикливания
  function handleLoop() {
    slider.removeEventListener("transitionend", handleLoop);

    // Если мы на клонированном последнем слайде (вправо), возвращаемся к первому реальному
    if (currentSlideIndex === slides.length - 1) {
      slider.style.transition = "none"; // Отключаем анимацию
      currentSlideIndex = 1; // Первый реальный слайд
      slider.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;

      setTimeout(() => {
        slider.style.transition = "transform 0.5s ease";
      });
    }

    // Если мы на клонированном первом слайде (влево), возвращаемся к последнему реальному
    if (currentSlideIndex === 0) {
      slider.style.transition = "none"; // Отключаем анимацию
      currentSlideIndex = slides.length - 2; // Последний реальный слайд
      slider.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;

      setTimeout(() => {
        slider.style.transition = "transform 0.5s ease";
      });
    }
  }

  // Автопрокрутка
  let autoSlide = setInterval(() => {
    changeSlide(1); // Смещение вправо
  }, 3000);

  // События для кнопок
  prevButton.addEventListener("click", () => {
    clearInterval(autoSlide);
    changeSlide(-1); // Смещение влево
    autoSlide = setInterval(() => changeSlide(1), 3000);
  });

  nextButton.addEventListener("click", () => {
    clearInterval(autoSlide);
    changeSlide(1); // Смещение вправо
    autoSlide = setInterval(() => changeSlide(1), 3000);
  });

  // Остановка автопрокрутки при наведении
  slider.addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
  });

  slider.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => changeSlide(1), 3000);
  });
});






    

    