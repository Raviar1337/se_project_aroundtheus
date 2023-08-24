//---- code for the FormValidator class will go here----

export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showInputError(settings, input, errorMessage) {
    console.log("error message code should be here");
    const formError = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(settings.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(settings.errorClass);
  }

  _hideInputError(settings, input) {
    console.log("hide input error code should be here");
    const formError = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(settings.inputErrorClass);
    formError.textContent = "";
    formError.classList.remove(settings.errorClass);
  }

  disableSubmitButton() {
    console.log("disable submit button");
    this._formButton.classList.add(this._settings.inactiveButtonClass);
    this._formButton.disabled = true;
  }

  _enableSubmitButton() {
    console.log("enable submit button");
    this._formButton.classList.remove(this._settings.inactiveButtonClass);
    this._formButton.disabled = false;
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

  _checkFormValidity(formInput) {
    return formInput.every((input) => input.validity.valid);
  }

  _toggleSubmitButtonActive(formButton, formInput) {
    const isFormValid = this._checkFormValidity(formInput);

    if (!isFormValid) {
      this.disableSubmitButton(formButton);
    } else {
      this._enableSubmitButton(formButton);
    }
  }

  _setFormEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.disableSubmitButton();
    });

    const formInputs = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._formButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
    formInputs.forEach((input) => {
      input.addEventListener("input", (evt) => {
        this._checkFieldValidity(evt.target);
        this._toggleSubmitButtonActive(this._formButton, formInputs);
      });
    });
  }

  enableValidation() {
    this._setFormEventListeners();
    this.disableSubmitButton();
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
