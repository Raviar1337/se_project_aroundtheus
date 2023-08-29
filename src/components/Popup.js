import { profileModalCloseButton } from "../utils/utils.js";

export default class Popup {
  constructor(popupSelector) {
    console.log(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    console.log(this._popupElement);
  }

  open() {
    console.log("super open Method was called");
    this._popupElement.classList.add("modal_opened");
    console.log(this._popupElement);
    this._setEventListeners();
  }

  close = () => {
    console.log(this._popupElement);
    this._popupElement.classList.remove("modal_opened");
    console.log(this._popupElement);
    this._removeEventListeners();
  };

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      console.log("escape event firing");
      this.close();
    }
  };

  _setEventListeners() {
    document.addEventListener("keydown", this._handleEscapeClose);
    this._popupElement
      .querySelector(".modal__close-button")
      .addEventListener("click", this.close);
    console.log("event listener is set");
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscapeClose);
    this._popupElement
      .querySelector(".modal__close-button")
      .removeEventListener("click", this.close);
  }
}
