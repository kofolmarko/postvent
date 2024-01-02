const wordElement = document.querySelector('.advent');
const elementsInsideWord = document.querySelectorAll('.word *');
wordElement.addEventListener('click', () => {
    elementsInsideWord.forEach((element) => {
        element.style.transition = 'opacity 1s ease-in-out';
        element.style.opacity = '0';
    });

    setTimeout(() => {
        const giftElement = document.querySelector('.gift');
        giftElement.style.transform = 'translateY(-50%)';
        giftElement.style.transition = 'top 3s ease-in-out';
        giftElement.style.top = '50%';
    }, 1000);
});

const giftElement = document.querySelector('.gift');
giftElement.addEventListener('click', () => {
    const giftElementLeft = document.querySelector('.gift-left');
    const giftElementRight = document.querySelector('.gift-right');
    giftElement.style.display = 'none';
    giftElementLeft.style.display = 'block';
    giftElementRight.style.display = 'block';

    const advent = document.querySelector('.advent');
    const postvent = document.querySelector('.postvent');
    advent.style.display = 'none';
    postvent.style.display = 'block';

    anime({
        targets: giftElementLeft,
        translateX: ['-100%', '-180%'],
        duration: 1000,
        easing: 'easeInOutQuad'
    });
    
        anime({
        targets: giftElementRight,
        translateX: ['100%', '180%'],
        duration: 1000,
        easing: 'easeInOutQuad'
    });

    elementsInsideWord.forEach((element) => {
        element.style.transition = 'opacity 1s ease-in-out';
        element.style.opacity = '1';
    });
});

const postvent = document.querySelector('.postvent');
const essay = document.querySelector('.essay');
postvent.addEventListener('click', () => {
    const giftElementLeft = document.querySelector('.gift-left');
    const giftElementRight = document.querySelector('.gift-right');
    anime({
        targets: giftElementLeft,
        translateX: ['-180%', '-200%'],
        translateY: ['0%', '300%'],
        rotate: '-90deg',
        duration: 2000,
        easing: 'easeInOutQuad'
    });
    
    anime({
        targets: giftElementRight,
        translateX: ['180%', '200%'],
        translateY: ['0%', '300%'],
        rotate: '90deg',
        duration: 2000,
        easing: 'easeInOutQuad'
    });

    anime({
        targets: postvent,
        opacity: 0,
        duration: 2000,
        easing: 'easeInOutQuad',
        complete: () => {
            postvent.style.display = 'none';
            essay.style.display = 'block';
            anime({
                targets: essay,
                opacity: 1,
                duration: 2000,
                easing: 'easeInOutQuad',
                complete: () => {
                    essay.addEventListener('click', () => {
                        anime({
                            targets: essay,
                            height: ['90vh'],
                            width: ['50vw'],
                            duration: 2000,
                            easing: 'easeInOutQuad'
                        });
                    });
                }
            });
        }
    });
});
