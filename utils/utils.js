// ----- event handlers and functions that that open and close modal windows go here -----

function openModal(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
}

function closeModal(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

const enableClosingModalFeture = (modalBackgrounds) => {
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

export { openModal, closeModal, enableClosingModalFeture, closeModalByEscape };
