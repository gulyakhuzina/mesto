const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__title');
const job = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_profile');
const formElementProfile = popupProfile.querySelector('.popup__form');
const popupNewImage = document.querySelector('.popup_img');
const formElementImage = popupNewImage.querySelector('.popup__form');
const titleInput = popupNewImage.querySelector('#title');
const linkInput = popupNewImage.querySelector('#link');
const nameInput = formElementProfile.querySelector('#name');
const jobInput = formElementProfile.querySelector('#job');
const closeButtons = document.querySelectorAll('.popup__close-button');
const imageTemplate = document.querySelector('#image').content; 
const popupOpenImage = document.querySelector('.popup_open-img');
const openImage = popupOpenImage.querySelector('.popup__open-img');
const captionImage = popupOpenImage.querySelector('.popup__caption-img');

const elementsList = document.querySelector('.elements__list');

function openPopup (popupElem) {
  popupElem.classList.add ('popup_opened');
}

function closePopup (popupElem) {
  popupElem.classList.remove ('popup_opened');
}

function creatCard (link, name) {
  const element = imageTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const likeButton = element.querySelector('.element__like-button');
  const elementTitle = element.querySelector('.element__title');

  elementImage.src = link;
  elementImage.alt = name;
  elementTitle.textContent = name;

  viewImage(elementImage);
  deleteCard(element);
  likeCard(likeButton);

  return (element);
}

function insertCard (array) {
  array.map(function(elem) {
    elementsList.append(creatCard(elem.link, elem.name));
  }) 
}

function editProfile (evt) {
  evt.preventDefault(); 
  nameProfile.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupProfile);
}

function addImage (evt) {
  evt.preventDefault(); 
  const newElement = creatCard(linkInput.value, titleInput.value);
  elementsList.prepend(newElement); 
  formElementImage.reset();
  closePopup(popupNewImage);
}

function deleteCard (elem) {
  const deleteImage = elem.querySelector('.element__basket');
  deleteImage.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.element').remove();
  });
}

function viewImage (elem) {
  elem.addEventListener('click', function (evt) {
    openPopup(popupOpenImage);
    const eventTarget = evt.target;
    openImage.src = eventTarget.parentElement.querySelector('.element__image').src;
    openImage.alt = eventTarget.parentElement.querySelector('.element__title').textContent;
    captionImage.textContent = eventTarget.parentElement.querySelector('.element__title').textContent;
  });
}

function likeCard (elem) {
  elem.addEventListener('click', function () {
    elem.classList.toggle('element__like-button_active');
  });
}

insertCard(initialCards);

editButton.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value = job.textContent;
});

addButton.addEventListener('click', function () {
  openPopup(popupNewImage);
});

closeButtons.forEach(function(elem) {
  const parentClass = elem.closest('.popup');
  elem.addEventListener('click', function() {
    closePopup(parentClass);
  });
})

formElementProfile.addEventListener('submit', editProfile);
formElementImage.addEventListener('submit', addImage);