function slider() {
    function getZero(n) {
        return n >= 0 && n < 10 ? `0${n}` : n;
    }

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        sliderWidth = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1,
        offset = 0;

    total.textContent = getZero(slides.length);
    current.textContent = getZero(slideIndex);

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = sliderWidth;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function tranformSliderNav(totalSliders, currentSlide, offset) {
        slidesField.style.transform = `translateX(-${offset}px)`;
        total.textContent = getZero(totalSliders);
        current.textContent = getZero(currentSlide);
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(sliderWidth) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(sliderWidth);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        tranformSliderNav(slides.length, slideIndex, offset);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(sliderWidth) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(sliderWidth);
        }

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        tranformSliderNav(slides.length, slideIndex, offset);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(sliderWidth) * (slideTo - 1);

            tranformSliderNav(slides.length, slideIndex, offset);
        });
    });

}

module.exports = slider;