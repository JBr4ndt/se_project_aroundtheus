import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  formConfiguration,
  cardSelector,
  profileEditModal,
  profileTitle,
  profileDescription,
  profileForm,
  addCardModal,
  addCardForm,
  previewImageModal,
  galleryCards,
} from "../utils/constants.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const titleInput = profileEditModal.querySelector("#modal-input-title");
const descriptionInput = profileEditModal.querySelector(
  "#modal-input-description"
);

const userInfo = new UserInfo({
  userNameSelector: profileTitle,
  userJobSelector: profileDescription,
});

const userInfoPopup = new PopupWithForm({
  popupSelector: profileEditModal,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});

const imagePreviewPopup = new PopupWithImage(previewImageModal);

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          cardData: item,
          handleImageClick: () => {
            imagePreviewPopup.open(item);
          },
        },
        cardSelector
      );

      cardList.addItem(card.generateCard());
    },
  },
  galleryCards
);

const newCardPopup = new PopupWithForm({
  popupSelector: addCardModal,
  handleFormSubmit: (data) => {
    const card = new Card(
      {
        cardData: data,
        handleImageClick: () => {
          imagePreviewPopup.open(data);
        },
      },
      cardSelector
    );

    cardList.addItem(card.generateCard());
  },
});

userInfoPopup.setEventListeners();
imagePreviewPopup.setEventListeners();
newCardPopup.setEventListeners();

cardList.renderItems();

const editFormValidator = new FormValidator(formConfiguration, profileForm);
const addCardFormValidator = new FormValidator(formConfiguration, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  titleInput.value = currentUserInfo.userName;
  descriptionInput.value = currentUserInfo.userJob;
  userInfoPopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  newCardPopup.open();
});
