const disableSubmitButton = (formButton, settings) => {
  formButton.classList.add(settings.inactiveButtonClass);
  formButton.disabled = true;
};

const enableSubmitButton = (formButton, settings) => {
  formButton.classList.remove(settings.inactiveButtonClass);
  formButton.disabled = false;
};

const showInputError = (settings, input, errorMessage) => {
  const formError = document.querySelector(`#${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(settings.errorClass);
};

const hideInputError = (settings, input) => {
  const formError = document.querySelector(`#${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  formError.textContent = "";
  formError.classList.remove(settings.errorClass);
};

const checkInputValidity = (inputElement, settings) => {
  // if (!inputElement.validity.valid) {
  //   showInputError(settings, inputElement, inputElement.validationMessage);
  // } else {
  //   hideInputError(settings, inputElement);
  // }
};

const checkFormValidity = (formInput) =>
  formInput.every((input) => input.validity.valid);

const formButtonToggle = (formButton, formInput, settings) => {
  const isFormValid = checkFormValidity(formInput);

  if (!isFormValid) {
    disableSubmitButton(formButton, settings);
  } else {
    enableSubmitButton(formButton, settings);
  }
};

// function setEventListeners(formElement, settings) {
//   const formInput = Array.from(
//     formElement.querySelectorAll(settings.inputSelector)
//   );
//   const formButton = formElement.querySelector(settings.submitButtonSelector);
//   formInput.forEach((input) => {
//     input.addEventListener("keyup", function (evt) {
checkInputValidity(evt.target, settings);
formButtonToggle(formButton, formInput, settings);
//     });
//   });
// }

function enableValidation(settings) {
  const formElements = Array.from(
    document.querySelectorAll(settings.formSelector)
  );

  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
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
