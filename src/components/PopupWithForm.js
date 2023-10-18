import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open();
  }

  close() {
    const formSelector = this._popupElement.querySelector(".modal__form");

    formSelector.reset();
    super.close();
  }

  submit = (evt) => {
    //evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());

    this.close();
  };

  _getInputValues() {
    const formSelector = this._popupElement.querySelector(".modal__form");
    const formInputFields = Array.from(
      formSelector.querySelectorAll(".modal__input")
    );
    const data = {};
    formInputFields.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
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
