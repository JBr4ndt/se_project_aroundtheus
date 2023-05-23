class Card {
  constructor(
    {
      cardData,
      userId,
      handleImageClick,
      handleDeleteCardClick,
      handleLikeClick,
    },
    cardSelector
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._likes = cardData.likes;
    this._userId = userId;
    this._ownerId = cardData["owner"]._id;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeClick = handleLikeClick;

    this._cardSelector = document.querySelector(cardSelector);
  }

  getId() {
    return this._id;
  }

  _getTemplate() {
    const cardElement = this._cardSelector.content
      .querySelector(".card__element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this._id)
    );

    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCardClick(this._id)
    );

    this._cardImage.addEventListener("click", () =>
      this._handleImageClick({ name: this._name, link: this._link })
    );
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  _getLikeCounter() {
    this._likesCounter.textContent = this._likes.length;
    const isLiked = this.isLiked();
    if (isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  updateLikes(likes) {
    this._likes = likes;
    this._getLikeCounter();
  }

  handleDeleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._likesCounter = this._element.querySelector(".card__like-counter");

    this._setEventListeners();
    this._getLikeCounter();

    if (this._ownerId != this._userId) {
      this._deleteButton.remove();
    }

    const cardName = this._element.querySelector(".card__name");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    cardName.textContent = this._name;

    return this._element;
  }
}

export default Card;
