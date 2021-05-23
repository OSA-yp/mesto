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
    profileAvatarSelector: '.profile__avatar', // картинка-аватар
    profileAvatarOverLaySelector: '.profile__overlay', // картинка-аватар/ оверлей для клика


    // О пользователе
    userNameSelector: '.profile__name', // имя пользователя на странице
    userJobSelector: '.profile__job', // работа или обо мне, инфа про пользователя на странице
    avatarSelector: '.profile__avatar', // картинка с аватаром

    // Селекторы попапов
    profileEditPopupSelector: '#profileEditPopup', // форма редактиварония профиля
    addPlacePopupSelector: '#addPlacePopup', // формса добавления картинки
    cardViewPopupSelector: '#elementViewPopup', // форма просмотра карточки
    removePlacePopupSelector: '#removePlacePopup', // форма с запросом на удаление карточки
    avatarEditPopupSelector: '#avatarEditPopup', // форма раедактирования аватара

    cardsContainerSelector: '.elements', // контейнер с карточками
    cardSelector: '#card', // отдельная карточка
  }
