import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  formConfiguration,
  cardSelector,
  avatarEditModal,
  avatarEditForm,
  profileEditModal,
  profileName,
  profileJob,
  profileAvatar,
  profileForm,
  addCardModal,
  addCardForm,
  deleteCardModal,
  previewImageModal,
  galleryCards,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "ebcde24c-97d6-4cbb-81ab-0b60bea37b58",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  userNameSelector: profileName,
  userJobSelector: profileJob,
  userAvatarSelector: profileAvatar,
});

let currentUserId = "f822aad15aed6394efab1999";
let cardList;

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({ name: userData.name, about: userData.about });
    userInfo.setAvatar(userData.avatar);
    currentUserId = userData._id;
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getInitialCards()
  .then((initialCards) => {
    cardList = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const card = createCard(item);

          cardList.addItem(card);
        },
      },
      galleryCards
    );
    cardList.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

const userInfoPopup = new PopupWithForm({
  popupSelector: profileEditModal,
  handleFormSubmit: (data) => {
    userInfoPopup.renderLoading(true);
    api
      .setProfile({ name: data.name, about: data.about })
      .then((data) => {
        userInfo.setUserInfo({ name: data.name, about: data.about });
        userInfoPopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        userInfoPopup.renderLoading(false, "Save");
      });
  },
});

const imagePreviewPopup = new PopupWithImage(previewImageModal);
const deleteCardPopup = new PopupWithConfirmation(deleteCardModal);

function createCard(data) {
  const cardElement = new Card(
    {
      cardData: data,
      userId: currentUserId,
      handleImageClick: () => {
        imagePreviewPopup.open(data);
      },
      handleDeleteCardClick: (cardId) => {
        deleteCardPopup.open();
        deleteCardPopup.setSubmitAction(() => {
          deleteCardPopup.renderLoading(true);
          api
            .removeCard(cardId)
            .then(() => {
              deleteCardPopup.close();
              cardElement.handleDeleteCard();
            })
            .catch((err) => {
              console.error(err);
            })
            .finally(() => {
              deleteCardPopup.renderLoading(false);
            });
        });
      },
      handleLikeClick: (data) => {
        if (!cardElement.isLiked()) {
          api
            .addCardLike(data)
            .then((res) => {
              cardElement.updateLikes(res.likes);
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          api
            .removeCardLike(data)
            .then((res) => {
              cardElement.updateLikes(res.likes);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      },
    },
    cardSelector
  );

  return cardElement.generateCard();
}

const newCardPopup = new PopupWithForm({
  popupSelector: addCardModal,
  handleFormSubmit: (data) => {
    newCardPopup.renderLoading(true);
    api
      .addCard(data)
      .then((data) => {
        const card = createCard(data);
        newCardPopup.close();
        cardList.addItem(card);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        newCardPopup.renderLoading(false, "Create");
      });
  },
});

const avatarEditPopup = new PopupWithForm({
  popupSelector: avatarEditModal,
  handleFormSubmit: (data) => {
    avatarEditPopup.renderLoading(true);
    api
      .updateProfileAvatar(data)
      .then((res) => {
        userInfo.setAvatar(res.avatar);
        avatarEditPopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        avatarEditPopup.renderLoading(false, "Save");
      });
  },
});

avatarEditPopup.setEventListeners();
userInfoPopup.setEventListeners();
imagePreviewPopup.setEventListeners();
newCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();

const avatarFormValidator = new FormValidator(
  formConfiguration,
  avatarEditForm
);
const editFormValidator = new FormValidator(formConfiguration, profileForm);
const addCardFormValidator = new FormValidator(formConfiguration, addCardForm);

avatarFormValidator.enableValidation();
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const avatarEditButton = document.querySelector(".profile__avatar-edit-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

avatarEditButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarEditPopup.open();
});

profileEditButton.addEventListener("click", () => {
  const currentUserinfo = userInfo.getUserInfo();
  userInfoPopup.setInputValues(currentUserinfo);

  editFormValidator.resetValidation();
  userInfoPopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  newCardPopup.open();
});
