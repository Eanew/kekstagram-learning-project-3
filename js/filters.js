'use strict';

(function () {
  var DEFAULT_FILTER_CLASS = 'effects__preview--none';
  var PREVIEW_CLASS_TEMPLATE = 'effects__preview--';
  var EFFECT_ID_TEMPLATE = 'effect-';

  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadPreviewImg = uploadOverlay.querySelector('.img-upload__preview').querySelector('img');
  var effectsList = uploadOverlay.querySelector('.effects__list');
  var effectLevel = uploadOverlay.querySelector('.effect-level');
  var effectLine = effectLevel.querySelector('.effect-level__line');
  var effectPin = effectLine.querySelector('.effect-level__pin');
  // var effectLineWidth;

  var refreshCurrentFilter = function () {
    uploadPreviewImg.style.filter = '';
    uploadPreviewImg.style.WebkitFilter = '';
    if (window.filters.imgClass !== DEFAULT_FILTER_CLASS) {
      window.filters.current.attributeString = getComputedStyle(uploadPreviewImg).filter;
      window.filters.current.defaultValue = window.filters.current.attributeString.replace(window.util.NUMBERS_DISMATCH, '');
      window.filters.current.calculableValue = window.filters.current.defaultValue / 100;
      effectLevel.classList.remove('hidden');
      window.filters.effectLineWidth = +getComputedStyle(effectLine).width.replace('px', '');
      effectPin.style.left = window.filters.effectLineWidth + 'px';
      window.effectLevel.setValue();
    } else {
      effectLevel.classList.add('hidden');
    }
  };

  var effectsListChangeHandler = function (evt) {
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      uploadPreviewImg.classList.remove(window.filters.imgClass);
      window.filters.imgClass = evt.target.id.replace(EFFECT_ID_TEMPLATE, PREVIEW_CLASS_TEMPLATE);
      uploadPreviewImg.classList.add(window.filters.imgClass);
      refreshCurrentFilter();
    }
  };

  effectsList.addEventListener('change', effectsListChangeHandler);

  window.filters = {
    DEFAULT_CLASS: DEFAULT_FILTER_CLASS,
    current: {},
    refreshCurrent: function () {
      refreshCurrentFilter();
    }
  };
})();
