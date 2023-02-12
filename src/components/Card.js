export class Card {
  constructor({data, myUserId, handleCardClick, handleDeleteClick, handleLikeClick}, cardSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._myUserId = myUserId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard(userId) {
    this._element = this._getTemplate();

    this._cardtImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');
    this._basketButton = this._element.querySelector('.element__basket');
    this._likesCount = this._element.querySelector('.element__like-count');
    this._likeButton = this._element.querySelector('.element__like-button');

    this._cardtImage.src = this._link;
    this._cardtImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._likesCount.textContent = this._likes.length;

    if (this._ownerId != userId) {
      this._basketButton.remove();
    }  

    if (this.isLiked()) {
      this._likeButton.classList.add('element__like-button_active');
    }  

    this._setEventListeners();

    return this._element;
  }

  deleteElement() {
    this._element.remove();
    this._element = null;
  }

  isLiked() {
    const isLiked = this._likes.some(like => like._id === this._myUserId);
    return isLiked;
  }

  setLikes(likesArray) {
    this._likes = likesArray;
    this._likesCount.textContent = this._likes.length;
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _setEventListeners() {
    this._cardtImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    })

    if (this._basketButton) {
      this._basketButton.addEventListener('click', () => {
        this._handleDeleteClick(this._id);
      });
    }

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });
  }
}