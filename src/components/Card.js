// Класс Card, который создаёт карточку с текстом и ссылкой на изображение
export class Card {
  constructor(data, cardSelector, handleCardClick, cardRemover, serverLiker, serverUnLiker) {
    this._cardSelector = cardSelector;
    this.data = data;
    this._handleCardClick = handleCardClick;
    this._cardRemover = cardRemover;
    this._likeOnServer = serverLiker;
    this._unLikeOnServer = serverUnLiker;
    this.isLiked = false;
  }

   // функция устанавливает слушателей событий
  _setEventListeners(){
    // обработчики для элемента-карточки

    // если карточка чужая, тогда _cardRemover null, обработчик не нужен
    if(this._cardRemover !== null) {
      this.deleteElementButton.addEventListener('click', (evt) => this._handleCardDeleteClick(evt));
    }

    this._elementPhoto.addEventListener('click', () => this._handleCardClick(this.data.name, this.data.link));
    this._likeElementButton.addEventListener('click', () => {
      // если карточка уже с лайком, то убираем, если нет, то лайкаем, но только при успешной обработке на сервере
      if (this.isLiked) {
        this._unLikeOnServer(this)
        this._unLike()
      }
      else {
        this._likeOnServer(this)
        this._like()
      }
    });

  }

  _handleCardDeleteClick(evt){
    evt.preventDefault();
    this._cardRemover(this);

  }

  // Удалить карточку
  remove() {
    this._card.remove();
  }

  // Лайкнуть карточку
  _like() {
      this.isLiked = true;
      this._switchLikeSign();
  }

  // Убрать лайк с карточки
  _unLike(){
    this.isLiked = false;
    this._switchLikeSign();
  }

  // Включаем выключаем сердечко
  _switchLikeSign(){
    if (this.isLiked){
      this._likeElementButton.classList.add('element__like_active');
    }
    else {
      this._likeElementButton.classList.remove('element__like_active');
    }


  }

   // Поиск и клонирование шаблона карточки
  _getTemplate()  {
    // выбираем шаблон
    const cardTemplate = document.querySelector(this._cardSelector).content;
    // клонируем шаблон
    this._card = cardTemplate.querySelector('.element').cloneNode(true);

    // находим иконку удаления
    this.deleteElementButton = this._card.querySelector('.element__delete');
  }

  // функция создает карточку для отдачи внаружу
  generateCard() {

    // Запрос шаблона
    this._getTemplate()

    // Заполняем елемент данными
    this._elementPhoto = this._card.querySelector('.element__photo');
    this._likeElementButton = this._card.querySelector('.element__like');
    this._likeCount = this._card.querySelector('.element__likes-count');

    this._elementPhoto.alt = this.data.name;
    this._elementPhoto.src = this.data.link;

    // При создании карточки обновляем количество лайков
    this.renewLikeCount()

    // При создании выставляем нужное состояние лайка
    this._switchLikeSign()

    const elementText = this._card.querySelector('.element__text');
    elementText.innerText = this.data.name;

    // если карточка чужая, то _cardRemover будет null, значит удаляем иконку корзины
    if(this._cardRemover == null) {
      this.deleteElementButton.remove();
    }

    // Установку листнеров перенес из конструктора, так как при ревью попросили _cardObj не создавать в конструкторе
    this._setEventListeners();

    return this._card;
  }

  // Обновление отображения количества лайков
  renewLikeCount(){
    // Количество лайков это длина массива с лайками
    this._likeCount.textContent = this.data.likes.length;
  }

}
