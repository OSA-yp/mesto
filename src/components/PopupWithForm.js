// YES - Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
// YES - Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
// YES - Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// YES - Перезаписывает родительский метод setEventListeners.
// YES - Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
// YES - Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.


import {Popup} from "./Popup";
import {settings} from "../utils/settings";

export class PopupWithForm extends Popup{
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    //this._popupElement
    this._submitHandler = submitHandler;
    this.form = this._popupElement.querySelector(settings.formSelector);
    //this.formValidator = formValidator;
  }

  //  собирает данные всех полей формы
  _getInputValues(){
    const inputValues = {};
    const inputs = [...this.form.querySelectorAll(settings.inputSelector)];
    inputs.forEach(function(input){
      inputValues[input.name] = input.value;
    });
    return inputValues
  }

  setEventListeners(){
    super.setEventListeners();

    // добавлять обработчик сабмита формы
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
       this._submitHandler(evt, this._getInputValues());
    });
  }

  close() {
    super.close();

    // должна ещё и сбрасываться
    this.form.reset();
    //this.formValidator.clearFormErrors(); // сброс ошибков в валидаторе
  }

}
