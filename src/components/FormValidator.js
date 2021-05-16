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

// Спринт 8:
// settings  вынесены как внешние общие данные

import {settings} from "../utils/settings";

export class FormValidator {
  constructor(formElement) {
    this._formElement = formElement;

    // Ищем кнопку формы
    this._buttonElement = this._formElement.querySelector(settings.submitButtonSelector);

    // все поля ввода формы
    this._inputList = Array.from(this._formElement.querySelectorAll(settings.inputSelector));
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
    inputElement.classList.add(settings.inputErrorClass);
  }

  // Скрыть спан с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}Error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = '';
  }

  // Переключение состояния кнопки вкл-выкл
  _toggleButtonState(){
    if (this.hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(settings.inactiveButtonClass);
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
}
