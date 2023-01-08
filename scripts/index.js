import { Card } from './Card.js';
import { FormValidator, config } from './FormValidator.js';

const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__title');
const job = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const popup = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const formElementProfile = popupProfile.querySelector('.popup__form');
const popupNewImage = document.querySelector('.popup_img');
const formElementImage = popupNewImage.querySelector('.popup__form');
const titleInput = popupNewImage.querySelector('#title');
const linkInput = popupNewImage.querySelector('#link');
const nameInput = formElementProfile.querySelector('#name');
const jobInput = formElementProfile.querySelector('#job');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popupOpenImage = document.querySelector('.popup_open-img');
const openImage = popupOpenImage.querySelector('.popup__open-img');
const captionImage = popupOpenImage.querySelector('.popup__caption-img');
const elementsList = document.querySelector('.elements__list');
const templateSelector = '.element_default';

function openPopup(popupElem) {
  popupElem.classList.add('popup_opened');
  document.addEventListener('keyup', handleKeyUp);
}

function closePopup(popupElem) {
  popupElem.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleKeyUp);
}

function viewImage(link, name) {
  openImage.src = link;
  openImage.alt = name;
  captionImage.textContent = name;
  openPopup(popupOpenImage);
}

const creatCard = (data, cardSelector) => {
  const element = new Card(data, cardSelector, viewImage);

  return element.generateCard();
}

function insertCard(array) {
  array.map(function (elem) {
    elementsList.append(creatCard(elem, templateSelector));
  })
}

function editProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupProfile);
}

function addImage(evt) {
  evt.preventDefault();
  const newElement = creatCard({ link: linkInput.value, name: titleInput.value }, templateSelector);
  elementsList.prepend(newElement);
  closePopup(popupNewImage);
  formElementImage.reset();
}

const handleKeyUp = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
    formElementImage.reset();
  }
}

insertCard(initialCards);

editButton.addEventListener('click', function () {
  nameInput.value = nameProfile.textContent;
  jobInput.value = job.textContent;
  openPopup(popupProfile);
  const validateFormElementProfile = new FormValidator(config, formElementProfile);
  validateFormElementProfile.enableValidation();
});

addButton.addEventListener('click', function () {
  formElementImage.reset();
  openPopup(popupNewImage);
  const validateFormElementImage = new FormValidator(config, formElementImage);
  validateFormElementImage.enableValidation();
});

closeButtons.forEach(function (elem) {
  const parentClass = elem.closest('.popup');
  elem.addEventListener('click', function () {
    closePopup(parentClass);
  });
})

popup.forEach((elem) => {
  elem.addEventListener('mousedown', (evt) => {
    if (!evt.target.closest('.popup__container') && !evt.target.closest('.popup__container-img')) {
      const openedPopup = evt.target.closest('.popup');
      closePopup(openedPopup);
    }
  })
})

formElementProfile.addEventListener('submit', editProfile);
formElementImage.addEventListener('submit', addImage);