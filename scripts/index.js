const initialCards = [
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

const profileEditModal = document.querySelector(".modal");

const profileModalCloseButton = document.querySelector(".modal__close-button");

const profileModalEditButton = document.querySelector(".edit-button");

const profileName = document.querySelector(".profile__title");

const profileDescription = document.querySelector(".profile__description");

const inputProfileName = document.querySelector(".modal__input_type_name");

const inputProfileDescription = document.querySelector(
  ".modal__input_type_description"
);

const modalSaveButton = document.querySelector(".modal__save-button");

const modalForm = document.querySelector(".modal__form");

const cardElementTemplate = document.querySelector("#cardElementTemplate")
  .content.firstElementChild;

const cardsList = document.querySelector(".cards__list");

//_________________________________________________________________________________________

//----------------------FUNCTIONS --------------------------------------------------------

function openModal() {
  profileEditModal.classList.add("modal_opened");
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}

function closeModal() {
  profileEditModal.classList.remove("modal_opened");
}

function saveEditProfileChanges(evt) {
  evt.preventDefault();
  profileEditModal.classList.remove("modal_opened");
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

profileModalEditButton.addEventListener("click", openModal);

profileModalCloseButton.addEventListener("click", closeModal);

modalForm.addEventListener("submit", saveEditProfileChanges);

//________________________________________________________________________________________________

//---- Nonsense that took to long to figure out because I wrote colneNode instead of cloneNode :( -----

initialCards.forEach((data) => {
  cardsList.prepend(getCardElement(data));
});
