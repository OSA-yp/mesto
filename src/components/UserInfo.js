export class UserInfo{
  constructor(userNameElementSelector, jobElementSelector, avatarSelector) { // .profile__name .profile__job
    this._userName = document.querySelector(userNameElementSelector);
    this._userAbout =  document.querySelector(jobElementSelector);
    this._userAvatar =  document.querySelector(avatarSelector);
  }

  getUserInfo(){
    const userData = {};
    userData.name = this._userName.textContent;
    userData.about = this._userAbout.textContent;
    userData.avatar = this._userAvatar.src;
    return userData
  }

  setUserInfo(userData){
    this._userName.textContent = userData.name;
    this._userAbout.textContent = userData.about;
    this._userAvatar.src = userData.avatar;

  }


}
