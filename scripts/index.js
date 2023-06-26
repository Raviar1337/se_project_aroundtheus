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

//----------------- LET DECLARATIONS ------------------------------------------------

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

//________________________________________________________________________________________________

//------------------------ EVENTS ---------------------------------------------------------------

editButton.addEventListener("click", openModal);

modalCloseButton.addEventListener("click", closeModal);

modalForm.addEventListener("submit", saveEditProfileChanges);

//________________________________________________________________________________________________

console.log(modalCloseButton);
