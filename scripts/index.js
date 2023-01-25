import { Card } from './Card.js';
import { FormValidator, config } from './FormValidator.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

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
const nameInput = formElementProfile.querySelector('#name');
const infoInput = formElementProfile.querySelector('#info');
const popupOpenImageSelector = '.popup_open-img';
const templateSelector = '.element_default';
const cardSelector = '.elements__list';

function handleCardClick(initialCards) {
  const popupOpenImage = new PopupWithImage(initialCards, popupOpenImageSelector);
  popupOpenImage.open();
}

const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const element = new Card(item, templateSelector, handleCardClick);
    const cardElement = element.generateCard();
    cardList.addItem(cardElement);
  }
}, cardSelector);

cardList.renderItems();

const newInfoUser = new PopupWithForm({
  popupSelector: popupProfileSelector,
  handleFormSubmit: (formData) => {
    const userInfo = new UserInfo({
      nameElementSelector: nameSelector,
      infoElementSelector: infoSelector
    });
    userInfo.setUserInfo(formData);
    newInfoUser.close();
  }
})

newInfoUser.setEventListeners();

const newCardCreate = new PopupWithForm({
  popupSelector: popupNewImageSelector,
  handleFormSubmit: (formData) => {
    const newElement = new Card(formData, templateSelector, handleCardClick);
    const newCardElement = newElement.generateCard();
    cardList.addItem(newCardElement);
    newCardCreate.close();
  }
});

newCardCreate.setEventListeners();

const validateFormElementProfile = new FormValidator(config, formElementProfile);
validateFormElementProfile.enableValidation();
const validateFormElementImage = new FormValidator(config, formElementImage);
validateFormElementImage.enableValidation();

editButton.addEventListener('click', function () {
  const userInfo = new UserInfo({
    nameElementSelector: nameSelector,
    infoElementSelector: infoSelector
  });
  const dataUser = userInfo.getUserInfo();
  nameInput.value = dataUser.name;
  infoInput.value = dataUser.info;
  popupProfile.open();
});

addButton.addEventListener('click', function () {
  popupNewImage.open();
});

const popupProfile = new Popup(popupProfileSelector);
popupProfile.setEventListeners();

const popupNewImage = new Popup(popupNewImageSelector);
popupNewImage.setEventListeners();

const popupOpenImage = new PopupWithImage(initialCards, popupOpenImageSelector);
popupOpenImage.setEventListeners();