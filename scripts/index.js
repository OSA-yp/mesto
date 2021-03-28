
/// Обработчики на основной странице
// событие по клик на кнопке редактирования профиля
const popup = document.querySelector('#profileEditPopup');
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function () {
  fillProfileEditPopup();
  openPopup(popup);
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
const closePopupButton = document.querySelectorAll('.popup__close');
closePopupButton.forEach(function (item) {
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
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  initialCards.forEach(function (item){
    addCard(createCard(item.name, item.link));
  });

}

// Создение новой карточки
function createCard(name, link) {

  // выбираем шаблон
  const cardTemplate = document.querySelector('#card').content;

  // клонируем шаблон
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);

  // Заполняем елемент данными
  const elementPhoto = newCard.querySelector('.element__photo');
  elementPhoto.alt = name;
  elementPhoto.src = link;

  const elementText = newCard.querySelector('.element__text');
  elementText.innerText = name;

  // обработчики для новоого элемента-карточки
  const deleteElementButton = newCard.querySelector('.element__delete');
  deleteElementButton.addEventListener('click', function (event) {
    deleteElement(event.target.closest('.element'));
  });

  elementPhoto.addEventListener('click', function () {
    openElementPhotoPopup(name, link);
  });

  const likeElementButton = newCard.querySelector('.element__like');
  likeElementButton.addEventListener('click', function (event) {
    likeElement(event.target);
  });

  return newCard;

}
// добляем новый элемент в начало списка
function addCard(newCard) {
  const elements = document.querySelector('.elements');
  elements.prepend(newCard);
}

// открыть любой попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// закрыть любой попап
function closePopup(popup){
  popup.classList.remove('popup_opened');
}

// заполнить попап редактирования профиля
const nameForEdit = document.querySelector('.profile__name');
const jobForEdit = document.querySelector('.profile__job');
function fillProfileEditPopup(){
  const nameInPopup = document.querySelector('#popupProfileName');
  nameInPopup.value = nameForEdit.textContent;

  const jobInPopup = document.querySelector('#popupProfileJob');
  jobInPopup.value = jobForEdit.textContent;
}

// сохранить и закрыть попап редактирования профиля
const profileEditPopup = document.querySelector('#profileEditPopup');
function saveProfileEditPopup(){
  const nameInPopup = document.querySelector('#popupProfileName');
  nameForEdit.textContent = nameInPopup.value;

  const jobInPopup = document.querySelector('#popupProfileJob');
  jobForEdit.textContent = jobInPopup.value;

  closePopup(profileEditPopup);
}

// очистить попап добавления элемента-картинки
const popupAddPlaceName = document.querySelector('#popupAddPlaceName');
const popupAddPlaceLink = document.querySelector('#popupAddPlaceLink');
function clearAddPopup(){
  // сброс предыдущих значений полей попапа
  popupAddPlaceName.value = '';
  popupAddPlaceLink.value = '';
}

// сохранить и добавить новый элемент-картинку, закрыть попап
function saveAddPlacePopup(){
  addCard(createCard(popupAddPlaceName.value, popupAddPlaceLink.value));
  closePopup(addPlacePopup);
}

// удалить карточку
function deleteElement(cardToDelete) {
  cardToDelete.remove();
}

// Лайкнуть карточку
function likeElement(item) {
  item.classList.toggle('element__like_active');
  }


// Открыть popup с фото карточки
const elementViewPopup = document.querySelector('#elementViewPopup');
const popupImgSrc = elementViewPopup.querySelector('.popup__image');
const popupImgCaption = elementViewPopup.querySelector('.popup__caption');
function openElementPhotoPopup(name, link) {
  popupImgSrc.src = link;
  popupImgCaption.textContent = name;

  openPopup(elementViewPopup);
}

