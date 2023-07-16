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

//----------------- DOM DECLARATIONS For profile edit modal ------------------------------------------------

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

//-----DOM Declarations for adding cards -------------------------------------------------------------

const arrModal = document.querySelectorAll(".modal");

const cardModalAddButton = document.querySelector(".add-button");

const cardAddModal = arrModal[1];

const cardAddModalCloseButton = cardAddModal.querySelector(
  ".modal__close-button"
);

const cardAddModalSaveButton = cardAddModal.querySelector(
  ".modal__save-button"
);

const inputCardName = cardAddModal.querySelector(".modal__input_type_name");

const inputImageLink = cardAddModal.querySelector(
  ".modal__input_type_description"
);

//--------Dom declarations for the like button -----------

//----------------------FUNCTIONS --------------------------------------------------------

//---profile edit functions----------

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

//---card loading function--------

function getCardElement(data) {
  let cardElement = cardElementTemplate.cloneNode(true);
  let cardImageElement = cardElement.querySelector(".card__image");
  let cardTitleElement = cardElement.querySelector(".card__title");
  let cardLikeButton = cardElement.querySelector(".card__like-button");
  let cardDeleteButton = cardElement.querySelector(".card__delete-button");
  let cardLikeButtonImage = cardLikeButton.querySelector(".card__button-image");

  cardTitleElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  cardDeleteButton.addEventListener("click", () => {
    console.log("clicked the delete button");
    cardElement.remove();
  });

  cardLikeButton.addEventListener("click", () => {
    console.log("like button clicked through annonomys function");
    if (!cardLikeButton.classList.contains("like-button-active")) {
      console.log("returned true");
      cardLikeButton.classList.add("like-button-active");
      cardLikeButtonImage.src = "./images/LikeButtonActive.svg";
    } else {
      console.log("returned false");
      cardLikeButton.classList.remove("like-button-active");
      cardLikeButtonImage.src = "./images/Cardlikebutton.svg";
    }
  });

  return cardElement;
}

//---add card functions-------------

function openCardAddModal() {
  cardAddModal.classList.add("modal_opened");
}

function closeCardAddModal() {
  cardAddModal.classList.remove("modal_opened");
  inputCardName.value = "";
  inputImageLink.value = "";
}

function saveAddCardChanges(evt) {
  evt.preventDefault();
  cardAddModal.classList.remove("modal_opened");
  let name = inputCardName.value;
  let link = inputImageLink.value;
  inputCardName.value = "";
  inputImageLink.value = "";
  console.log(name);
  console.log(link);
  let newCard = {
    name: name,
    link: link,
  };

  cardsList.prepend(getCardElement(newCard));

  console.log(newCard);
}

//-- I made the above function work by changing the initial cards array to let from const.
//-- Alternitively i could leave it const and use the for each method to clear the array
//-- Maybe just making a new array and runing the for each on it  ??
//-- I opted to clear the array because I couldn't figure out how to just choose the last item in the array
//-- Senior student eexplained, running prepend and passing newcard instead of data

//--- card like button function----

// function cardLikeButtonInteract() {
//   console.log("like button was clicked");

//   let cardButtonImage = cardLikeButton.firstElementChild;

//   if ((cardButtonImage.src = "./images/Cardlikebutton.svg")) {
//     cardButtonImage.src = "./images/LikeButtonActive.svg";
//   } else {
//     cardButtonImage.src = "./images/Cardlikebutton.svg";
//   }
// }

//-- Above is an artifact of trying to make a seprate like fuction instead of adding the ffunction to each button in the for each method

//________________________________________________________________________________________________

//------------------------ EVENTS ---------------------------------------------------------------

//---profile edit modal events

profileModalEditButton.addEventListener("click", openModal);

profileModalCloseButton.addEventListener("click", closeModal);

modalForm.addEventListener("submit", saveEditProfileChanges);

//---card add modal events---------

cardModalAddButton.addEventListener("click", openCardAddModal);

cardAddModalCloseButton.addEventListener("click", closeCardAddModal);

cardAddModalSaveButton.addEventListener("click", saveAddCardChanges);

//---card like button events -------

//________________________________________________________________________________________________

//---- Nonsense that took to long to figure out because I wrote colneNode instead of cloneNode :( -----

initialCards.forEach((data) => {
  cardsList.prepend(getCardElement(data));
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
