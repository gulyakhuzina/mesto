const checkValidity = (input, obj) => {
  const error = document.querySelector(`#${input.id}-error`);
  error.textContent = '';
  if (input.validity.valid) {
    error.textContent = '';
    error.classList.remove(obj.errorClass);
    input.classList.remove(obj.inputErrorClass);
  } else {
    error.textContent = input.validationMessage;
    error.classList.add(obj.errorClass);
    input.classList.add(obj.inputErrorClass);
  }
} 

const toggleButtonState = (inputs, button, obj) => {
  const isFormValid = inputs.every((input) => {
    return input.validity.valid;
  })
  
  if (isFormValid) {
    button.classList.remove(obj.inactiveButtonClass);
    button.disabled = '';
  } else {
    button.classList.add(obj.inactiveButtonClass);
    button.disabled = 'disabled';
  }
}

const enableValidation = (obj) => {
  const forms = Array.from(document.querySelectorAll(obj.formSelector));

  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(obj.inputSelector));
    const button = form.querySelector(obj.submitButtonSelector);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        checkValidity(input, obj);
        toggleButtonState(inputs, button, obj);
      })
    })
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});