const cardArr = document.querySelectorAll(".m-card");



// cklicking on card
cardArr.forEach(card => {
    card.addEventListener('click', function () {
        const tween = gsap.timeline({repeat: 0, repeatDelay: 1});

        tween.to(card, {
            duration: 0.2,
            scale: 0.9,
            ease: "back.out(1)",
        })
        tween.to(card, {
            duration: 0.2,
            scale: 1,
            ease: "back.out(1.4)",
        })
    });
});