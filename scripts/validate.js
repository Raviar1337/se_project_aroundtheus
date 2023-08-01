// const formElement = document.querySelector(".form");
// const formInput = formElement.querySelector(".form__input");
// const formError = formElement.querySelector(`.${formInput.id}-error`);

const disableSubmitButton = (formButton, options) => {
  formButton.classList.add(options.inactiveButtonClass);
  formButton.disabled = true;
};

const enableSubmitButton = (formButton, options) => {
  formButton.classList.remove(options.inactiveButtonClass);
  formButton.disabled = false;
};

//re add this perameter to showError  formInputElement,  , errorMessage

const showInputError = (options, input, errorMessage) => {
  const formError = document.querySelector(`#${input.id}-error`);
  input.classList.add(options.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(options.errorClass);
};

//re add to hideInputError formElement,

const hideInputError = (options, input) => {
  const formError = document.querySelector(`#${input.id}-error`);
  input.classList.remove(options.inputErrorClass);
  formError.textContent = "";
  formError.classList.remove(options.errorClass);
};

// Re add this parameter to checkInputValidity formElement,

const checkInputValidity = (formButton, inputElement, options) => {
  if (!inputElement.validity.valid) {
    console.log("NOT VALID!!!!");
    disableSubmitButton(formButton, options);
    showInputError(options, inputElement, inputElement.validationMessage);
  } else {
    console.log("VALID!!!!");
    hideInputError(options, inputElement);
    enableSubmitButton(formButton, options);
  }
};

function setEventListeners(formElement, options) {
  const formInput = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const formButton = formElement.querySelector(options.submitButtonSelector);
  formInput.forEach((input) => {
    input.addEventListener("keyup", function (evt) {
      console.log(evt.target);
      checkInputValidity(formButton, evt.target, options);
    });
  });
}

function enableValidation(options) {
  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );

  // const formError = Array.from(
  //   document.querySelectorAll(`.${formInput.id}-error`)
  // );

  formElements.forEach((formElement) => {
    console.log(formElement);
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_invalid",
  errorClass: "modal__error_visible",
};

enableValidation(config);

// console.log(formElements);
// console.log(formInput);
