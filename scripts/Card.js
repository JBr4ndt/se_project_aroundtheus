const openImageModal = document.querySelector("#open-image-modal");
const imageModal = openImageModal.querySelector(".modal__image");
const imageModalName = openImageModal.querySelector(".modal__image-name");

function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
}

function closeModalOnRemoteClick(evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.target);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscKey);
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscKey);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
}

class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = this._cardSelector.content
      .querySelector(".card__element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlePreviewImage();
      });
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handlePreviewImage() {
    imageModal.src = this._link;
    imageModal.alt = this._name;
    imageModalName.textContent = this._name;
    openModal(openImageModal);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__name").textContent = this._name;

    return this._element;
  }
}

export default Card;
