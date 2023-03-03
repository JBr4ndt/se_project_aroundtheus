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
const galleryCards = document.querySelector(".gallery__cards");

function getCardElement(data) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card__element");
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardTemplate.querySelector(".card__image");
  const cardTitle = cardTemplate.querySelector(".card__title");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

function addCard(data) {
  galleryCards.append(getCardElement(data));
}

function openModal() {
  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  profileEditModal.classList.add("modal__opened");
}

function closeModal() {
  profileEditModal.classList.remove("modal__opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal();
}

for (let i = 0; i < initialCards.length; i++) {
  const data = initialCards[i];
  getCardElement(data);
  addCard(data);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
profileEditButton.addEventListener("click", openModal);
profileEditCloseButton.addEventListener("click", closeModal);
