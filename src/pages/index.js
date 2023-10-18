const api = new Api({
  url: "https://around-api.en.tripleten-services.com/v1",
  authorization: "ed64b8cb-b7cb-483b-9267-3e840bed2c98",
});

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
  cardsList,
  profileModalEditButton,
  profileName,
  profileDescription,
  cardModalAddButton,
  modalConfirmDeleteCard,
  profileAvatarEditMOdal,
  profileAvatar,
} from "../utils/constants.js";

import Card from "../components/Card.js";

import { FormValidator } from "../components/FormValidator.js";

import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";

import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

/* -------------------------------------------------------------------------- */
/*                                  test area                                 */
/* -------------------------------------------------------------------------- */
api.getCurrentUser("/users/me", {
  name: profileName,
  about: profileDescription,
  avatar: profileAvatar,
});

const profileData = {
  name: profileName,
  job: profileDescription,
};

const currentUserInfo = new UserInfo(profileData);

console.log(profileData);

console.log(currentUserInfo.getUserInfo());

/* -------------------------------------------------------------------------- */
/*                              end of test area                              */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                             Profile Edit Feture                            */
/* -------------------------------------------------------------------------- */

const profileEditModalPopup = new PopupWithForm(
  "#modal_profile-edit",
  (data) => {
    currentUserInfo.setUserInfo(data.title, data.description);
    profileEditModalPopup.close();
    api.editCurrentUser("/users/me", data);
  }
);

const profileAvatarEditModalPopup = new PopupWithForm(
  "#modal_avatar-edit",
  (data) => {
    profileAvatarEditModalPopup.close();
    api.editUserAvatar("/users/me/avatar", data);
  }
);

// modalProfileForm.addEventListener("submit", saveEditProfileChanges);   ---might need this so leaving here

/* -------------------------------------------------------------------------- */
/*                               Add Card Feture                              */
/* -------------------------------------------------------------------------- */

const addCardModalPopup = new PopupWithForm(".modal_card-add", (data) => {
  const newCard = {
    name: data.title,
    link: data.url,
  };

  api.postCard("/cards", newCard);
});

function createCard(newCard) {
  const card = new Card(
    newCard,
    "#cardElementTemplate",
    () => {
      cardOpenModalPopup.open(newCard);
    },
    () => cardDeleteConfirm.open()
  );
  return card.getCardElement();
}

/* -------------------------------------------------------------------------- */
/*                              Open Card Feture                              */
/* -------------------------------------------------------------------------- */
const cardOpenModalPopup = new PopupWithImage(".modal_card-open");

/* -------------------------------------------------------------------------- */
/*                             Delete card fetureZ                            */
/* -------------------------------------------------------------------------- */

const cardDeleteConfirm = new PopupWithForm(".modal_confirm-delete-card");

/* -------------------------------------------------------------------------- */
/*                                 Page Interactions                          */
/* -------------------------------------------------------------------------- */

function openCardAddModal() {
  addCardModalPopup.open();
  formValidators["#form__add-card"].disableSubmitButton();
}

function openProfileAvatarEditModal() {
  profileAvatarEditModalPopup.open();
  formValidators["#modal_avatar-edit"].disableSubmitButton();
}

profileAvatar.addEventListener("click", openProfileAvatarEditModal);

cardModalAddButton.addEventListener("click", openCardAddModal);

function openEditProfileModal() {
  profileEditModalPopup.open();
  formValidators["#form__edit-profile"].disableSubmitButton();

  // call getUserInfo and save to a variable
  // set the value of the input elements
}

profileModalEditButton.addEventListener("click", openEditProfileModal);

/* -------------------------------------------------------------------------- */
/*                            Initializing Web Page                           */
/* -------------------------------------------------------------------------- */

/* --------------------------- Web Page Sections --------------------------- */
api.getCards("/cards");

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
cardsListSection.renderItems();

/* ---------------------- form validation configuration --------------------- */

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_invalid",
  errorClass: "modal__error_visible",
};

// const formElements = Array.from(document.querySelectorAll(".modal__form"));

/* ------- When new forms are added make sure to add to forms selector ------- */

const formSelectors = [
  "#form__edit-profile",
  "#form__add-card",
  "#modal_avatar-edit",
];

/* ----------------------------- Initial Scripts ---------------------------- */

//enableClosingModalFeature(modalBackgrounds);

// cardsListSection.renderItems()

const formValidators = {};

// formElements.forEach((formElement) => {
//   const formValidator = new FormValidator(config, formElement);
//   formValidator.enableValidation();
//   formValidator.disableSubmitButton();
// });

formSelectors.forEach((selector) => {
  const formElement = document.querySelector(selector);
  //create form validator
  const formValidator = new FormValidator(config, formElement);
  // enableValidation
  formValidator.enableValidation();
  formValidators[selector] = formValidator;
});

// use in open method

/* -------------------------------------------------------------------------- */
/*                               API CODE BELOW                               */
/* -------------------------------------------------------------------------- */

//delete is hard coded for now, will eventgually add input
api.deleteCard("/cards/", "652e8963beb738001aecbb32");

/* -------------------------------------------------------------------------- */
/*                               example request                              */
/* -------------------------------------------------------------------------- */

// function basicCall() {
//   return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
//     method: "GET",
//     headers: {
//       authorization: "ed64b8cb-b7cb-483b-9267-3e840bed2c98",
//     },
//   })
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Something went wrong ${res.status}`);
//     })
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => console.error(err))
//     .finally(console.log("Zug Zug"));
// }

// basicCall();

// fetch("https://around-api.en.tripleten-services.com/v1", {
//   method: "POST",
//   body: JSON.stringify({
//     name: "Sam",
//   }),
//   headers: {
//     "Content-Type": "application/json; charset=UTF-8",
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(`A user named ${json.name} has been added`));

// fetch("https//:wwww.somewebsite.com")
//   .then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Something went wrong: ${res.status}`);
//   })
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));
