// класс Popup, который отвечает за открытие и закрытие попапа.
// Этот класс:
// YES -   Принимает в конструктор единственный параметр — селектор попапа.
// YES-   Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// YES -  Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// YES -  Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
// YES - Класс Popup базовый, имеет двух наследников, создающихся для каждого модального окна. Класс и наследники соответствуют описанию из проектной работы.

export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    // this._handleEscClose = this.setEventListeners.bind(); // проверить!!!
  }

  //  отвечает за открытие  попапа.
  open(){
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  //  отвечает за закрытие попапа.
  close(){
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  // содержит логику закрытия попапа клавишей Esc.
  _handleEscClose(evt){
    if (evt.key === 'Escape') {
      this.close();
    }
  }


  setEventListeners(){
    // добавляет слушатель клика иконке закрытия попапа
    const closePopupButton = this._popupElement.querySelector('.popup__close');
    closePopupButton.addEventListener('click', ()=> this.close());

  // обработка закрытия попапов по клику вне формы
      this._popupElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          this.close();
        }
      });
  }

}
