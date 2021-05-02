import { Card }  from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCardsData } from "./initial-сards.js";

/// Обработчики на основной странице

const profileEditPopup = document.querySelector('#profileEditPopup');
// событие по клик на кнопке редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function () {
  fillProfileEditPopup();
  openPopup(profileEditPopup);
});

// обработка закрытия попапов по клику вне формы
const popupList = Array.from(document.querySelectorAll('.popup'))
popupList.forEach((singlePopup) => {
  singlePopup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(singlePopup);
    }
  });
});

// событие по клик на кнопке +
const addPlacePopup = document.querySelector('#addPlacePopup');
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', function () {
  clearAddPopup();
  openPopup(addPlacePopup);
});


/// Общие события для всех попапов
// крестик закрыти попапа, добавляется на все попапы по очереди
const closePopupButtons = document.querySelectorAll('.popup__close');
closePopupButtons.forEach(function (item) {
 item.addEventListener('click', function (event) {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  });
})

// Обработчики для формы добавления редактирования профиля
// событие по кнопке сохранить при редактировании профиля
const profileEditForm = document.querySelector('#profileEditForm');
profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);

// обработчик сабмита
function profileEditFormSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  saveProfileEditPopup();  // закрываем попап с сохранением
}

// Обработчики для формы добавления элемента-картинки
// событие по кнопке сохранить
const addPlaceForm = document.querySelector('#addPlaceForm');
addPlaceForm.addEventListener('submit', addPlaceFormSubmitHandler);

// обработчик сабмита
function addPlaceFormSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  saveAddPlacePopup();  // закрываем попап с сохранением
}



// Инициализация страницы
//addCard('Архыз', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg')
loadDefaultCards();

// Загрузка 6ти предустановленных карточек
function loadDefaultCards() {
  initialCardsData.forEach(function (item){
 // Добавление карточки
    addCard(createCard(item));
  });

}

function createCard(data) {
  const newCard = new Card(data,'#card')
return newCard.generateCard();
}
// добляем новый элемент в начало списка
function addCard(newCard) {
  const elements = document.querySelector('.elements');
  elements.prepend(newCard);
}

// открыть любой попап
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEscape);
}

// закрыть любой попап
function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEscape);
}

// заполнить попап редактирования профиля
const nameForEdit = document.querySelector('.profile__name');
const jobForEdit = document.querySelector('.profile__job');
const nameInPopup = document.querySelector('#popupProfileName');
const jobInPopup = document.querySelector('#popupProfileJob');
function fillProfileEditPopup(){
  nameInPopup.value = nameForEdit.textContent;
  jobInPopup.value = jobForEdit.textContent;

  //Сброс предыдущих ошибок валидации
  profileEditPopupFormValidator.clearFormErrors();
}

// сохранить и закрыть попап редактирования профиля
function saveProfileEditPopup(){
  nameForEdit.textContent = nameInPopup.value;
  jobForEdit.textContent = jobInPopup.value;
  closePopup(profileEditPopup);
}

// очистить попап добавления элемента-картинки

function clearAddPopup(){
  // сброс предыдущих значений полей попапа
  addPlacePopupForm.reset();
  //Сброс ошибок валидации
  addPlacePopupFormValidator.clearFormErrors();

}

// сохранить и добавить новый элемент-картинку, закрыть попап
const popupAddPlaceName = document.querySelector('#popupAddPlaceName');
const popupAddPlaceLink = document.querySelector('#popupAddPlaceLink');
function saveAddPlacePopup(){
  addCard(createCard({name: popupAddPlaceName.value, link: popupAddPlaceLink.value}));
  closePopup(addPlacePopup);
}


// обработка закрытия попапов по эскейп
function closePopupOnEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector(".popup_opened"));
  }
}

// Настройки для валидаторов
const settings =
  {
    formSelector: '.popup__form',  // форма
    inputSelector: '.popup__field',  // инпут
    submitButtonSelector: '.popup__save',   // кнопка
    inactiveButtonClass: 'popup__save_inactive',  // модификатор неактивной кнопки
    inputErrorClass: 'popup__field_with-error',  // инпут с ошибкой (подчеркивание)
  }

// Достаем формы из попапов
const profileEditPopupForm = profileEditPopup.querySelector(settings.formSelector);
const addPlacePopupForm = addPlacePopup.querySelector(settings.formSelector);

// Создаем валидаторы формам
const profileEditPopupFormValidator = new FormValidator(settings, profileEditPopupForm);
const addPlacePopupFormValidator = new FormValidator(settings, addPlacePopupForm);

// Активируем валидаторы
profileEditPopupFormValidator.enableValidation();
addPlacePopupFormValidator.enableValidation();


