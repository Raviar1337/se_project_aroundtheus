//---Code for the card class goes here--
import {
  openModal,
  cardOpenModal,
  cardOpenModalImage,
  cardOpenModalText,
} from "../utils/utils.js";

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  //---- private method for each event handler goes here

  _cardOpenModalEventHandler() {
    cardOpenModalText.textContent = this._name;
    cardOpenModalImage.src = this._link;
    cardOpenModalImage.alt = `Photo of ${this._name}`;
    openModal(cardOpenModal);
  }

  _cardLikeButtonToggleEventHandler() {
    const isLiked = this._cardLikeButton.dataset.liked === "true";
    if (isLiked) {
      this._cardLikeButton.dataset.liked = "false";
      this._cardLikeButtonImage.src = "../images/Cardlikebutton.svg";
      return;
    }

    this._cardLikeButton.dataset.liked = "true";
    this._cardLikeButtonImage.src = "../images/LikeButtonActive.svg";
  }

  _cardDeleteButtonEventHandler() {
    console.log("clicked the delete button");
    this._cardElement.remove();
  }

  //---- private methods for working with markup and adding event handlers goes here

  _setCardClassEventListeners() {
    this._cardImageElement.addEventListener("click", () => {
      this._cardOpenModalEventHandler();
    });

    this._cardLikeButton.addEventListener("click", () => {
      this._cardLikeButtonToggleEventHandler();
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._cardDeleteButtonEventHandler();
    });
  }

  getCardElement() {
    this._cardElement = document
      .querySelector(this._templateSelector)
      .content.firstElementChild.cloneNode(true);

    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardTitleElement = this._cardElement.querySelector(".card__title");

    this._cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardLikeButtonImage = this._cardLikeButton.querySelector(
      ".card__button-image"
    );

    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    this._setCardClassEventListeners();

    return this._cardElement;
  }
}
