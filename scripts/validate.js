
// Показать спан с ошибкой
function showInputError(formElement, inputElement, errorMessage, inputErrorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}Error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(inputErrorClass);
}

// Скрыть спан с ошибкой
function hideInputError(formElement, inputElement, inputErrorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}Error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
}

// Проверка валидности отдельного input
function checkInputValidity(formElement, inputElement, inputErrorClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass);
  }
}


// Навешивание событий сабмитов на формы и перебор полей ввода
const enableValidation = (settings) => {
    // перебор всех форм и добавления листнеров
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    // обрабочик для сабмит
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    // Ищем кнопку, чтобы переключать
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    // перебор по всем полям ввода форм
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    inputList.forEach((popupField) => {
      popupField.addEventListener('input', function () {
        checkInputValidity(formElement, popupField, settings.inputErrorClass);
        toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
      });
      // установка состояния кнопки формы по-умолчанию
      toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
    });
  });
};


// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
  formSelector: '.popup__form',  // форма
  inputSelector: '.popup__field',  // инпут
  submitButtonSelector: '.popup__save',   // кнопка
  inactiveButtonClass: 'popup__save_inactive',  // модификатор неактивной кнопки
  inputErrorClass: 'popup__field_with-error',  // инпут с ошибкой (подчеркивание)
});
// errorClass: 'popup__field-error'  // ошибка под полем инпута (убрал, так как имя вычисляется)

// Проверка общего статуса валидности по всем полям
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Переключение состояния кнопки вкл-выкл
function toggleButtonState(inputList, buttonElement, inactiveButtonClass){
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

// Сброс сообщений об ошибках на форме (например при открытии)
function clearFormErrors(popup) {
  // проверяем, а есть ли вообще форма
  if (popup.querySelectorAll('.popup__form').length === 0) {
    return;
  }
  const formElement = popup.querySelector('.popup__form')
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, 'popup__field_with-error')
  });

}
