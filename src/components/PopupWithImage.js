import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._openImage = this._popupElement.querySelector('.popup__open-img');
    this._captionImage = this._popupElement.querySelector('.popup__caption-img');
  }

  open(data) {
    this._link = data.link;
    this._name = data.name;
    super.open();
    this._openImage.src = this._link;
    this._openImage.alt = this._name;
    this._captionImage.textContent = this._name;
  }
}