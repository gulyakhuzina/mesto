import './index.css';
import { config, nameSelector, avatarSelector, avatarButton, infoSelector, editButton, addButton, 
  popupProfileSelector, formElementProfile, popupNewImageSelector, formElementImage, 
  popupOpenImageSelector, popupConfirmationSelector, templateSelector, cardSelector,
  popupAvatarSelector, formElementAvatar, avatar} from '../utils/constants.js';
import { renderLoading } from '../utils/constants.js';
import { api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';

function createCard(data) {
  const element = new Card({
    data, 
    myUserId,
    handleCardClick: (data) => {
      popupOpenImage.open(data);
    },
    handleDeleteClick: (id) => {
      popupConfirmation.setHandleSubmit( () => {
        api.deleteCard(id)
          .then(res => {
            console.log(res);
            element.deleteElement();
            popupConfirmation.close();
          })
          .catch((err) => {
            console.log(err)
          })
      })
      popupConfirmation.open();
    },
    handleLikeClick: (id) => {
      if (element.isLiked()) {
        api.deleteLikeCard(id)
          .then(res => {
            console.log(res);
            element.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        api.likeCard(id)
          .then(res => {
            console.log(res);
            element.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }, templateSelector);
  return element.generateCard(myUserId);
}

let myUserId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardsData, userData]) => {
    myUserId = userData._id;
    cardList.renderItems(cardsData.reverse());
    userInfo.setUserInfo(userData);
    avatar.src = userData.avatar;
  })
  .catch((err) => {
    console.log(err)
  })

const cardList = new Section ({
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, cardSelector);

const userInfo = new UserInfo({
  nameElementSelector: nameSelector,
  infoElementSelector: infoSelector,
});

const popupOpenImage = new PopupWithImage(popupOpenImageSelector);
popupOpenImage.setEventListeners();

const popupConfirmation = new PopupWithConfirmation(popupConfirmationSelector);
popupConfirmation.setEventListeners();

const popupAvatar = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  handleFormSubmit: (data) => {
    const popupButton = document.querySelector(popupAvatarSelector).querySelector('.popup__submit-button');
    const defaultText = popupButton.textContent;
    renderLoading(true, defaultText, popupButton);
    api.editAvatar(data)
      .then(res => {
        console.log(res);
        avatar.src = res.avatar;
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        renderLoading(false, defaultText, popupButton);
      })
  }
})
popupAvatar.setEventListeners();

const newInfoUser = new PopupWithForm({
  popupSelector: popupProfileSelector,
  handleFormSubmit: (data) => {
    const popupButton = document.querySelector(popupProfileSelector).querySelector('.popup__submit-button');
    const defaultText = popupButton.textContent;
    renderLoading(true, defaultText, popupButton);
    api.editUserInfo(data)
      .then(res => {
        console.log(res);
        newInfoUser.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, defaultText, popupButton);
      })
    userInfo.setUserInfo(data);
  }
})
newInfoUser.setEventListeners();

const newCardCreate = new PopupWithForm({
  popupSelector: popupNewImageSelector,
  handleFormSubmit: (data) => {
    const popupButton = document.querySelector(popupNewImageSelector).querySelector('.popup__submit-button');
    const defaultText = popupButton.textContent;
    renderLoading(true, defaultText, popupButton);
    api.addCard(data)
      .then(res => {
        const newCardElement = createCard(res);
        cardList.addItem(newCardElement);
        newCardCreate.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        renderLoading(false, defaultText, popupButton);
      })
  }
});
newCardCreate.setEventListeners();

const validateFormElementProfile = new FormValidator(config, formElementProfile);
validateFormElementProfile.enableValidation();
const validateFormElementImage = new FormValidator(config, formElementImage);
validateFormElementImage.enableValidation();
const validateformElementAvatar = new FormValidator(config, formElementAvatar);
validateformElementAvatar.enableValidation();

editButton.addEventListener('click', function () {
  const dataUser = userInfo.getUserInfo();
  newInfoUser.setInputValues(dataUser);
  newInfoUser.open();
});

addButton.addEventListener('click', function () {
  newCardCreate.open();
});

avatarButton.addEventListener('click', () => {
  popupAvatar.open();
})