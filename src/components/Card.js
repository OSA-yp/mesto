// Класс Card, который создаёт карточку с текстом и ссылкой на изображение
export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

   // функция устанавливает слушателей событий
  _setEventListeners(){
    // обработчики для элемента-карточки

    const deleteElementButton = this._card.querySelector('.element__delete');
    deleteElementButton.addEventListener('click', () => this._deleteElement());


    this._elementPhoto.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    this._likeElementButton.addEventListener('click', () => this._likeElement());

  }

  // Удалить карточку
  _deleteElement() {
    this._card.remove();
  }

  // Лайкнуть карточку
  _likeElement() {
    this._likeElementButton.classList.toggle('element__like_active');
  }

   // Поиск и клонирование шаблона карточки
  _getTemplate()  {
    // выбираем шаблон
    const cardTemplate = document.querySelector(this._cardSelector).content;
    // клонируем шаблон
    this._card = cardTemplate.querySelector('.element').cloneNode(true);
  }

  // функция создает карточку для отдачи внаружу
  generateCard() {

    // Запрос шаблона
    this._getTemplate()

    // Заполняем елемент данными
    this._elementPhoto = this._card.querySelector('.element__photo');
    this._likeElementButton = this._card.querySelector('.element__like');

    this._elementPhoto.alt = this._name;
    this._elementPhoto.src = this._link;

    const elementText = this._card.querySelector('.element__text');
    elementText.innerText = this._name;

    // Установку листнеров перенес из конструктора, так как при ревью попросили _cardObj не создавать в конструкторе
    this._setEventListeners();

    return this._card;
  }

}
