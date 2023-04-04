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

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditCloseButton = profileEditModal.querySelector(
  "#profile-edit-close-button"
);
const profileForm = document.querySelector("#profile-modal-form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const titleInput = profileEditModal.querySelector("#modal-input-title");
const descriptionInput = profileEditModal.querySelector(
  "#modal-input-description"
);

const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector(".profile__add-button");
const addCardCloseButton = addCardModal.querySelector("#add-card-close-button");
const addCardForm = document.querySelector("#add-card-form");
const cardNameInput = addCardModal.querySelector("#modal-input-name");
const cardLinkInput = addCardModal.querySelector("#modal-input-link");

const openImageModal = document.querySelector("#open-image-modal");
const imageModal = openImageModal.querySelector(".modal__image");
const imageModalName = openImageModal.querySelector(".modal__image-name");
const imageModalCloseButton = openImageModal.querySelector(
  "#open-image-close-button"
);

const galleryCards = document.querySelector(".gallery__cards");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card__element");

function fillProfileForm() {
  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscKey);
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
}

function openEditModal() {
  fillProfileForm();
  openModal(profileEditModal);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscKey);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
}

function addCard(data) {
  galleryCards.prepend(getCardElement(data));
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardName = cardElement.querySelector(".card__name");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteCardButton = cardElement.querySelector(".card__delete-button");

  deleteCardButton.addEventListener("click", () => cardElement.remove());

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardName.textContent = data.name;

  cardImage.addEventListener("click", () => {
    imageModal.src = data.link;
    imageModal.alt = data.name;
    imageModalName.textContent = data.name;
    openModal(openImageModal);
  });

  return cardElement;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newData = { name: cardNameInput.value, link: cardLinkInput.value };
  const inputList = [...addCardForm.querySelectorAll(".modal__input")];
  const buttonElement = addCardForm.querySelector(".modal__button");

  addCard(newData);
  closeModal(addCardModal);
  document.getElementById("add-card-form").reset();
  toggleButtonState(inputList, buttonElement, configurationObjects);
}

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
