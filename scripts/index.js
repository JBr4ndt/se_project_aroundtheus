import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openModal, closeModal } from "./utils.js";

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
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const titleInput = profileEditModal.querySelector("#modal-input-title");
const descriptionInput = profileEditModal.querySelector(
  "#modal-input-description"
);
const profileEditCloseButton = profileEditModal.querySelector(
  "#profile-edit-close-button"
);
const profileForm = document.querySelector("#profile-modal-form");

const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector(".profile__add-button");
const cardNameInput = addCardModal.querySelector("#modal-input-name");
const cardLinkInput = addCardModal.querySelector("#modal-input-link");
const addCardCloseButton = addCardModal.querySelector("#add-card-close-button");
const addCardForm = document.querySelector("#add-card-form");

const previewImageModal = document.querySelector("#preview-image-modal");
const imageModal = previewImageModal.querySelector(".modal__image");
const imageModalName = previewImageModal.querySelector(".modal__image-name");
const imageModalCloseButton = previewImageModal.querySelector(
  "#open-image-close-button"
);

const galleryCards = document.querySelector(".gallery__cards");

const fillProfileForm = () => {
  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
};

const openEditModal = () => {
  fillProfileForm();
  openModal(profileEditModal);
};

const handleImageClick = (name, link) => {
  imageModal.src = link;
  imageModal.alt = name;
  imageModalName.textContent = name;
  openModal(previewImageModal);
};

const addCard = (data) => {
  const card = new Card(data, cardSelector, handleImageClick);
  galleryCards.prepend(card.generateCard());
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(profileEditModal);
};

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newData = { name: cardNameInput.value, link: cardLinkInput.value };

  addCard(newData);
  closeModal(addCardModal);
  document.getElementById("add-card-form").reset();
  addCardFormValidator.toggleButtonState();
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
  closeModal(previewImageModal)
);

const editFormValidator = new FormValidator(formConfiguration, profileForm);
const addCardFormValidator = new FormValidator(formConfiguration, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

export { addCard, addCardFormValidator };
