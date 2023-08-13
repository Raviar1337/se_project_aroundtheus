//---- code for the FormValidator class will go here----

export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showInputError() {
    console.log("error message code should be here");
  }

  _hideInputError() {
    console.log("hide input error code should be here");
  }

  _checkFieldValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        this._settings,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(this._settings, inputElement);
    }
  }

  _toggleSubmitButtonActive() {}

  _setFormEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const formInput = Array.from(
      this._formElement.querySelectorAll(this.settings.inputSelector)
    );
    const formButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
    formInput.forEach((input) => {
      input.addEventListener("keyup", function (evt) {
        this._checkFieldValidity(evt.target);
        this._toggleSubmitButtonActive(formButton, formInput, this._settings);
      });
    });
  }

  enableValidation() {
    this._setFormEventListeners();
  }
}

// Create the FormValidator class, which sets settings for validating form fields
// according to the following requirements:

//     Its constructor has two parameters. The first parameter is a settings object
//that stores selectors and form classes,
//and the second one takes a form element to be validated.

//     It has private methods for processing the form, which
//include: checking the field's validity, changing the state of
//the Submit button, and adding all the needed handlers.

//     It has a public method enableValidation(), which enables form validation.

//     It has a public method to either disable the state of the button or reset
//form validation (including the state of the submit button). See below for details.

// Create an instance of the FormValidator class for each form that should be validated.
