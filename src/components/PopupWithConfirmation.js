import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupConfirmationSelector) {
    super(popupConfirmationSelector);
    this._popupForm = this._popupElement.querySelector('.popup__form');
  }

  setHandleSubmit (callback) {
    this._handleConfirmationSubmit = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleConfirmationSubmit();
    })
  }
}