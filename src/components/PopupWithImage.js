// YES - наследует от Popup. Этот класс должен
// YES -  перезаписывать родительский метод open. В методе open класса PopupWithImage нужно
// ??? - вставлять в попап картинку и
// YES - атрибут src изображения и
// YES - подпись к картинке.

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
    popupImgCaption.textContent = text;
    super.open();

  }
}
