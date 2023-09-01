import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open();

    this._setEventListeners();
    this._disableSubmitButton();
  }

  close() {
    // this._removeEventListeners();
    const formSelector = this._popupElement.querySelector(".modal__form");

    formSelector.reset();
    super.close();
  }

  submit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());

    this.close();
  };

  _disableSubmitButton() {
    const submitButtonSelector = this._popupElement.querySelector(
      ".modal__save-button"
    );
    submitButtonSelector.classList.add("modal__save-button_disabled");
    submitButtonSelector.disabled = true;
  }

  _getInputValues() {
    const formSelector = this._popupElement.querySelector(".modal__form");
    const formInputFields = Array.from(
      formSelector.querySelectorAll(".modal__input")
    );
    const data = {};
    formInputFields.forEach((input) => {
      data[input.name] = input.value;
    });
    console.log(data);
    return data;
  }

  _setEventListeners() {
    super._setEventListeners();
    const formSelector = this._popupElement.querySelector(".modal__form");
    formSelector.addEventListener("submit", this.submit);
  }

  _removeEventListeners() {
    const formSelector = this._popupElement.querySelector(".modal__form");
    formSelector.removeEventListener("submit", this.submit);
    super._removeEventListeners();
  }
}
