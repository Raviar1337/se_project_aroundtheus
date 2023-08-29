import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open();

    this._setEventListeners();
    console.log("open Method was called");
  }

  close() {
    super.close();
    this._removeEventListeners();
  }

  submit = () => {
    console.log("form submit is firiing");
    this._handleFormSubmit();
    this.close();
  };

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
    super._removeEventListeners();
    submitButtonSelector.removeEventListener("click", this.submit);
  }
}
