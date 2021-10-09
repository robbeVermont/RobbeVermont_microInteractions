let email = {},
  password = {},
  signInButton;

const isValidEmailAddress = function (emailAddress) {
  // Basis manier om e-mailadres te checken.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};

const isEmpty = function (fieldValue) {
  return !fieldValue || !fieldValue.length;
};

const isValidPassword = function (fieldValue) {
  return fieldValue.length > 8;
};

const addErrors = function (inputObject, errorMesage) {
  inputObject.errorMessage.innerText = errorMesage;

  inputObject.field.classList.add("has-error");

  inputObject.input.addEventListener("input", doubleCheckEmail);
};

const removeErrors = function (inputObject) {
  inputObject.errorMessage.innerText = "";

  inputObject.field.classList.remove("has-error");
};

const doubleCheckEmail = function () {
  if (isValidEmailAddress(email.input.value)) {
    email.input.removeEventListener("input", doubleCheckEmail);
    removeErrors(email);
    return;
  }
};

const enableListeners = function () {
  email.input.addEventListener("blur", function () {
    if (isEmpty(email.input.value)) {
      addErrors(email, "This field is empty");
      return;
    }
    if (!isValidEmailAddress(email.input.value)) {
      addErrors(email, "This is not a valid email");
      return;
    }
    removeErrors(email);
  });
  password.input.addEventListener("blur", function () {
    if (isEmpty(password.input.value)) {
      addErrors(password, "This field is empty");
      return;
    }
    removeErrors(password);
  });
  signInButton.addEventListener("click", function (e) {
    e.preventDefault;

    if (isEmpty(password.input.value)) {
      addErrors(password, "This field is empty");
    } else {
      removeErrors(password);
    }
    if (isEmpty(email.input.value)) {
      addErrors(email, "This field is empty");
    } else if (!isValidEmailAddress(email.input.value)) {
      addErrors(email, "This is not a valid email");
    } else {
      removeErrors(email);
    }

    console.log(email.input.value);
    console.log(password.input.value);
  });
};

const getDOMElements = function () {
  /* Haal voor het email en het password object een: errorMessage, een input en een field - de c-form-field waar we de has-error class op zetten - op (met querySelector). */
  email = {
    input: document.querySelector(".js-email"),
    errorMessage: document.querySelector(".js-email-message"),
    field: document.querySelector(".js-email-field"),
  };
  password = {
    input: document.querySelector(".js-password"),
    errorMessage: document.querySelector(".js-password-message"),
    field: document.querySelector(".js-password-field"),
  };
  signInButton = document.querySelector(".js-sign-in-button");

  enableListeners();
};

const enableValidation = function () {
  getDOMElements();
};

function handleFloatingLabel() {
  const floatingEmail = document.querySelector(".js-email");
  floatingEmail.addEventListener("blur", function () {
    if (!isEmpty(floatingEmail.value)) {
      document.querySelector(".js-email-label").classList.add("is-floating");
    } else {
      document.querySelector(".js-email-label").classList.remove("is-floating");
    }
  });
}

function handlePasswordSwitcher() {
  const passwordInput = document.querySelector(".js-password");
  const passwordOptions = ["password", "text"];
  const passwordToggle = document.querySelector(".js-toggle-password");
  passwordToggle.addEventListener("change", function () {
    passwordInput.type = passwordOptions[+this.checked];
  });
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("Script loaded!");
  // enableValidation();

  handleFloatingLabel();
  handlePasswordSwitcher();
});
