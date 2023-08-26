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

/* -------------------------------------------------------------------------- */
/*                           //------ IMPORTED CODE                           */
/* -------------------------------------------------------------------------- */

import {
  openModal,
  closeModal,
  enableClosingModalFeature,
  // closeModalByEscape,
  profileEditModal,
  cardOpenModal,
  cardOpenModalCloseButton,
  cardsList,
  profileModalCloseButton,
  profileModalEditButton,
  profileName,
  profileDescription,
  inputProfileName,
  inputProfileDescription,
  // modalProfileSaveButton,
  modalProfileForm,
  cardAddModal,
  cardModalAddButton,
  cardAddModalCloseButton,
  // cardAddModalSaveButton,
  cardAddModalForm,
  inputCardName,
  inputImageLink,
} from "./utils/utils.js";

import Card from "./components/Card.js";

import { FormValidator } from "./components/FormValidator.js";

import "./pages/index.css";

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_invalid",
  errorClass: "modal__error_visible",
};

const formElements = Array.from(document.querySelectorAll(".modal__form"));

/* -------------------------------------------------------------------------- */
/*            /// ----- closing modal by clicking off of it feture            */
/* -------------------------------------------------------------------------- */

const modalBackgrounds = Array.from(document.querySelectorAll(".modal"));

enableClosingModalFeature(modalBackgrounds);

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */

//-- edit -profile functions----------

function openEditProfileModal() {
  openModal(profileEditModal);
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}

function closeEditProfileModal() {
  closeModal(profileEditModal);
}

function saveEditProfileChanges(evt) {
  evt.preventDefault();
  closeModal(profileEditModal);
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
}

/* -------------------------------------------------------------------------- */
/*                    //---add card functions-------------                    */
/* -------------------------------------------------------------------------- */

function createCard(newCard) {
  const card = new Card(newCard, "#cardElementTemplate");
  return card.getCardElement();
}

function openCardAddModal() {
  openModal(cardAddModal);
}

function closeCardAddModal() {
  closeModal(cardAddModal);
}

function saveAddCardChanges(evt) {
  evt.preventDefault();
  closeModal(cardAddModal);

  const name = inputCardName.value;
  const link = inputImageLink.value;
  inputCardName.value = "";
  inputImageLink.value = "";
  const newCard = {
    name: name,
    link: link,
  };

  cardsList.prepend(createCard(newCard));
}

//-- I made the above function work by changing the initial cards array to let from const.
//-- Alternitively i could leave it const and use the for each method to clear the array
//-- Maybe just making a new array and runing the for each on it  ??
//-- I opted to clear the array because I couldn't figure out how to just choose the last item in the array
//-- Senior student eexplained, running prepend and passing newcard instead of data

/* -------------------------------------------------------------------------- */
/*                     //-- cardOpenModal Functions -----                     */
/* -------------------------------------------------------------------------- */

function closeCardOpenModal() {
  closeModal(cardOpenModal);
}

//________________________________________________________________________________________________

/* -------------------------------------------------------------------------- */
/*                      //------------------------ EVENTS                     */
/* -------------------------------------------------------------------------- */
/* --------------------- //---profile edit modal events --------------------- */

profileModalEditButton.addEventListener("click", openEditProfileModal);

profileModalCloseButton.addEventListener("click", closeEditProfileModal);

modalProfileForm.addEventListener("submit", saveEditProfileChanges);

/* ------------------- //---card add modal events--------- ------------------ */

cardModalAddButton.addEventListener("click", openCardAddModal);

cardAddModalCloseButton.addEventListener("click", closeCardAddModal);

cardAddModalForm.addEventListener("submit", saveAddCardChanges);

/* ------------------- //---card Open modal events ------- ------------------ */

cardOpenModalCloseButton.addEventListener("click", closeCardOpenModal);

//________________________________________________________________________________________________

initialCards.forEach((data) => {
  cardsList.prepend(createCard(data));
});

formElements.forEach((formElement) => {
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();
  console.log("validator counter");
});
