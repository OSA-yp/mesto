export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Универсальный обработчик прописа
  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`произошла ошибка: ${response.status}`)
  }

  downloadInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  downloadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  // Сохранить данные о пользователе на сервере
  uploadUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
      .then(this._handleResponse);
  }

  // Загрузить новую карточку на сервер
  uploadNewCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
      .then(this._handleResponse);
  }

  // Удалить карточку с сервера
  removeCard(cardData) {
    return fetch(`${this._baseUrl}/cards/${cardData._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handleResponse);
  }

  // Добавить лайк карточке на сервере
  addCardLike(cardData) {
    return fetch(`${this._baseUrl}/cards/likes/${cardData._id}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._handleResponse);
  }

  // Убрать лайк карточки на сервере
  removeCardLike(cardData) {
    return fetch(`${this._baseUrl}/cards/likes/${cardData._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handleResponse);
  }

  // Изменить аватар пользователя на сервере
  updateUserAvatar(avatarURL) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarURL
      })
    })
      .then(this._handleResponse);
  }


}


