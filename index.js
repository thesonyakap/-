let currentSlide = 0;
const totalSlides = 10;
const slidesToShow = 3;

function showSlides() {
    const slides = document.querySelector('.main__slider-blocks');
    const offset = currentSlide * -370 / slidesToShow; // Сдвиг влево
    slides.style.transform = `translateX(${offset}%)`;
}

function changeSlide(direction) {
    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = totalSlides - slidesToShow; // Переход к последним 3 элементам
    } else if (currentSlide > totalSlides - slidesToShow) {
        currentSlide = 0; // Переход к первым 3 элементам
    }

    showSlides();
}

// Инициализация слайдера
showSlides();
    