export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  downloadInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`При инициализирующем запросе карточек произошла ошибка: ${res.status}`);
      });
  }

  downloadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`При запросе данных о пользователе произошла ошибка: ${res.status}`);
      });
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`При передаче данных о пользователе произошла ошибка: ${res.status}`);
      });
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`При передаче данных новой карточки произошла ошибка: ${res.status}`);
      });
  }

  // Удалить карточку с сервера
  removeCard(cardData) {
    return fetch(`${this._baseUrl}/cards/${cardData._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`При удалении существующей карточки ${cardData._id} произошла ошибка: ${res.status}`);
      });
  }

  // Добавить лайк карточке на сервере
  addCardLike(cardData) {
    return fetch(`${this._baseUrl}/cards/likes/${cardData._id}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`При попытке поставить лайк карточке ${cardData._id} произошла ошибка: ${res.status}`);
      });
  }

  // Убрать лайк карточки на сервере
  removeCardLike(cardData) {
    return fetch(`${this._baseUrl}/cards/likes/${cardData._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`При попытке убрать лайк карточке ${cardData._id} произошла ошибка: ${res.status}`);
      });
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`При обновлении аватара пользователя произошла ошибка: ${res.status}`);
      });
  }


}


