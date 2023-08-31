import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open();

    this._setEventListeners();
  }

  close = () => {
    this._removeEventListeners();
    const formSelector = this._popupElement.querySelector(".modal__form");

    formSelector.reset();
    super.close();
  };

  submit = () => {
    this._handleFormSubmit();

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
    console.log(data);
    return data;
  }

  _setEventListeners() {
    super._setEventListeners();
    const submitButtonSelector = this._popupElement.querySelector(
      ".modal__save-button"
    );
    submitButtonSelector.addEventListener("click", this.submit);
  }

  _removeEventListeners() {
    const submitButtonSelector = this._popupElement.querySelector(
      ".modal__save-button"
    );

    submitButtonSelector.removeEventListener("click", this.submit);
    super._removeEventListeners();
  }
}
