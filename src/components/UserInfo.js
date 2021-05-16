// YES - Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// YES - Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// YES - Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.

export class UserInfo{
  constructor(userNameElementSelector, jobElementSelector) { // .profile__name .profile__job
    this._userName = document.querySelector(userNameElementSelector);
    this._userJob =  document.querySelector(jobElementSelector);
  }

  getUserInfo(){
    const userData = {};
    userData.name = this._userName.textContent;
    userData.job = this._userJob.textContent;

    return userData
  }

  setUserInfo(userData){
    this._userName.textContent = userData.name;
    this._userJob.textContent = userData.job;
  }

}
