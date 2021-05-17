import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    //this._popupElement
  }
  open(text, url) {
    const popupImgSrc = this._popupElement.querySelector('.popup__image');
    const popupImgCaption = this._popupElement.querySelector('.popup__caption');

    popupImgSrc.src = url;
    popupImgSrc.alt = text;
    popupImgCaption.textContent = text;
    super.open();

  }
}
