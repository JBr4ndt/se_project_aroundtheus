import { addCard, addCardFormValidator } from "./index.js";

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const titleInput = profileEditModal.querySelector("#modal-input-title");
const descriptionInput = profileEditModal.querySelector(
  "#modal-input-description"
);

const addCardModal = document.querySelector("#add-card-modal");
const cardNameInput = addCardModal.querySelector("#modal-input-name");
const cardLinkInput = addCardModal.querySelector("#modal-input-link");

const fillProfileForm = () => {
  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
};

const openModal = (modal) => {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscKey);
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
};

const openEditModal = () => {
  fillProfileForm();
  openModal(profileEditModal);
};

const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscKey);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
};

const closeModalOnRemoteClick = (evt) => {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.target);
  }
};

const handleEscKey = (evt) => {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
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
  addCardFormValidator.enableValidation();
};

export {
  openModal,
  openEditModal,
  closeModal,
  handleProfileFormSubmit,
  handleAddCardFormSubmit,
};
