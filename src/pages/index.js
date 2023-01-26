import './index.css';
import { initialCards, config, nameSelector, infoSelector, editButton, addButton, 
  popupProfileSelector, formElementProfile, popupNewImageSelector, formElementImage, 
  popupOpenImageSelector, templateSelector, cardSelector} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

function handleCardClick(initialCards) {
  popupOpenImage.open(initialCards);
}

function createCard(item) {
  const element = new Card(item, templateSelector, handleCardClick);
  return element.generateCard();
}

const popupOpenImage = new PopupWithImage(popupOpenImageSelector);
popupOpenImage.setEventListeners();

const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, cardSelector);

cardList.renderItems();

const userInfo = new UserInfo({
  nameElementSelector: nameSelector,
  infoElementSelector: infoSelector
});

const newInfoUser = new PopupWithForm({
  popupSelector: popupProfileSelector,
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    newInfoUser.close();
  }
})

newInfoUser.setEventListeners();

const newCardCreate = new PopupWithForm({
  popupSelector: popupNewImageSelector,
  handleFormSubmit: (formData) => {
    const newCardElement = createCard(formData);
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
  const dataUser = userInfo.getUserInfo();
  newInfoUser.setInputValues(dataUser);
  newInfoUser.open();
});

addButton.addEventListener('click', function () {
  newCardCreate.open();
});