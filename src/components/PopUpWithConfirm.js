import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, _handleConfirm) {
    super(popupSelector);
    this.__handleConfirm = _handleConfirm;
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

    // this.close();
  };

  _handleConfirm() {
    this.__handleConfirm();
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
