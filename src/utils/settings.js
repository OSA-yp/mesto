// Настройки для валидаторов
export const settings =
  {
    // Форма и ее поля
    formSelector: '.popup__form',  // форма
    inputSelector: '.popup__field',  // инпут
    submitButtonSelector: '.popup__save',   // кнопка
    inactiveButtonClass: 'popup__save_inactive',  // модификатор неактивной кнопки
    inputErrorClass: 'popup__field_with-error',  // инпут с ошибкой (подчеркивание)

    // Селекторы кнопок основной страницы
    addButtonSelector: '.profile__add-button', // кнопка добавления картинки
    profileEditButtonSelector: '.profile__edit-button', // кнопка редактирования профиля

    // О пользователе
    userNameSelector: '.profile__name', // имя пользователя на странице
    userJobSelector: '.profile__job', // работа или обо мне, инфа про пользователя на странице

    // Селекторы попапов
    profileEditPopupSelector: '#profileEditPopup', // форма редактиварония профиля
    addPlacePopupSelector: '#addPlacePopup', // формса добавления картинки
    cardViewPopupSelector: '#elementViewPopup', // форма просмотра карточки

    cardsContainerSelector: '.elements', // контейнер с карточками
    cardSelector: '#card', // отдельная карточка
  }
