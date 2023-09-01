import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ link, name = "Untitled" }) {
    this._popupElement.querySelector(".modal__heading").textContent = name;
    this._popupElement.querySelector(".modal__opened-image").src = link;
    this._popupElement.querySelector(
      ".modal__opened-image"
    ).alt = `Photo of ${this._name}`;
    super.open();
  }
}
