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
  closeModalByEscape,
} from "../utils/utils.js";

import Card from "../components/Card.js";

import { FormValidator } from "../components/FormValidator.js";

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_invalid",
  errorClass: "modal__error_visible",
};

const formElements = Array.from(document.querySelectorAll(".modal__form"));

// const disableSubmitButton = (formButton, settings) => {
//   formButton.classList.add(settings.inactiveButtonClass);
//   formButton.disabled = true;
// };

// const enableSubmitButton = (formButton, settings) => {
//   formButton.classList.remove(settings.inactiveButtonClass);
//   formButton.disabled = false;
// };

/* -------------------------------------------------------------------------- */
/*            /// ----- closing modal by clicking off of it feture            */
/* -------------------------------------------------------------------------- */

const modalBackgrounds = Array.from(document.querySelectorAll(".modal"));

enableClosingModalFeature(modalBackgrounds);

/* -------------------------------------------------------------------------- */
/*         //----------------- DOM DECLARATIONS For profile edit modal        */
/* -------------------------------------------------------------------------- */

const profileEditModal = document.querySelector(".modal_profile-edit");

const profileModalCloseButton = profileEditModal.querySelector(
  ".modal__close-button"
);

const profileModalEditButton = document.querySelector(".edit-button");

const profileName = document.querySelector(".profile__title");

const profileDescription = document.querySelector(".profile__description");

const inputProfileName = profileEditModal.querySelector(
  ".modal__input_type_name"
);

const inputProfileDescription = profileEditModal.querySelector(
  ".modal__input_type_description"
);

const modalProfileSaveButton = profileEditModal.querySelector(
  ".modal__save-button"
);

const modalProfileForm = profileEditModal.querySelector(".modal__form");

/* -------------------------------------------------------------------------- */
/*                    //---- Card list DOM declarations ---                   */
/* -------------------------------------------------------------------------- */

const cardsList = document.querySelector(".cards__list");

//_________________________________________________________________________________________

/* -------------------------------------------------------------------------- */
/*                  //-----DOM Declarations for adding cards                  */
/* -------------------------------------------------------------------------- */

const cardModalAddButton = document.querySelector(".add-button");

const cardAddModal = document.querySelector(".modal_card-add");

const cardAddModalCloseButton = cardAddModal.querySelector(
  ".modal__close-button"
);

const cardAddModalSaveButton = cardAddModal.querySelector(
  ".modal__save-button"
); //This was removed because instead of a save button, the submit evennty listener on the form is better ,later  re added for validation reasons

const cardAddModalForm = cardAddModal.querySelector(".modal__form");

const inputCardName = cardAddModal.querySelector(".modal__input_type_name");

const inputImageLink = cardAddModal.querySelector(
  ".modal__input_type_description"
);

/* -------------------------------------------------------------------------- */
/*         //--------Dom declarations for opening a modal -----------         */
/* -------------------------------------------------------------------------- */

const cardOpenModal = document.querySelector(".modal_card-open");

const cardOpenModalCloseButton = cardOpenModal.querySelector(
  ".modal__close-button"
);

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

function openCardOpenModal() {
  openModal(cardOpenModal);
}

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
