import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, confirmHandler) {
    super(popupSelector);
    this._confirmHandler = confirmHandler;
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }

  submit = (evt) => {
    evt.preventDefault();
    this._handleConfirm();

    this.close();
  };

  _handleConfirm() {
    this._confirmHandler();
  }

  _setEventListeners() {
    super._setEventListeners();
    const formElement = this._popupElement.querySelector(".modal__form");
    formElement.addEventListener("submit", this.submit);
  }

  _removeEventListeners() {
    const formElement = this._popupElement.querySelector(".modal__form");
    formElement.removeEventListener("submit", this.submit);
    super._removeEventListeners();
  }
}
