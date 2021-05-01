// Создайте класс FormValidator, который:
// настраивает валидацию полей формы:
// YES - принимает в конструктор объект настроек с селекторами и классами формы;
// YES - принимает вторым параметром элемент той формы, которая валидируется;
// YES - имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
// YES/NO - имеет один публичный метод enableValidation, который включает валидацию формы.
//        второй публичный метод нужен для сброса ошибок при открытии формы

// Этот класс должен:
// YES - Принимать в конструктор объект настроек с классами формы;
// YES - Принимать в конструктор ссылку на HTML-элемент проверяемой формы;
// YES - Содержать приватные методы для обработки формы;
// YES - «Содержать публичный метод enableValidation — вызовите его после создания экземпляра класса».

export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;

    // Ищем кнопку формы
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

    // все поля ввода формы
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
  }

  enableValidation() {
    // обрабочик для сабмит
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
      this._inputList.forEach((popupField) => {
      popupField.addEventListener('input', () => this._checkField(popupField));
      // установка состояния кнопки формы по-умолчанию
      this._toggleButtonState(this._inputList, this._buttonElement, this._settings.inactiveButtonClass);
    });
  }

  // Проверка отдельного поля по событию и переключение кнопки
  _checkField(popupField){
    this._checkInputValidity(this._formElement, popupField, this._settings.inputErrorClass);
    this._toggleButtonState(this._inputList, this._buttonElement, this._settings.inactiveButtonClass);
  }

  // Проверка валидности отдельного input
  _checkInputValidity(formElement, inputElement, inputErrorClass) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
    } else {
      this._hideInputError(formElement, inputElement, inputErrorClass);
    }
  }

  // Показать спан с ошибкой
  _showInputError(formElement, inputElement, errorMessage, inputErrorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}Error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(inputErrorClass);
  }

  // Скрыть спан с ошибкой
  _hideInputError(formElement, inputElement, inputErrorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}Error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
  }

  // Переключение состояния кнопки вкл-выкл
  _toggleButtonState(inputList, buttonElement, inactiveButtonClass){
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
    }
  }

  // Проверка общего статуса валидности по всем полям
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }


// Сброс сообщений об ошибках на форме (например при открытии)
// второй публичный метод нужен для сброса ошибок при открытии формы
 clearFormErrors() {
      this._inputList.forEach((inputElement) => {
      this._hideInputError(this._formElement, inputElement, this._settings.inputErrorClass)
    });
  }
}
