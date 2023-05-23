import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._submitButton = this._popupForm.querySelector(".modal__button");

    this._handleFormSubmit = handleFormSubmit;
  }

  renderLoading(isLoading, buttonText) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = buttonText;
    }
  }

  _getInputValues() {
    this._inputData = {};
    this._inputList.forEach((inputElement) => {
      this._inputData[inputElement.name] = inputElement.value;
    });
    return this._inputData;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  setInputValues(data) {
    this._inputList.forEach((inputElement) => {
      inputElement.value = data[inputElement.name];
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
