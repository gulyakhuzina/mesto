export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    const buttonClose = this._popupElement.querySelector('.popup__close-button');

    buttonClose.addEventListener('click', () => {
        this.close();
    });

    this._popupElement.addEventListener('mousedown', (evt) => {
      if (!evt.target.closest('.popup__container') && !evt.target.closest('.popup__container-img')) {
        this.close();
      }
    })
  }
}