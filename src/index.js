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
  // openModal,
  closeModal,
  enableClosingModalFeature,
  // closeModalByEscape,
  // profileEditModal,
  cardOpenModal,
  // cardOpenModalCloseButton,
  cardsList,
  // profileModalCloseButton,
  profileModalEditButton,
  profileName,
  profileDescription,
  inputProfileName,
  inputProfileDescription,
  // modalProfileSaveButton,
  // modalProfileForm,
  // cardAddModal,
  cardModalAddButton,
  // cardAddModalCloseButton,
  // cardAddModalSaveButton,
  // cardAddModalForm,
  inputCardName,
  inputImageLink,
  modalBackgrounds,
} from "./utils/utils.js";

import Card from "./components/Card.js";

import { FormValidator } from "./components/FormValidator.js";

import "./pages/index.css";
import PopupWithForm from "./components/PopupWithForm.js";
import Popup from "./components/Popup.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";

/* -------------------------------------------------------------------------- */
/*                                  test area                                 */
/* -------------------------------------------------------------------------- */

const profileData = {
  name: profileName.textContent,
  job: profileDescription.textContent,
};

const currentUserInfo = new UserInfo(profileData);

console.log(profileData);

console.log(currentUserInfo.getUserInfo());

/* -------------------------------------------------------------------------- */
/*                              end of test area                              */
/* -------------------------------------------------------------------------- */

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

enableClosingModalFeature(modalBackgrounds);

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                          PROFILE EDIT MODAL STUFF                          */
/* -------------------------------------------------------------------------- */

const profileEditModalPopup = new PopupWithForm("#modal_profile-edit", () => {
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  currentUserInfo.setUserInfo();
  profileEditModalPopup.close();
});

function openEditProfileModal() {
  profileEditModalPopup.open();
}

profileModalEditButton.addEventListener("click", openEditProfileModal);

// modalProfileForm.addEventListener("submit", saveEditProfileChanges);   ---might need this so leaving here

/* -------------------------------------------------------------------------- */
/*                    //---add card functions-------------                    */
/* -------------------------------------------------------------------------- */

const addCardModalPopup = new PopupWithForm(".modal_card-add", () => {
  const name = inputCardName.value;
  const link = inputImageLink.value;
  inputCardName.value = "";
  inputImageLink.value = "";
  const newCard = {
    name: name,
    link: link,
  };

  cardsList.prepend(createCard(newCard));
});

const cardOpenModalPopup = new PopupWithImage(".modal_card-open");

function createCard(newCard) {
  const card = new Card(newCard, "#cardElementTemplate", () => {
    cardOpenModalPopup.open(newCard);
  });
  return card.getCardElement();
}

function openCardAddModal() {
  addCardModalPopup.open();
}

/* ------------------- //---card add modal events--------- ------------------ */

cardModalAddButton.addEventListener("click", openCardAddModal);

// cardAddModalCloseButton.addEventListener("click", closeCardAddModal);

// cardAddModalForm.addEventListener("submit", saveAddCardChanges);

/* -------------------------------------------------------------------------- */
/*                     //-- cardOpenModal Functions -----                     */
/* -------------------------------------------------------------------------- */

function closeCardOpenModal() {
  closeModal(cardOpenModal);
}

/* ------------------- //---card Open modal events ------- ------------------ */

function handleCardClick() {
  cardOpenModalPopup.open();
}

// cardOpenModalCloseButton.addEventListener("click", closeCardOpenModal);

//________________________________________________________________________________________________

initialCards.forEach((data) => {
  cardsList.prepend(createCard(data));
});

formElements.forEach((formElement) => {
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();
  console.log("validator counter");
});
