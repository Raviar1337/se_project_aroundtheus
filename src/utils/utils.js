// ----- event handlers and functions that that open and close modal windows go here -----

function openModal(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
}

function closeModal(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

const enableClosingModalFeature = (modalBackgrounds) => {
  modalBackgrounds.forEach((background) => {
    background.addEventListener("mousedown", (evt) => {
      if (evt.target === background) {
        closeModal(background);
      }
    });
  });
};

function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    const currentlyOpenModal = document.querySelector(".modal_opened");
    closeModal(currentlyOpenModal);
  }
}

/* -------------------------------------------------------------------------- */
/*                              ALL the CONSTANTS                             */
/* -------------------------------------------------------------------------- */

/* --------------- DOM declaratiion for all modal backgrounds --------------- */

export const modalBackgrounds = Array.from(document.querySelectorAll(".modal"));

/* ----------------- DOM DECLARATIONS For profile edit modal ---------------- */

export const profileEditModal = document.querySelector(".modal_profile-edit");

export const profileModalCloseButton = profileEditModal.querySelector(
  ".modal__close-button"
);

export const profileModalEditButton = document.querySelector(".edit-button");

export const profileName = document.querySelector(".profile__title");

export const profileDescription = document.querySelector(
  ".profile__description"
);

export const inputProfileName = profileEditModal.querySelector(
  ".modal__input_type_name"
);

export const inputProfileDescription = profileEditModal.querySelector(
  ".modal__input_type_description"
);

export const modalProfileSaveButton = profileEditModal.querySelector(
  ".modal__save-button"
);

export const modalProfileForm = profileEditModal.querySelector(".modal__form");

/* ------------------ Dom declarations for opening a modal ------------------ */

export const cardOpenModal = document.querySelector(".modal_card-open");

export const cardOpenModalCloseButton = cardOpenModal.querySelector(
  ".modal__close-button"
);

export const cardOpenModalImage = document.querySelector(
  ".modal__opened-image"
);

export const cardOpenModalText = document.querySelector(
  ".modal__heading_type_open-image"
);

/* ----------------------- Card list DOM declarations ----------------------- */

export const cardsList = document.querySelector(".cards__list");

/* -------------------- DOM Declarations for adding cards ------------------- */

export const cardModalAddButton = document.querySelector(".add-button");

export const cardAddModal = document.querySelector(".modal_card-add");

export const cardAddModalCloseButton = cardAddModal.querySelector(
  ".modal__close-button"
);

export const cardAddModalSaveButton = cardAddModal.querySelector(
  ".modal__save-button"
);

export const cardAddModalForm = cardAddModal.querySelector(".modal__form");

export const inputCardName = cardAddModal.querySelector(
  ".modal__input_type_name"
);

export const inputImageLink = cardAddModal.querySelector(
  ".modal__input_type_description"
);

/* -------------------------------------------------------------------------- */
/*                              export code below                             */
/* -------------------------------------------------------------------------- */

export { openModal, closeModal, enableClosingModalFeature, closeModalByEscape };
