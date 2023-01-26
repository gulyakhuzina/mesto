export class FormValidator {
  constructor(validationConfig, formElement) {
    this._editButton = validationConfig.editButton;
    this._addButton = validationConfig.addButton;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;

    this._formElement = formElement;
    this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _checkValidity(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (inputElement.validity.valid) {
      errorElement.textContent = '';
      inputElement.classList.remove(this._inputErrorClass);
    } else {
      errorElement.textContent = errorMessage;
      inputElement.classList.add(this._inputErrorClass);
    }
  }

  _toggleButtonState() {
    const isFormValid = this._inputs.every((input) => {
      return input.validity.valid;
    })
  
    if (isFormValid) {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = '';
    } else {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = 'disabled';
    }
  }

  _clearValidateError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputs.forEach((inputElement) => {
      this._formElement.addEventListener('reset', () => {
        setTimeout(() => {
          this._clearValidateError(inputElement);
          this._toggleButtonState();
        }, 0);
      });

      inputElement.addEventListener('input', () => {
        this._checkValidity(inputElement, inputElement.validationMessage);
        this._toggleButtonState();
      })
    })
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    this._setEventListeners();
  }
}