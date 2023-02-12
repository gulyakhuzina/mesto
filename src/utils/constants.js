export const config = ({
  formSelector: '.popup__form',
  editButton : '.profile__edit-button',
  addButton : '.profile__add-button',
  avatarButton: '.profile__avatar-button',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error'
});

const profile = document.querySelector('.profile');
const nameSelector = '.profile__title';
const infoSelector = '.profile__subtitle';
const avatarSelector = '.profile__avatar-photo';
const avatar = document.querySelector(avatarSelector);
const avatarButton = profile.querySelector('.profile__avatar-button');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const popupProfileSelector = '.popup_profile';
const popupProfileElement = document.querySelector(popupProfileSelector);
const formElementProfile = popupProfileElement.querySelector('.popup__form');
const popupNewImageSelector = '.popup_img';
const popupNewImageElement = document.querySelector(popupNewImageSelector);
const formElementImage = popupNewImageElement.querySelector('.popup__form');
const popupOpenImageSelector = '.popup_open-img';
const popupConfirmationSelector = '.popup_confirmation';
const templateSelector = '.element_default';
const cardSelector = '.elements__list';
const popupAvatarSelector = '.popup_avatar';
const popupAvatarElement = document.querySelector(popupAvatarSelector);
const formElementAvatar = popupAvatarElement.querySelector('.popup__form');

export function renderLoading(isLoading, defaultText, popupButton) {
  if (isLoading) {
    popupButton.textContent = 'Сохранение...';
    popupButton.classList.add('popup__submit-button_disabled');
  } else {
    popupButton.textContent = defaultText;
  }
}

export {
  nameSelector, infoSelector, avatarSelector, avatarButton, editButton, 
  addButton, popupProfileSelector, formElementProfile, 
  popupNewImageSelector, formElementImage, popupOpenImageSelector, 
  popupConfirmationSelector, templateSelector, cardSelector,
  popupAvatarSelector, formElementAvatar, avatar
}