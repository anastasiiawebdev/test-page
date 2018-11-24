(function() {
'use strict';

function domReady() {
 mobileMenu();
 mainSlider();
 contentSlider();
 popupModal();
}

function mobileMenu() {
 let burger = document.querySelector('.js_burger');
 document.addEventListener('click', function(event) {
  let target = event.target;
  let targetParent = target.parentNode;
  if (target === burger) {
   targetParent.classList.toggle('active');
  }
 });
}

function mainSlider() {
 let swiper = new Swiper('.c-slider-main', {
  loop: true,
  navigation: {
   nextEl: '.swiper-button-next',
   prevEl: '.swiper-button-prev'
  },
  effect: 'fade',
  autoplay: {
   delay: 3000,
   disableOnInteraction: false
  }
 });
}

function contentSlider() {
 let swiperCenterblock = new Swiper('.c-swiper-centerblock', {
  slidesPerView: 1,
  slidesPerColumn: 2,
  slidesPerGroup: 1,
  spaceBetween: 30,
  breakpointsInverse: true,
  breakpoints: {
   480: {
    slidesPerView: 2,
    slidesPerColumn: 2
   },
   768: {
    slidesPerView: 3,
    slidesPerColumn: 2
   }
  },
  pagination: {
   el: '.swiper-pagination',
   clickable: true,
   renderBullet: function(index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
   }
  }
 });
}

function popupModal() {
 let modalTinyBtn = new tingle.modal({});
 let btn2 = document.querySelector('.js-tingle-modal-trigger');

 btn2.addEventListener('click', function() {
  modalTinyBtn.open();
 });

 modalTinyBtn.setContent(document.querySelector('.tingle-demo-tiny').innerHTML);

 validate.extend(validate.validators.datetime, {
  parse: function(value, options) {
   return +moment.utc(value);
  },
  format: function(value, options) {
   var format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
   return moment.utc(value).format(format);
  }
 });

 let constraints = {
  email: {
   presence: true,
   email: true
  },
  username: {
   presence: true,
   length: {
    minimum: 3,
    maximum: 20
   },
   format: {
    pattern: '[a-z0-9]+',
    flags: 'i',
    message: 'can only contain a-z and 0-9'
   }
  },
  'telephone': {
   presence: true,
   format: {
    pattern: '^(\\([0-9]{3}\\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$'
   }
  }
 };

 let form = document.querySelector('form#main');
 form.addEventListener('submit', function(ev) {
  ev.preventDefault();
  handleFormSubmit(form);
 });

 let inputs = document.querySelectorAll('input, textarea, select');
 for (let i = 0; i < inputs.length; ++i) {
  inputs.item(i).addEventListener('change', function(ev) {
   let errors = validate(form, constraints) || {};
   showErrorsForInput(this, errors[this.name]);
  });
 }

 function handleFormSubmit(form, input) {
  let errors = validate(form, constraints);
  showErrors(form, errors || {});
  if (!errors) {
   showSuccess();
  }
 }

 function showErrors(form, errors) {
  _.each(form.querySelectorAll('input[name], select[name]'), function(input) {
   showErrorsForInput(input, errors && errors[input.name]);
  });
 }

 function showErrorsForInput(input, errors) {
  let formGroup = closestParent(input.parentNode, 'js_form-group')
    , messages = formGroup.querySelector('.js_messages');
  resetFormGroup(formGroup);
  if (errors) {
   formGroup.classList.add('has-error');
   _.each(errors, function(error) {
    addError(messages, error);
   });
  } else {
   formGroup.classList.add('has-success');
  }
 }

 function closestParent(child, className) {
  if (!child || child === document) {
   return null;
  }
  if (child.classList.contains(className)) {
   return child;
  } else {
   return closestParent(child.parentNode, className);
  }
 }

 function resetFormGroup(formGroup) {
  formGroup.classList.remove('has-error');
  formGroup.classList.remove('has-success');
  _.each(formGroup.querySelectorAll('.help-block.error'), function(el) {
   el.parentNode.removeChild(el);
  });
 }

 function addError(messages, error) {
  let block = document.createElement('p');
  block.classList.add('help-block');
  block.classList.add('error');
  block.innerText = error;
  messages.appendChild(block);
 }

 function showSuccess() {
  swal('Спасибо!', 'С Вами свяжутся наши операторы!', 'success');
  modalTinyBtn.close();
 }
}

document.addEventListener('DOMContentLoaded', domReady);

})();






