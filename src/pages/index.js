const api = new Api({
  url: "https://around-api.en.tripleten-services.com/v1",
  authorization: "ed64b8cb-b7cb-483b-9267-3e840bed2c98",
});

// const initialCards = [
//   {
//     name: "YValley",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
//   },
//   {
//     name: "Lake Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
//   },
// ];
// console.log(initialCards);
/* -------------------------------------------------------------------------- */
/*                           //------ IMPORTED CODE                           */
/* -------------------------------------------------------------------------- */

import {
  cardsList,
  profileModalEditButton,
  profileName,
  profileDescription,
  cardModalAddButton,
  // modalConfirmDeleteCard,
  // profileAvatarEditMOdal,
  profileAvatar,
  profileAvatarOverlay,
} from "../utils/constants.js";

import Card from "../components/Card.js";

import { FormValidator } from "../components/FormValidator.js";

import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";

import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopUpWithConfirm.js";

/* -------------------------------------------------------------------------- */
/*                                  test area                                 */
/* -------------------------------------------------------------------------- */
api
  .getCurrentUser()
  .then((result) => {
    console.log(result);
    console.log("umm now what??");
    currentUserInfo.setUserInfo(result.name, result.about);
    currentUserInfo.setUserAvatar(result);
    console.log(currentUserInfo.getUserInfo());
    // profileName.textContent = result.name;
    // profileDescription.textContent = result.about;
    // profileAvatar.src = result.avatar;
    // const profileData = {
    //   name: result.name,
    //   job: result.about,
    // };
    // return profileData;
  })
  .catch((err) => console.error(err));

const profileData = {
  name: profileName,
  job: profileDescription,
  avatar: profileAvatar,
};

const currentUserInfo = new UserInfo(profileData);

//console.log(profileData);

//console.log(currentUserInfo.getUserInfo());

/* -------------------------------------------------------------------------- */
/*                              end of test area                              */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                             Profile Edit Feture                            */
/* -------------------------------------------------------------------------- */

const profileEditModalPopup = new PopupWithForm(
  "#modal_profile-edit",
  (data) => {
    //currentUserInfo.setUserInfo(data.title, data.description);
    //profileEditModalPopup.close();
    //profileEditModalPopup.updating();
    profileEditModalPopup.setSaveButtonText("Updating");

    api
      .editCurrentUser(data)
      .then(() => {
        currentUserInfo.setUserInfo(data.title, data.description);
        profileEditModalPopup.close();
      })

      .catch((err) => console.error(err))
      .finally(() => {
        profileEditModalPopup.setSaveButtonText("Save");
      });
  }
);

const profileAvatarEditModalPopup = new PopupWithForm(
  "#modal_avatar-edit",
  (data) => {
    // profileAvatarEditModalPopup.close();
    // profileAvatarEditModalPopup.updating();
    profileAvatarEditModalPopup.setSaveButtonText("Updating");
    api
      .editUserAvatar(data)
      .then((res) => {
        profileAvatar.src = res.avatar;
        currentUserInfo.setUserAvatar(res);
        profileAvatarEditModalPopup.close();
      })

      .catch((err) => console.error(err))
      .finally(() => {
        profileEditModalPopup.setSaveButtonText("Save");
      });
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

  addCardModalPopup.setSaveButtonText("Updating");

  api
    .postCard(newCard)
    .then((res) => {
      console.log(res);
      const cardElement = createCard(res);
      cardsListSection.addItem(cardElement);
      addCardModalPopup.close();
    })

    .catch((err) => console.error(err))
    .finally(() => {
      addCardModalPopup.setSaveButtonText("Save");
    });
});

function createCard(newCard) {
  const card = new Card(
    newCard,
    "#cardElementTemplate",
    () => {
      cardOpenModalPopup.open(newCard);
    },

    () => {
      const cardDeleteConfirm = new PopupWithConfirm(
        ".modal_confirm-delete-card",
        () => {
          cardDeleteConfirm.setSaveButtonText("Deleting");
          api
            .deleteCard(newCard._id)
            .then(() => {
              card.removeSelf();
              cardDeleteConfirm.close();
            })

            .catch((err) => console.error(err))
            .finally(() => {
              cardDeleteConfirm.setSaveButtonText("Yes");
            });
          //card.removeSelf();
        }
      );
      cardDeleteConfirm.open();
    },

    () => {
      if (card.isLiked()) {
        api
          .disLikeCard(newCard._id)
          .then((response) => card.setIsLiked(response.isLiked))

          .catch((err) => console.error(err));
      } else {
        api
          .likeCard(newCard._id)
          .then((response) => card.setIsLiked(response.isLiked))

          .catch((err) => console.error(err));
      }
      //   console.log("API for like event fired");

      //   api.likeCard("/cards/", newCard._id).catch((err) => console.error(err));
      // },
      // () => {
      //   console.log("API for dislike event fired");
    }

    //api.likeCard("/cards/", "65306057369eff001aa738d9");
    //api.disLikeCard("/cards/", "65306057369eff001aa738d9");
  );
  return card.getCardElement();
}

/* -------------------------------------------------------------------------- */
/*                              Open Card Feture                              */
/* -------------------------------------------------------------------------- */
const cardOpenModalPopup = new PopupWithImage(".modal_card-open");

/* -------------------------------------------------------------------------- */
/*                             Delete card feture                            */
/* -------------------------------------------------------------------------- */

// const cardDeleteConfirm = new PopupWithConfirm(
//   ".modal_confirm-delete-card",
//   api.deleteCard()
// );

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

profileAvatarOverlay.addEventListener("click", openProfileAvatarEditModal);

cardModalAddButton.addEventListener("click", openCardAddModal);

function openEditProfileModal() {
  const userInputData = currentUserInfo.getUserInfo();
  console.log(userInputData);
  profileEditModalPopup.setInputValues(userInputData);
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

let cardsListSection;

// = new Section(
//   {
//     items: initialCards,
//     renderer: (data) => {
//       const card = createCard(data);
//       cardsListSection.appendItem(card);
//     },
//   },
//   cardsList
// );
// cardsListSection.renderItems();

api
  .getCards()
  .then((initialCards) => {
    cardsListSection = new Section(
      {
        items: initialCards,
        renderer: (data) => {
          const card = createCard(data);
          cardsListSection.appendItem(card);
        },
      },
      cardsList
    );
    cardsListSection.renderItems(initialCards);
  })
  .catch((err) => console.error(err));

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
//api.deleteCard("/cards/", "652e8963beb738001aecbb32");

//api.likeCard("/cards/", "65306057369eff001aa738d9");
//api.disLikeCard("/cards/", "65306057369eff001aa738d9");
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
