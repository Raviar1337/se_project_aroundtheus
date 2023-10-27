export default class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = name;
    this._job = job;
    this._avatar = avatar;
  }

  getUserInfo() {
    const profileData = {
      profileName: this._name.textContent,
      profileJob: this._job.textContent,
      profileAvatar: this._avatar.src,
    };

    return profileData;
  }

  setUserInfo(nameInput, descriptionInput) {
    //used during form submit action
    this._name.textContent = nameInput;
    this._job.textContent = descriptionInput;
  }

  setUserAvatar(avatarInput) {
    this._avatar.src = avatarInput.avatar;
  }
}

/* -------------------------------------------------------------------------- */
/*                      Test area Code that makes it work                     */
/* -------------------------------------------------------------------------- */
