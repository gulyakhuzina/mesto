export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const config = ({
  formSelector: '.popup__form',
  editButton : '.profile__edit-button',
  addButton : '.profile__add-button',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error'
});

const profile = document.querySelector('.profile');
const nameSelector = '.profile__title';
const infoSelector = '.profile__subtitle';
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const popupProfileSelector = '.popup_profile';
const popupProfileElement = document.querySelector(popupProfileSelector);
const formElementProfile = popupProfileElement.querySelector('.popup__form');
const popupNewImageSelector = '.popup_img';
const popupNewImageElement = document.querySelector(popupNewImageSelector);
const formElementImage = popupNewImageElement.querySelector('.popup__form');
const popupOpenImageSelector = '.popup_open-img';
const templateSelector = '.element_default';
const cardSelector = '.elements__list';

export {
  nameSelector, infoSelector, editButton, addButton, 
  popupProfileSelector, formElementProfile, 
  popupNewImageSelector, formElementImage, 
  popupOpenImageSelector, templateSelector, cardSelector
}