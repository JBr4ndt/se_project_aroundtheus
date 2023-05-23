import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupForm.querySelector(".modal__button");
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Loading...";
    } else {
      this._submitButton.textContent = "Yes";
    }
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();

    this._handleFormSubmit();
  };

  setEventListeners() {
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
    super.setEventListeners();
  }
}
