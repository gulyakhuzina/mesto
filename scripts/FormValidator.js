export class FormValidator {
  constructor(data, formElement) {
    this._editButton = data.editButton;
    this._addButton = data.addButton;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;

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

  _isNullInputValue(inputElement) {
    if (inputElement.value === '') {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = 'disabled';
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = '';
    }
  }

  _clearValidateError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }

  _setEventListeners() {
    const editButtonElement = document.querySelector(this._editButton);
    const addButtonElement = document.querySelector(this._addButton);

    this._inputs.forEach((inputElement) => {
      editButtonElement.addEventListener('click', () => {
        this._isNullInputValue(inputElement);
        this._clearValidateError(inputElement);
      });
  
      addButtonElement.addEventListener('click', () => {
        this._isNullInputValue(inputElement);
        this._clearValidateError(inputElement);
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

export const config = ({
  formSelector: '.popup__form',
  editButton : '.profile__edit-button',
  addButton : '.profile__add-button',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error'
});