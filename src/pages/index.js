import './index.css';
import {Card}  from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {initialCardsData} from "../utils/initial-сards.js";
import {PopupWithImage} from "../components/PopupWithImage";
import {UserInfo} from "../components/UserInfo";
import {PopupWithForm} from "../components/PopupWithForm";
import {settings} from "../utils/settings";
import {Section} from "../components/Section";

// Информация о пользователе
const userInfo = new UserInfo(settings.userNameSelector ,settings.userJobSelector);

// Попап редактирования профиля
const profileEditPopup = new PopupWithForm(settings.profileEditPopupSelector, profileEditFormSubmitHandler);
profileEditPopup.setEventListeners();

// событие по клик на кнопке редактирования профиля
const editButton = document.querySelector(settings.profileEditButtonSelector);
editButton.addEventListener('click', function () {
  fillProfileEditPopup(userInfo.getUserInfo());
  profileEditPopup.open();
});

// Попап добавления картинки
const addPlacePopup = new PopupWithForm(settings.addPlacePopupSelector, addPlaceFormSubmitHandler)
addPlacePopup.setEventListeners();

// событие по клик на кнопке +
const addButton = document.querySelector(settings.addButtonSelector);
addButton.addEventListener('click', function () {
  addPlacePopup.open();
});

// обработчик сабмита формы редактирования профиля
function profileEditFormSubmitHandler (evt, data) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  if (!profileEditPopupFormValidator.hasInvalidInput()) {  // проверяем, что на форме нет ошибок
    saveProfileEditPopup(data);  // закрываем попап с сохранением
  }

}

// обработчик сабмита формы добавления карточки
function addPlaceFormSubmitHandler (evt, data) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  if (!addPlacePopupFormValidator.hasInvalidInput()) { // проверяем, что на форме нет ошибок
    saveAddPlacePopup(data);  // закрываем попап с сохранением
  }
}

// Создание попапа с картинкой
const popupWithImage = new PopupWithImage(settings.cardViewPopupSelector);
popupWithImage.setEventListeners();

// Обработка клика внутри карточки - открываем карточку
function clickOnCardHandler(text, url) {
  popupWithImage.open(text, url)
}

// Инициализация страницы
const sectionWithCards = new Section({items:initialCardsData, renderer: createCard}, settings.cardsContainerSelector);
sectionWithCards.initialRender();

//addCard('Архыз', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg')

function createCard(data) {
  const newCard = new Card(data,settings.cardSelector, clickOnCardHandler)
return newCard.generateCard();
}

// заполнить попап редактирования профиля
const nameInPopup = document.querySelector('#popupProfileName');
const jobInPopup = document.querySelector('#popupProfileJob');
function fillProfileEditPopup(userData){
  nameInPopup.value = userData.name;
  jobInPopup.value = userData.job;

  //Сброс предыдущих ошибок валидации
  profileEditPopupFormValidator.clearFormErrors();
}

// сохранить и закрыть попап редактирования профиля
function saveProfileEditPopup(data){
  userInfo.setUserInfo({name: data.name, job: data.job});
  profileEditPopup.close();
}

// сохранить и добавить новый элемент-картинку, закрыть попап
function saveAddPlacePopup(data){
  sectionWithCards.addItem(createCard({name: data.name, link: data.link}));
  addPlacePopup.close();
}

// Создаем валидаторы формам
const profileEditPopupFormValidator = new FormValidator(settings, profileEditPopup.form);
const addPlacePopupFormValidator = new FormValidator(settings, addPlacePopup.form);

// Активируем валидаторы
profileEditPopupFormValidator.enableValidation();
addPlacePopupFormValidator.enableValidation();

// Оповещаем попап о валидаторе его формы
profileEditPopup.setFormValidator(profileEditPopupFormValidator);
addPlacePopup.setFormValidator(addPlacePopupFormValidator)


