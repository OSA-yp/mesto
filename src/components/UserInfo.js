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
