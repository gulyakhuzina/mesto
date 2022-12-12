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
const imageTemplate = document.querySelector('#image').content; 
const popupOpenImage = document.querySelector('.popup_open-img');
const openImage = popupOpenImage.querySelector('.popup__open-img');
const captionImage = popupOpenImage.querySelector('.popup__caption-img');
const elementsList = document.querySelector('.elements__list');

function openPopup (popupElem) {
  popupElem.classList.add ('popup_opened');
  document.addEventListener('keyup', handleKeyUp);
}

function closePopup (popupElem) {
  popupElem.classList.remove ('popup_opened');
  document.removeEventListener('keyup', handleKeyUp);
}

function creatCard (link, name) {
  const element = imageTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const likeButton = element.querySelector('.element__like-button');
  const elementTitle = element.querySelector('.element__title');
  const deleteImage = element.querySelector('.element__basket');

  elementImage.src = link;
  elementImage.alt = name;
  elementTitle.textContent = name;

  elementImage.addEventListener('click', viewImage);

  deleteImage.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.element').remove();
  });

  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('element__like-button_active');
  });

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
  closePopup(popupNewImage);
  formElementImage.reset();
}

function viewImage (evt) {
  const eventTarget = evt.target;
  openImage.src = eventTarget.closest('.element').querySelector('.element__image').src;
  openImage.alt = eventTarget.closest('.element').querySelector('.element__title').textContent;
  captionImage.textContent = eventTarget.closest('.element').querySelector('.element__title').textContent;
  openPopup(popupOpenImage);
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
});

addButton.addEventListener('click', function () {
  openPopup(popupNewImage);
});

closeButtons.forEach(function(elem) {
  const parentClass = elem.closest('.popup');
  elem.addEventListener('click', function() {
    closePopup(parentClass);
    formElementImage.reset();
  });
})

popup.forEach((elem) => {
  elem.addEventListener('click', (evt) => {
    if (!evt.target.closest('.popup__container') && !evt.target.closest('.popup__container-img')) {
      const openedPopup = evt.target.closest('.popup');
      closePopup(openedPopup);
      formElementImage.reset();
    }
  })
})

formElementProfile.addEventListener('submit', editProfile);
formElementImage.addEventListener('submit', addImage);