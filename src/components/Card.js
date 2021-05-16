// Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
// YES- принимает в конструктор её данные и селектор её template-элемента;
// YES - содержит приватные методы, которые работают с разметкой,
// YES - устанавливают слушателей событий;
// YES - содержит приватные методы для каждого обработчика;
// YES - содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.

// Спринт 7
// Класс Card должен:
// YES - Принимать в конструктор ссылки на изображение и текст;
// YES - Принимать в конструктор селектор для template-элемента с шаблоном разметки;
// YES - Обладать приватными методами, которые установят слушателей событий, обработают клики, подготовят карточку к публикации;
// YES - Обладать публичным методом, который вернёт готовую разметку, с установленными слушателями событий.

// import { openPopup } from "../index"; // связь из спринта 7

// Спринт 8
// YES - Свяжите класс Card c попапом.
// YES - Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick.
// YES - Эта функция должна открывать попап с картинкой при клике на карточку.


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

    const deleteElementButton = this._cardObj.querySelector('.element__delete');
    deleteElementButton.addEventListener('click', () => this._deleteElement());


    this._elementPhoto.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    this._likeElementButton.addEventListener('click', () => this._likeElement());

  }

  // Удалить карточку
  _deleteElement() {
    this._cardObj.remove();
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
    this._cardObj = cardTemplate.querySelector('.element').cloneNode(true);
  }

  // функция создает карточку для отдачи внаружу
  generateCard() {

    // Запрос шаблона
    this._getTemplate()

    // Заполняем елемент данными
    this._elementPhoto = this._cardObj.querySelector('.element__photo');
    this._likeElementButton = this._cardObj.querySelector('.element__like');

    this._elementPhoto.alt = this._name;
    this._elementPhoto.src = this._link;

    const elementText = this._cardObj.querySelector('.element__text');
    elementText.innerText = this._name;

    // Установку листнеров перенес из конструктора, так как при ревью попросили _cardObj не создавать в конструкторе
    this._setEventListeners();

    return this._cardObj;
  }

}
