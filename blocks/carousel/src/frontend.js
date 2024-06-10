document.addEventListener('DOMContentLoaded', function () {
    const carousels = document.querySelectorAll('[data-transition-time]');

    carousels.forEach(carousel => {
        const transitionTime = carousel.getAttribute('data-transition-time') * 1000;
        let currentIndex = 0;

        fetch('/wp-json/wp/v2/promotion')
            .then(response => response.json())
            .then(promotions => {
                promotions.forEach((promotion, index) => {
                    const promotionItem = document.createElement('div');
                    promotionItem.className = 'promotion-item' + (index === 0 ? ' active' : '');
                    promotionItem.innerHTML = `
                        <h2>${promotion.title.rendered}</h2>
                        <div>${promotion.content.rendered}</div>
                    `;
                    carousel.appendChild(promotionItem);
                });

                const promotionItems = Array.from(carousel.querySelectorAll('.promotion-item'));

                function showNextPromotion() {
                    promotionItems[currentIndex].classList.remove('active');
                    currentIndex = (currentIndex + 1) % promotionItems.length;
                    promotionItems[currentIndex].classList.add('active');
                }

                setInterval(showNextPromotion, transitionTime);
            });
    });
});