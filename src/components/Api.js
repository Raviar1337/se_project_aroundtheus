export default class Api {
  constructor(options) {
    this._url = options.url;
    this.authorization = options.authorization;
  }

  getCurrentUser(endPoint, DOMLocations) {
    return fetch(`${this._url}${endPoint}`, {
      method: "GET",
      headers: {
        authorization: this.authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Something went wrong ${res.status}`);
      })
      .then((result) => {
        console.log(result);
        console.log("umm now what??");
        DOMLocations.name.textContent = result.name;
        DOMLocations.about.textContent = result.about;
        // const profileData = {
        //   name: result.name,
        //   job: result.about,
        // };
        // return profileData;
      })
      .catch((err) => console.error(err))
      .finally(console.log("current user request attempted"));
  }

  getCards(endPoint) {
    return fetch(`${this._url}${endPoint}`, {
      method: "GET",
      headers: {
        authorization: this.authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Something went wrong ${res.status}`);
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.error(err))
      .finally(console.log("All Cards request attempted"));
  }
}
