'use strict';

(function () {
  var photos = window.data.photos;

  var pictures = document.querySelector('.pictures');
  var previewPictures = pictures.querySelectorAll('.picture');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancelButton = bigPicture.querySelector('.big-picture__cancel');
  var commentsList = bigPicture.querySelector('.social__comments');
  var comments = commentsList.querySelectorAll('.social__comment');
  var selectedPicture;

  var constructBigPicture = function (index) {
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = photos[index].url;
    bigPicture.querySelector('.social__caption').textContent = photos[index].description;
    bigPicture.querySelector('.comments-count').textContent = photos[index].comments.length;
    bigPicture.querySelector('.likes-count').textContent = photos[index].likes;

    for (var i = 0; i < comments.length; i++) {
      comments[i].querySelector('.social__picture').src = photos[index].comments[i].avatar;
      comments[i].querySelector('.social__picture').alt = photos[index].comments[i].name;
      comments[i].querySelector('.social__text').textContent = photos[index].comments[i].message;
    }
  };

  var previewPictureClickHandler = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    selectedPicture = evt.currentTarget;

    var pictureIndex = selectedPicture
      .querySelector('.picture__img')
      .getAttribute('src')
      .replace(window.util.NUMBERS_DISMATCH, '') - 1;

    constructBigPicture(pictureIndex);
    bigPicture.classList.remove('hidden');
    bigPictureCancelButton.focus();
    window.util.setModalOpenedMode();
    document.addEventListener('keydown', bigPictureEscPressHandler);
  };

  previewPictures.forEach(function (previewPicture) {
    previewPicture.addEventListener('click', previewPictureClickHandler);
  });

  bigPictureCancelButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeBigPicture();
  });

  var bigPictureEscPressHandler = function (evt) {
    if (evt.key === window.util.ESC_KEY) {
      closeBigPicture();
    }
  };

  var closeBigPicture = function () {
    document.removeEventListener('keydown', bigPictureEscPressHandler);
    bigPicture.classList.add('hidden');
    selectedPicture.focus();
    window.util.setModalClosedMode();
  };

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
})();
