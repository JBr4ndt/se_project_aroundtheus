class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = this._cardSelector.content
      .querySelector(".card__element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeIcon);

    this._deleteButton.addEventListener("click", this._handleDeleteCard);

    this._cardImage.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );
  }

  _handleLikeIcon = () => {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  };

  _handleDeleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");

    this._setEventListeners();

    const cardName = this._element.querySelector(".card__name");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    cardName.textContent = this._name;

    return this._element;
  }
}

export default Card;
