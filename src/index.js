const initialCards = [
  {
    name: "YValley",
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
  // closeModal,
  enableClosingModalFeature,
  // closeModalByEscape,
  // profileEditModal,
  // cardOpenModal,
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
// import Popup from "./components/Popup.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";

/* -------------------------------------------------------------------------- */
/*                                  test area                                 */
/* -------------------------------------------------------------------------- */

console.log(cardsList);

/* -------------------------------------------------------------------------- */
/*                              end of test area                              */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                             Profile Edit Feture                            */
/* -------------------------------------------------------------------------- */

const profileEditModalPopup = new PopupWithForm("#modal_profile-edit", () => {
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  currentUserInfo.setUserInfo();
  profileEditModalPopup.close();
});

// modalProfileForm.addEventListener("submit", saveEditProfileChanges);   ---might need this so leaving here

/* -------------------------------------------------------------------------- */
/*                               Add Card Feture                              */
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

  cardsListSection.addItem(createCard(newCard));

  // cardsList.prepend(createCard(newCard));
});

function createCard(newCard) {
  const card = new Card(newCard, "#cardElementTemplate", () => {
    cardOpenModalPopup.open(newCard);
  });
  return card.getCardElement();
}

/* -------------------------------------------------------------------------- */
/*                              Open Card Feture                              */
/* -------------------------------------------------------------------------- */
const cardOpenModalPopup = new PopupWithImage(".modal_card-open");

/* -------------------------------------------------------------------------- */
/*                                 Page Interactions                          */
/* -------------------------------------------------------------------------- */

function openCardAddModal() {
  addCardModalPopup.open();
}

cardModalAddButton.addEventListener("click", openCardAddModal);

function openEditProfileModal() {
  profileEditModalPopup.open();
}

profileModalEditButton.addEventListener("click", openEditProfileModal);

/* -------------------------------------------------------------------------- */
/*                            Initializing Web Page                           */
/* -------------------------------------------------------------------------- */

/* --------------------------- Web Page Secttions --------------------------- */

const cardsListSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = createCard(data);
      cardsListSection.addItem(card);
    },
  },
  cardsList
);

/* ---------------------- form validation configuration --------------------- */

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_invalid",
  errorClass: "modal__error_visible",
};

const formElements = Array.from(document.querySelectorAll(".modal__form"));

/* ----------------------------- Initial Scripts ---------------------------- */

enableClosingModalFeature(modalBackgrounds);

// initialCards.forEach((data) => {
//   cardsListSection.addItem(createCard(data));
// });

cardsListSection.renderItems();

formElements.forEach((formElement) => {
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();
  console.log("validator counter");
});
