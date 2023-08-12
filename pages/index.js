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

//------ IMPORTED CODE ------------------------

import {
  openModal,
  closeModal,
  enableClosingModalFeture,
  closeModalByEscape,
} from "../utils/utils.js";

import Card from "../components/Card.js";

//------- Close Modal with escape feture -------------------------------------------------=-
// ---- -- -- moved to utils.js
// function closeModalByEscape(evt) {
//   if (evt.key === "Escape") {
//     const currentlyOpenModal = document.querySelector(".modal_opened");
//     closeModal(currentlyOpenModal);
//   }
// }
//-------------------
/// ----- closing modal by clicking off of it feture --------------------------

const modalBackgrounds = Array.from(document.querySelectorAll(".modal"));

// ---- -- -- moved to utils.js
// const enableClosingModalFeture = (modalBackgrounds) => {
//   modalBackgrounds.forEach((background) => {
//     background.addEventListener("mousedown", (evt) => {
//       if (evt.target === background) {
//         closeModal(background);
//       }
//     });
//   });
// };
//---------------
enableClosingModalFeture(modalBackgrounds);

//----------------- DOM DECLARATIONS For profile edit modal ------------------------------------------------

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

//---- Template declarations ---
//----- moved  to card.js --
// const cardElementTemplate = document.querySelector("#cardElementTemplate")
//   .content.firstElementChild;
//--------------
const cardsList = document.querySelector(".cards__list");

//_________________________________________________________________________________________

//-----DOM Declarations for adding cards -------------------------------------------------------------

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

//--------Dom declarations for opening a modal -----------

const cardOpenModal = document.querySelector(".modal_card-open");

const cardOpenModalCloseButton = cardOpenModal.querySelector(
  ".modal__close-button"
);

//----------------------FUNCTIONS --------------------------------------------------------
// ---- -- -- moved to utils.js
// function openModal(popup) {
//   popup.classList.add("modal_opened");
//   document.addEventListener("keydown", closeModalByEscape);
// }

// function closeModal(popup) {
//   popup.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closeModalByEscape);
// }
//------------------
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

//---card loading function--------
//----- Moved to Card.js -- ---------
// function getCardElement(data) {
//   const cardElement = cardElementTemplate.cloneNode(true);
//   const cardImageElement = cardElement.querySelector(".card__image");
//   const cardTitleElement = cardElement.querySelector(".card__title");
//   const cardLikeButton = cardElement.querySelector(".card__like-button");
//   const cardDeleteButton = cardElement.querySelector(".card__delete-button");
//   const cardLikeButtonImage = cardLikeButton.querySelector(
//     ".card__button-image"
//   );

//   cardTitleElement.textContent = data.name;
//   cardImageElement.src = data.link;
//   cardImageElement.alt = data.name;

//   cardImageElement.addEventListener("click", () => {
//     const cardOpenModalImage = document.querySelector(".modal__opened-image");
//     const cardOpenModalText = document.querySelector(
//       ".modal__heading_type_open-image"
//     );

//     cardOpenModalText.textContent = cardTitleElement.textContent;
//     cardOpenModalImage.src = cardImageElement.src;
//     cardOpenModalImage.alt = `Photo of ${data.name}`;
//     openModal(cardOpenModal);
//   });

//   cardDeleteButton.addEventListener("click", () => {
//     console.log("clicked the delete button");
//     cardElement.remove();
//   });

//   cardLikeButton.addEventListener("click", () => {
//     const isLiked = cardLikeButton.dataset.liked === "true";

//     if (isLiked) {
//       cardLikeButton.dataset.liked = "false";
//       cardLikeButtonImage.src = "./images/Cardlikebutton.svg";
//       return;
//     }

//     cardLikeButton.dataset.liked = "true";
//     cardLikeButtonImage.src = "./images/LikeButtonActive.svg";
//   });

//   return cardElement;
// }
//--------------------------
//---add card functions-------------

function openCardAddModal() {
  openModal(cardAddModal);
  disableSubmitButton(cardAddModalSaveButton, config);
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
  const card = new Card(newCard, "#cardElementTemplate");
  cardsList.prepend(card.getCardElement());
}

//-- I made the above function work by changing the initial cards array to let from const.
//-- Alternitively i could leave it const and use the for each method to clear the array
//-- Maybe just making a new array and runing the for each on it  ??
//-- I opted to clear the array because I couldn't figure out how to just choose the last item in the array
//-- Senior student eexplained, running prepend and passing newcard instead of data

//--- card like button function----

function cardLikeButtonInteract() {
  console.log("like button was clicked");

  let cardButtonImage = cardLikeButton.firstElementChild;

  if ((cardButtonImage.src = "./images/Cardlikebutton.svg")) {
    cardButtonImage.src = "./images/LikeButtonActive.svg";
  } else {
    cardButtonImage.src = "./images/Cardlikebutton.svg";
  }
}

//-- Above is an artifact of trying to make a seprate like fuction instead of adding the ffunction to each button in the for each method

//-- cardOpenModal Functions -----

function openCardOpenModal() {
  openModal(cardOpenModal);
}

function closeCardOpenModal() {
  closeModal(cardOpenModal);
}

//________________________________________________________________________________________________

//------------------------ EVENTS ---------------------------------------------------------------

//---profile edit modal events

profileModalEditButton.addEventListener("click", openEditProfileModal);

profileModalCloseButton.addEventListener("click", closeEditProfileModal);

modalProfileForm.addEventListener("submit", saveEditProfileChanges);

//---card add modal events---------

cardModalAddButton.addEventListener("click", openCardAddModal);

cardAddModalCloseButton.addEventListener("click", closeCardAddModal);

cardAddModalForm.addEventListener("submit", saveAddCardChanges);

//---card Open modal events -------

cardOpenModalCloseButton.addEventListener("click", closeCardOpenModal);

//________________________________________________________________________________________________

//---- Nonsense that took to long to figure out because I wrote colneNode instead of cloneNode :( -----

initialCards.forEach((data) => {
  const card = new Card(data, "#cardElementTemplate");
  cardsList.prepend(card.getCardElement());
});

//--------Dom declarations and event setup for the like button -----------
// const cardLikeButtons = document.querySelectorAll(".card__like-button");

// cardLikeButtons.forEach((cardLikeButton) => {
//   cardLikeButton.addEventListener("click", () => {
//     console.log("like button clicked through annonomys function");
//     if (!cardLikeButton.classList.contains("like-button-active")) {
//       console.log("returned true");
//       cardLikeButton.classList.add("like-button-active");
//     } else {
//       console.log("returned false");
//       cardLikeButton.classList.remove("like-button-active");
//     }
//   });
// });
// -- Commented these out when I realised i could put the code into the getCardElement Function

//--delete button code also included in the get card element function----
