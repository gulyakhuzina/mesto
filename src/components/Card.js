export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardtImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');

    this._cardtImage.src = this._link;
    this._cardtImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__like-button');
    this._basketButton= this._element.querySelector('.element__basket');

    this._cardtImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    })

    this._basketButton.addEventListener('click', function (evt) {
      const eventTarget = evt.target;
      eventTarget.closest('.element').remove();
    });

    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('element__like-button_active');
    });
  }
}