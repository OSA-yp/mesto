export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    // this._handleEscClose = this.setEventListeners.bind(); // проверить!!!

    this._handleEscClose = this._handleEscClose.bind(this);
  }


  //  отвечает за открытие  попапа.
  open(){
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  //  отвечает за закрытие попапа.
  close(){
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // содержит логику закрытия попапа клавишей Esc.
  _handleEscClose(evt){
    if (evt.key === 'Escape') {
      this.close()
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
