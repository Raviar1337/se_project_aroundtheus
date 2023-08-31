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
    console.log("set user info method is firing");
  }
}

/* -------------------------------------------------------------------------- */
/*                      Test area Code that makes it work                     */
/* -------------------------------------------------------------------------- */

// const profileData = {
//   name: profileName.textContent,
//   job: profileDescription.textContent,
// };

// const currentUserInfo = new UserInfo(profileData);

// console.log(profileData);

// console.log(currentUserInfo.getUserInfo());
