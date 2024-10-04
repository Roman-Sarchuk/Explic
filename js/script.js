// Ініціалізація barba.js
barba.init({
    transitions: [{
        name: 'fade-transition',
        leave(data) {
            // Показуємо затемнення
            return gsap.to('.m-overlay', {
                opacity: 1, // Робимо екран чорним
                duration: 0.4
            });
        },
    }]
});

// Переініціалізація анімацій після кожного переходу
barba.hooks.after(() => {
    initAnimations();
    initWeatherWidget();
});

// Ініціалізація на старті
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
});

function initAnimations() {
    const cards = document.querySelectorAll('.m-card');

    cards.forEach((item) => {
        item.addEventListener('click', function () {
            // Видаляємо hover класи
            item.classList.remove('m-card-hover-left', 'm-card-hover-right');

            // Отримуємо поточні координати картки
            const rect = item.getBoundingClientRect();
            const startX = rect.left;
            const startY = rect.top;

            const tween = gsap.timeline({
                onComplete: function () {
                    barba.go(item.getAttribute('data-href')); // Переходимо на нову сторінку через barba.js
                }
            });

            // Натискання
            tween.to(item, {
                duration: 0.2,
                scale: 0.9,
                ease: "back.out(1)",
                onStart: function () {
                    item.style.zIndex = '100'; // Виводимо на передній план
                }
            })
                .to(item, {
                    duration: 0.2,
                    scale: 1,
                    ease: "back.out(1.4)",
                })
                // Падіння вниз
                .to(item, {
                    duration: 0.4,
                    y: window.innerHeight - rect.bottom, // Падіння до нижнього краю екрана
                    ease: "power2.in",
                })
                // Розширення на весь екран
                .to(item, {
                    duration: 0.5,
                    x: -startX, // Рівняємо по лівій частині екрану
                    y: -startY, // Рівняємо по верхній частині екрану
                    width: window.innerWidth, // Збільшуємо до ширини екрану
                    height: window.innerHeight, // Збільшуємо до висоти екрану
                    backgroundPosition: "0% 0%",
                    borderRadius: '0px',
                    boxShadow: "inset 0px 0px 0px 0px rgba(0, 0, 0, 0)",
                    filter: "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0))",
                    ease: "back.out(0.8)",
                    onStart: function () {
                        item.style.position = 'fixed'; // Фіксуємо позицію
                        item.style.top = startY + 'px'; // Початкове положення по осі Y
                        item.style.left = startX + 'px'; // Початкове положення по осі X
                        item.style.maxWidth = 'none'; // Вимикаємо max-width
                        item.style.maxHeight = 'none'; // Вимикаємо max-height
                        item.style.margin = '0'; // Вимикаємо margin
                        item.style.padding = '0'; // Вимикаємо padding
                    },
                });
        });
    });
}

// Функція ініціалізації віджета погоди
function initWeatherWidget() {
    const weatherElement = document.querySelector('.elfsight-app-4cbcf4f8-32ff-4c3d-b5d9-a2e65573094e');
    if (weatherElement) {
        // Якщо віджет вже існує, видалити його перед повторною ініціалізацією
        weatherElement.innerHTML = '';
    }
    // Підключення скрипта для віджета
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);
}