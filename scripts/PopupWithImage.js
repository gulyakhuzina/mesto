import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._link = data.link;
    this._name = data.name;
  }

  open() {
    const openImage = this._popupElement.querySelector('.popup__open-img');
    const captionImage = this._popupElement.querySelector('.popup__caption-img');
    super.open();
    openImage.src = this._link;
    openImage.alt = this._name;
    captionImage.textContent = this._name;
  }
}