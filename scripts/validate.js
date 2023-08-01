const disableSubmitButton = (formButton, options) => {
  formButton.classList.add(options.inactiveButtonClass);
  formButton.disabled = true;
};

const enableSubmitButton = (formButton, options) => {
  formButton.classList.remove(options.inactiveButtonClass);
  formButton.disabled = false;
};

const showInputError = (options, input, errorMessage) => {
  const formError = document.querySelector(`#${input.id}-error`);
  input.classList.add(options.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(options.errorClass);
};

const hideInputError = (options, input) => {
  const formError = document.querySelector(`#${input.id}-error`);
  input.classList.remove(options.inputErrorClass);
  formError.textContent = "";
  formError.classList.remove(options.errorClass);
};

const checkInputValidity = (inputElement, options) => {
  if (!inputElement.validity.valid) {
    showInputError(options, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(options, inputElement);
  }
};

const formButtonToggle = (formButton, formInput, options) => {
  let invalidInputPresent = false;
  formInput.forEach((input) => {
    if (!input.validity.valid) {
      invalidInputPresent = true;
    }
  });

  if (invalidInputPresent) {
    disableSubmitButton(formButton, options);
  } else {
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
      checkInputValidity(evt.target, options);
      formButtonToggle(formButton, formInput, options);
    });
  });
}

function enableValidation(options) {
  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );

  formElements.forEach((formElement) => {
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
