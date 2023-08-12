//---Code for the card class goes here--

export default class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
    // this._templateSelector = data.template  ?? maybe  this ?
  }

  //---- private method for each event handler goes here

  //---- private methods for working with markup and adding event handlers goes here

  getCardElement() {
    const cardOpenModal = document.querySelector(".modal_card-open");
    const cardElementTemplate = document.querySelector("#cardElementTemplate")
      .content.firstElementChild;
    this._cardElement = cardElementTemplate.cloneNode(true);
    console.log(this._cardElement);
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

    this._cardImageElement.addEventListener("click", () => {
      const cardOpenModalImage = document.querySelector(".modal__opened-image");
      const cardOpenModalText = document.querySelector(
        ".modal__heading_type_open-image"
      );

      cardOpenModalText.textContent = this._cardTitleElement.textContent;
      cardOpenModalImage.src = this._cardImageElement.src;
      cardOpenModalImage.alt = `Photo of ${this._name}`;
      openModal(cardOpenModal);
    });

    this._cardDeleteButton.addEventListener("click", () => {
      console.log("clicked the delete button");
      this._cardElement.remove();
    });

    this._cardLikeButton.addEventListener("click", () => {
      const isLiked = this._cardLikeButton.dataset.liked === "true";

      if (isLiked) {
        this._cardLikeButton.dataset.liked = "false";
        this._cardLikeButtonImage.src = "./images/Cardlikebutton.svg";
        return;
      }

      this._cardLikeButton.dataset.liked = "true";
      this._cardLikeButtonImage.src = "./images/LikeButtonActive.svg";
    });

    return this._cardElement;
  }
}

import { openModal } from "../utils/utils.js";
