import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openModal,
  openEditModal,
  closeModal,
  handleProfileFormSubmit,
  handleAddCardFormSubmit,
} from "./utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const formConfiguration = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const cardSelector = document.querySelector("#card-template");

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditCloseButton = profileEditModal.querySelector(
  "#profile-edit-close-button"
);
const profileForm = document.querySelector("#profile-modal-form");

const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector(".profile__add-button");
const addCardCloseButton = addCardModal.querySelector("#add-card-close-button");
const addCardForm = document.querySelector("#add-card-form");

const openImageModal = document.querySelector("#open-image-modal");
const imageModalCloseButton = openImageModal.querySelector(
  "#open-image-close-button"
);

const galleryCards = document.querySelector(".gallery__cards");

const addCard = (data) => {
  const card = new Card(data, cardSelector);
  galleryCards.prepend(card.generateCard());
};

initialCards.forEach((data) => {
  addCard(data);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
profileEditButton.addEventListener("click", openEditModal);
profileEditCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);
addCardButton.addEventListener("click", () => openModal(addCardModal));
addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));

imageModalCloseButton.addEventListener("click", () =>
  closeModal(openImageModal)
);

const editFormValidator = new FormValidator(formConfiguration, profileForm);
const addCardFormValidator = new FormValidator(formConfiguration, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

export { addCard, addCardFormValidator };
