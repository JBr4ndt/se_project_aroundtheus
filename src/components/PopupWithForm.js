import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputData = {};
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._inputList.forEach((inputElement) => {
      this._inputData[inputElement.name] = inputElement.value;
    });
    return this._inputData;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
