export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    const profileData = { profileName: this._name, profileJob: this._job };
    console.log(profileData);
    return profileData;
  }

  setUserInfo() {
    //used during form submit action
  }
}

/* -------------------------------------------------------------------------- */
/*                      Test area Code that makes it work                     */
/* -------------------------------------------------------------------------- */
