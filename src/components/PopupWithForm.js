import {Popup} from "./Popup";
import {settings} from "../utils/settings";

export class PopupWithForm extends Popup{
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    //this._popupElement
    this._submitHandler = submitHandler;
    this.form = this._popupElement.querySelector(settings.formSelector);
    this._formValidator = null;
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
    this._formValidator.clearFormErrors();
  }

  // Утанавливает связь с валидотором экземпляра формы
  setFormValidator(formValidator){
    this._formValidator = formValidator;
  }
}
