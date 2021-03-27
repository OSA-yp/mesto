
/// Обработчики на основной странице
// событие по клик на кнопке редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function () {
  const popup = document.querySelector('#profileEditPopup');
  fillProfileEditPopup();
  openPopup(popup);
});

// событие по клик на кнопке +
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', function () {
  clearAddPopup();
  const addPlacePopup = document.querySelector('#addPlacePopup');
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
      addCard(item.name, item.link)
  });

}

// Добавление 1-го нового элемента-карточки
function addCard(name, link) {
  const elements = document.querySelector('.elements');

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

  elementPhoto.addEventListener('click', function (event) {
    const card = event.target.closest('.element');
    openElementPhotoPopup(card);
  });

  const likeElementButton = newCard.querySelector('.element__like');
  likeElementButton.addEventListener('click', function (event) {
    likeElement(event.target);
  });


  // добляем новый элемент в начало списка
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
function fillProfileEditPopup(){
  const nameForEdit = document.querySelector('.profile__name');
  const nameInPopup = document.querySelector('#popupProfileName');
  nameInPopup.value = nameForEdit.textContent;

  const jobForEdit = document.querySelector('.profile__job');
  const jobInPopup = document.querySelector('#popupProfileJob');
  jobInPopup.value = jobForEdit.textContent;
}

// сохранить и закрыть попап редактирования профиля
function saveProfileEditPopup(){
  const nameForEdit = document.querySelector('.profile__name');
  const nameInPopup = document.querySelector('#popupProfileName');
  nameForEdit.textContent = nameInPopup.value;

  const jobForEdit = document.querySelector('.profile__job');
  const jobInPopup = document.querySelector('#popupProfileJob');
  jobForEdit.textContent = jobInPopup.value;

  const popup = document.querySelector('#profileEditPopup');
  closePopup(popup);
}

// очистить попап добавления элемента-картинки
function clearAddPopup(){
  // сброс предыдущих значений полей попапа
  const popupAddPlaceName = document.querySelector('#popupAddPlaceName');
  popupAddPlaceName.value = '';
  const popupAddPlaceLink = document.querySelector('#popupAddPlaceLink');
  popupAddPlaceLink.value = '';

}
// сохранить и добавить новый элемент-картинку, закрыть попап
function saveAddPlacePopup(){
  const popupAddPlaceName = document.querySelector('#popupAddPlaceName');
  const popupAddPlaceLink = document.querySelector('#popupAddPlaceLink');
  addCard(popupAddPlaceName.value, popupAddPlaceLink.value);

  const popup = document.querySelector('#addPlacePopup');
  closePopup(popup);
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
function openElementPhotoPopup(card) {
  const popup = document.querySelector('#elementViewPopup');

  const popupImgSrc = popup.querySelector('.popup__image');
  const cardImgSrc = card.querySelector('.element__photo')
  popupImgSrc.src = cardImgSrc.src;

  const popupImgCaption = popup.querySelector('.popup__caption');
  const cardImgCaption = card.querySelector('.element__text')
  popupImgCaption.textContent = cardImgCaption.textContent;

  openPopup(popup);
}

