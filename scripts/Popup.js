export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', (evt) => {
      this._handleEscClose(evt);
    });
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.addEventListener('keyup', (evt) => {
      this._handleEscClose(evt);
    });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      //const activePopup = document.querySelector('.popup_opened');
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popupElement.querySelector('.popup__close-button');

    closeButton.addEventListener('click', () => {
        this.close();
    });

    this._popupElement.addEventListener('mousedown', (evt) => {
      if (!evt.target.closest('.popup__container') && !evt.target.closest('.popup__container-img')) {
        this.close();
      }
    })
  }
}