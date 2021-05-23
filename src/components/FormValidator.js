

export class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this.settings = settings;

    // Ищем кнопку формы
    this._buttonElement = this._formElement.querySelector(this.settings.submitButtonSelector);

    // все поля ввода формы
    this._inputList = Array.from(this._formElement.querySelectorAll(this.settings.inputSelector));
  }

  enableValidation() {
    // обрабочик для сабмит
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    // обработчик для ввода
    this._inputList.forEach((popupField) => {
      popupField.addEventListener('input', () => this._checkField(popupField));

      // установка состояния кнопки формы по-умолчанию
      this._toggleButtonState();
    });
  }

  // Проверка отдельного поля по событию и переключение кнопки
  _checkField(popupField){
    this._checkInputValidity(popupField);
    this._toggleButtonState();
  }

  // Проверка валидности отдельного input
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Показать спан с ошибкой
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}Error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this.settings.inputErrorClass);
  }

  // Скрыть спан с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}Error`);
    inputElement.classList.remove(this.settings.inputErrorClass);
    errorElement.textContent = '';
  }

  // Переключение состояния кнопки вкл-выкл
  _toggleButtonState(){
    if (this.hasInvalidInput()) {
      this._buttonElement.classList.add(this.settings.inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(this.settings.inactiveButtonClass);
    }
  }

  // Проверка общего статуса валидности по всем полям
  hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

// Сброс сообщений об ошибках на форме (например при открытии)
// второй публичный метод нужен для сброса ошибок при открытии формы
  clearFormErrors() {
      this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
      this._toggleButtonState()
  }

  loadingON(){
    this._buttonElementDefaultValue = this._buttonElement.value;
    this._buttonElement.value = 'Сохранение...';
  }

  loadingOff(){
    this._buttonElement.value = this._buttonElementDefaultValue;
  }
}


