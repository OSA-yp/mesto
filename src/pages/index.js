import './index.css';
import {Card}  from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {PopupWithImage} from "../components/PopupWithImage";
import {UserInfo} from "../components/UserInfo";
import {PopupWithForm} from "../components/PopupWithForm";
import {settings} from "../utils/settings";
import {Section} from "../components/Section";
import {Api} from "../components/Api";

// Экземпляр для работы с API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: 'ecb87b52-b9fe-4939-9de5-6f00ffcecd60',
    'Content-Type': 'application/json'
  }
});


// Информация о пользователе
const userInfo = new UserInfo(settings.userNameSelector ,settings.userJobSelector, settings.avatarSelector);


// Попап редактирования профиля
const profileEditPopup = new PopupWithForm(settings.profileEditPopupSelector, profileEditFormSubmitHandler);
profileEditPopup.setEventListeners();

// Попап запроса удаление карточки
const removePlacePopup = new PopupWithForm(settings.removePlacePopupSelector, removePlacePopupSubmitHandler)
removePlacePopup.setEventListeners();

// Попап запроса редактирования аватара
const avatarEditPopup = new PopupWithForm(settings.avatarEditPopupSelector, avatarEditPopupSubmitHandler)
avatarEditPopup.setEventListeners();



// событие по клик на кнопке редактирования профиля
const editButton = document.querySelector(settings.profileEditButtonSelector);
editButton.addEventListener('click', function () {
  fillProfileEditPopup(userInfo.getUserInfo());
  profileEditPopup.open();
});

// событие по клик на аватаре
const profileAvatar = document.querySelector(settings.profileAvatarSelector);
const profileAvatarOverLay = document.querySelector(settings.profileAvatarOverLaySelector);
const newAvatarLink = document.querySelector('#avatarEditLink') // avatar link input
profileAvatarOverLay.addEventListener('click', function () {
  newAvatarLink.value = profileAvatar.src;
  avatarEditPopup.open();
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

// обработчик сабмина попапа с запросом на удаление карточки
function removePlacePopupSubmitHandler(){
  profileEditPopupFormValidator.loadingON();
  api.removeCard(cardToDelete.data)
    .then(() => {
      cardToDelete.remove(); // локально удаляем элемент на странице в случае успеха
      removePlacePopup.close();
      profileEditPopupFormValidator.loadingOff();
    })
    .catch((err) => {
      console.error(err);
      profileEditPopupFormValidator.loadingOff();
    });
}


// обработчик сабмита формы редактирования аватара
function avatarEditPopupSubmitHandler(){
  avatarEditPopupFormValidator.loadingON();
  const userData = userInfo.getUserInfo();
  userData.avatar = newAvatarLink.value;
  api.updateUserAvatar(userData.avatar)
    .then((result) => {
      userInfo.setUserInfo(userData);
      avatarEditPopup.close();
      avatarEditPopupFormValidator.loadingOff();
    })
    .catch((err) => {
      console.error(err);
      avatarEditPopupFormValidator.loadingOff();
    });


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


// Инициализация страницы & Первичное получение данных о пользователе
let currentUserId = null;
const sectionWithCards = new Section(createCard, settings.cardsContainerSelector);

Promise.all([api.downloadUserInfo(), api.downloadInitialCards()])
  .then(([ userData, cards ]) => {
    userInfo.setUserInfo(userData);
    currentUserId = userData._id;
    sectionWithCards.initialRender(cards);
  })
  .catch((err) => {
    console.error(`При инициализирующем запросе ${err}`);
  });

// Поставить лайк на сервере, возващает признак успеха
function likeOnServer(card){
  api.addCardLike(card.data)
      .then((result) => {
        card.data = result;
        card.like();
        card.renewLikeCount();
      })
      .catch((err) => {
        console.error(`При попытке поставить лайк карточке ${card.data._id} произошла ошибка: ${err}`);
        return false;
      });
}

// Удалить лайк карточки на сервере, возващает признак успеха
function unLikeOnServer(card){
  return api.removeCardLike(card.data)
    .then((result) => {
      card.data = result;
      card.unLike();
      card.renewLikeCount();
      return true;
    })
    .catch((err) => {
      console.error(`При попытке убрать лайк карточке ${card.data._id} произошла ошибка: ${err}`);
      return false;
    });
}


//addCard('Архыз', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg')

function createCard(data) {
  let cardRemover = null;  // с const не получило
  if (currentUserId === data.owner._id) {
    cardRemover =  catchCardToDelete;
  }
  const newCard = new Card(data,settings.cardSelector, clickOnCardHandler, cardRemover, likeOnServer, unLikeOnServer, currentUserId)
  return newCard.generateCard();
}

// Запонимнаем данные карточки для удаления
let cardToDelete = {};
function catchCardToDelete(deleteMe){
  cardToDelete = deleteMe;
  removePlacePopup.open();
}

// заполнить попап редактирования профиля
const nameInPopup = document.querySelector('#popupProfileName');
const aboutInPopup = document.querySelector('#popupProfileAbout');
function fillProfileEditPopup(userData){
  nameInPopup.value = userData.name;
  aboutInPopup.value = userData.about;

  //Сброс предыдущих ошибок валидации
  profileEditPopupFormValidator.clearFormErrors();
}

// сохранить и закрыть попап редактирования профиля
function saveProfileEditPopup(data){
  profileEditPopupFormValidator.loadingON();
  api.uploadUserInfo(data)
    .then((result) => {
      userInfo.setUserInfo(result);
      profileEditPopup.close();
      profileEditPopupFormValidator.loadingOff();
    })
    .catch((err) => {
      console.error(err);
      profileEditPopupFormValidator.loadingOff();
    });

}

// сохранить и добавить новый элемент-картинку, закрыть попап
function saveAddPlacePopup(data){
  api.uploadNewCard(data)
    .then((result) => {
        sectionWithCards.addItem(createCard(result))
        addPlacePopup.close();
    })
    .catch((err) => {
      console.error(`Произошла ошибка: ${err}`);
    });
}

// Создаем валидаторы формам
const profileEditPopupFormValidator = new FormValidator(settings, profileEditPopup.form);
const addPlacePopupFormValidator = new FormValidator(settings, addPlacePopup.form);
const avatarEditPopupFormValidator = new FormValidator(settings, avatarEditPopup.form);

// Активируем валидаторы
profileEditPopupFormValidator.enableValidation();
addPlacePopupFormValidator.enableValidation();
avatarEditPopupFormValidator.enableValidation();

// Оповещаем попап о валидаторе его формы
profileEditPopup.setFormValidator(profileEditPopupFormValidator);
addPlacePopup.setFormValidator(addPlacePopupFormValidator)
avatarEditPopup.setFormValidator(avatarEditPopupFormValidator)


