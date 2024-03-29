import { profileModalCloseButton } from "../utils/utils.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");

    this._setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");

    this._removeEventListeners();
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOutsideClick = (evt) => {
    if (evt.target === this._popupElement) {
      this.close();
    }
  };

  _setEventListeners() {
    document.addEventListener("keydown", this._handleEscapeClose);
    this._popupElement
      .querySelector(".modal__close-button")
      .addEventListener("click", this.close);

    this._popupElement.addEventListener("mousedown", this._handleOutsideClick);
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscapeClose);
    this._popupElement
      .querySelector(".modal__close-button")
      .removeEventListener("click", this.close);
    this._popupElement.addEventListener("mousedown", this._handleOutsideClick);
  }
}
