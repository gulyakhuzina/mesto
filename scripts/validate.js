const checkValidity = (input, error, obj) => {
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

const isNullInputValue = (input, button, obj) => {
  if (input.value === '') {
    button.disabled = 'disabled';
    button.classList.add(obj.inactiveButtonClass);
  } else {
    button.disabled = '';
    button.classList.remove(obj.inactiveButtonClass);
  }
}

const clearValidateError = (input, error, obj) => {
  error.textContent = '';
  input.classList.remove(obj.inputErrorClass);
}

const enableValidation = (obj) => {
  const forms = Array.from(document.querySelectorAll(obj.formSelector));

  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(obj.inputSelector));
    const button = form.querySelector(obj.submitButtonSelector);
    const editButton = document.querySelector(obj.editButton);
    const addButton = document.querySelector(obj.addButton);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    inputs.forEach((input) => {
      const error = document.querySelector(`#${input.id}-error`);
      editButton.addEventListener('click', function () {
        isNullInputValue(input, button, obj);
        clearValidateError(input, error, obj);
      });
      addButton.addEventListener('click', function () {
        isNullInputValue(input, button, obj);
        clearValidateError(input, error, obj);
      });
      input.addEventListener('input', () => {
        checkValidity(input, error, obj);
        toggleButtonState(inputs, button, obj);
      })
    })
  })
}

enableValidation({
  formSelector: '.popup__form',
  editButton : '.profile__edit-button',
  addButton : '.profile__add-button',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});