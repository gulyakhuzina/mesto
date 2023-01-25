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

    const elementImage = this._element.querySelector('.element__image');
    const elementTitle = this._element.querySelector('.element__title');

    elementImage.src = this._link;
    elementImage.alt = this._name;
    elementTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    const buttonLike = this._element.querySelector('.element__like-button');
    const elementImage = this._element.querySelector('.element__image');
    const elementBasket= this._element.querySelector('.element__basket');

    elementImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    })

    elementBasket.addEventListener('click', function (evt) {
      const eventTarget = evt.target;
      eventTarget.closest('.element').remove();
    });

    buttonLike.addEventListener('click', function () {
      buttonLike.classList.toggle('element__like-button_active');
    });
  }
}

