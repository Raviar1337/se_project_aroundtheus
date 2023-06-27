let initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

//----------------- DOM DECLARATIONS ------------------------------------------------

let modal = document.querySelector(".modal");

let modalCloseButton = document.querySelector(".modal__close-button");

let editButton = document.querySelector(".edit-button");

let profileName = document.querySelector(".profile__title");

let profileDescription = document.querySelector(".profile__description");

let inputProfileName = document.querySelector(".modal__input_type_name");

let inputProfileDescription = document.querySelector(
  ".modal__input_type_description"
);

let modalSaveButton = document.querySelector(".modal__save-button");

let modalForm = document.querySelector(".modal__form");

let cardElementTemplate = document.querySelector("#cardElementTemplate").content
  .firstElementChild;

let cardsList = document.querySelector(".cards__list");

// let cardElement = cardElementTemplate.querySelector(".card").cloneNode(true);
//_________________________________________________________________________________________

//----------------------FUNCTIONS --------------------------------------------------------

function openModal() {
  modal.classList.add("modal_opened");
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}

function closeModal() {
  modal.classList.remove("modal_opened");
}

function saveEditProfileChanges(evt) {
  evt.preventDefault();
  modal.classList.remove("modal_opened");
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
}

function getCardElement(data) {
  let cardElement = cardElementTemplate.cloneNode(true);
  let cardImageElement = cardElement.querySelector(".card__image");
  let cardTitleElement = cardElement.querySelector(".card__title");
  cardTitleElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  return cardElement;
}

//________________________________________________________________________________________________

//------------------------ EVENTS ---------------------------------------------------------------

editButton.addEventListener("click", openModal);

modalCloseButton.addEventListener("click", closeModal);

modalForm.addEventListener("submit", saveEditProfileChanges);

//________________________________________________________________________________________________

//---- Nonsense that took to long to figure out because I wrote colneNode instead of cloneNode :( -----

initialCards.forEach((data) => {
  cardsList.prepend(getCardElement(data));
});
