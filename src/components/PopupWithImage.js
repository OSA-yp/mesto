import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    //this._popupElement
    this.popupImgSrc = this._popupElement.querySelector('.popup__image');
    this.popupImgCaption = this._popupElement.querySelector('.popup__caption');

  }
  open(text, url) {

    this.popupImgSrc.src = url;
    this.popupImgSrc.alt = text;
    this.popupImgCaption.textContent = text;
    super.open();

  }
}
