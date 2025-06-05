function initColorSwiper() {
  return new Swiper('.colorSwiper', {
    slidesPerView: 3,
    spaceBetween: 15,
    navigation: {
      nextEl: '.colorSwiper .swiper-button-next',
      prevEl: '.colorSwiper .swiper-button-prev',
    },
    breakpoints: {
      640: { slidesPerView: 4 },
      768: { slidesPerView: 5 },
    },
  });
}

function initMainImageSwiper() {
  return new Swiper('.main-image-swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.main-image-swiper .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.main-image-swiper .swiper-button-next',
      prevEl: '.main-image-swiper .swiper-button-prev',
    },
  });
}

function updateMainImages(swiper, images, colorName) {
  swiper.removeAllSlides();
  images.forEach((img, i) => {
    swiper.appendSlide(`
      <div class="swiper-slide">
        <img src="${img}" alt="Mateo Lip Kit - ${colorName} ${
      i + 1
    }" loading="lazy">
      </div>
    `);
  });
  swiper.slideTo(0);
}

function setupColorSelection(mainImageSwiper) {
  const colorOptions = document.querySelectorAll('.color-option');
  const selectedColorText = document.getElementById('selected-color');

  colorOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const images = JSON.parse(option.getAttribute('data-images'));
      const colorName = option.getAttribute('data-color');

      updateMainImages(mainImageSwiper, images, colorName);
      selectedColorText.textContent = colorName;

      colorOptions.forEach((opt) =>
        opt.classList.remove('swiper-slide-thumb-active')
      );
      option.classList.add('swiper-slide-thumb-active');
    });
  });

  if (colorOptions.length > 0) {
    colorOptions[0].click();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const colorSwiper = initColorSwiper();
  const mainImageSwiper = initMainImageSwiper();
  setupColorSelection(mainImageSwiper);
});
