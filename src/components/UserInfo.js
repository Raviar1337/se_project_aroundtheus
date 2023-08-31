export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    const profileData = {
      profileName: this._name.textContent,
      profileJob: this._job.textContent,
    };
    console.log(profileData);
    return profileData;
  }

  setUserInfo(nameInput, descriptionInput) {
    //used during form submit action
    this._name.textContent = nameInput;
    this._job.textContent = descriptionInput;
    console.log("set user info method is firing");
  }
}

/* -------------------------------------------------------------------------- */
/*                      Test area Code that makes it work                     */
/* -------------------------------------------------------------------------- */
