//---Code for the card class goes here--
// import {
//   openModal,
//   cardOpenModal,
//   cardOpenModalImage,
//   cardOpenModalText,
// } from "../utils/utils.js";

export default class Card {
  constructor(
    data,
    templateSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeButtonClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  isLiked() {
    return this._isLiked;
  }

  setIsLiked(input) {
    this._isLiked = input;
    this._renderLikes();
  }

  _renderLikes() {
    if (this._isLiked) {
      this._cardLikeButton.classList.add("card__like-button-active");
    } else {
      this._cardLikeButton.classList.remove("card__like-button-active");
    }
  }

  _cardLikeButtonToggleEventHandler() {
    console.log("toggle event fired");
    this._handleLikeButtonClick();
    // console.log(this._cardLikeButton.dataset.liked === "true");
    // if (this._cardLikeButton.dataset.liked === "true") {
    //   console.log("dislike event fired");
    //   this._handleDislike();
    //   this._cardLikeButton.dataset.liked = "false";
    //   this._cardLikeButton.classList.remove("card__like-button-active");
    // } else {
    //   console.log("Like event fired");
    //   this._handleLike();
    //   this._cardLikeButton.dataset.liked = "true";
    //   this._cardLikeButton.classList.add("card__like-button-active");
    // }
  }

  _cardDeleteButtonEventHandler() {
    this._handleDeleteClick();
  }

  removeSelf() {
    this._cardElement.remove();
  }

  //---- private methods for working with markup and adding event handlers goes here

  _setCardClassEventListeners() {
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick();
    });

    this._cardLikeButton.addEventListener("click", () => {
      this._cardLikeButtonToggleEventHandler();
      console.log("like button was clicked");
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
    this._renderLikes();
    //this._cardLikeButton.dataset.liked = this._isLiked;

    // this._cardLikeButtonImage.src = () => {if (this._cardLikeButton.dataset.liked === "true") {
    //   // put code here that designates imags

    // } else {

    // }}

    this._setCardClassEventListeners();

    return this._cardElement;
  }
}
