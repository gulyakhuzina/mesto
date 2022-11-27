let profile = document.querySelector('.profile');
let nameProfile = profile.querySelector('.profile__title');
let job = profile.querySelector('.profile__subtitle');
let editButton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');
let closeButton = popup.querySelector('.popup__close-button');

function closePopup () {
  popup.classList.remove ('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  nameProfile.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup ();
}

formElement.addEventListener('submit', formSubmitHandler);

editButton.addEventListener('click', function () {
  popup.classList.add ('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = job.textContent;
});

closeButton.addEventListener('click', closePopup);