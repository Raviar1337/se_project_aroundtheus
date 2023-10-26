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
        DOMLocations.avatar.src = result.avatar;
        // const profileData = {
        //   name: result.name,
        //   job: result.about,
        // };
        // return profileData;
      })
      .catch((err) => console.error(err));
  }

  editCurrentUser(endPoint, input) {
    fetch(`${this._url}${endPoint}`, {
      method: "PATCH",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: input.title,
        about: input.description,
      }),
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
      .catch((err) => console.error(err));
  }

  editUserAvatar(endPoint, input) {
    return fetch(`${this._url}${endPoint}`, {
      method: "PATCH",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: input.url,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Something went wrong ${res.status}`);
      })

      .catch((err) => console.error(err));
  }

  getCards(endPoint, cardsListSection, initialCards) {
    fetch(`${this._url}${endPoint}`, {
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
      // .then((result) => {
      //   console.log(result);
      //   return (initialCards = result);
      //   // initialCards.push(result[1]);
      //   // console.log(result[1]);
      //   //console.log(initialCards);
      // })
      .then((result) => cardsListSection.renderItems(result))
      .catch((err) => console.error(err));
  }

  postCard(endPoint, input) {
    console.log(input);
    return fetch(`${this._url}${endPoint}`, {
      method: "POST",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: input.link,
        name: input.name,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Something went wrong ${res.status}`);
      })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => console.error(err));
  }

  deleteCard(endPoint, cardId) {
    console.log(cardId);
    fetch(`${this._url}${endPoint}${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
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
      .catch((err) => console.error(err));
  }

  likeCard(endPoint, cardId) {
    console.log(cardId);
    return fetch(`${this._url}${endPoint}${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
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
        return result;
      })
      .catch((err) => console.error(err))
      .finally(console.log("Card Like sent"));
  }

  disLikeCard(endPoint, cardId) {
    console.log(cardId);
    return fetch(`${this._url}${endPoint}${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
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
        return result;
      })
      .catch((err) => console.error(err))
      .finally(console.log("Card Dislike sent"));
  }
}

/* -------------------------------------------------------------------------- */
/*                              request template                              */
/* -------------------------------------------------------------------------- */

// function basicCall() {
//   return fetch(`${this._url}${endPoint}`, {
//     method: "GET",
//     headers: {
//       authorization: this.authorization,
//     },
//   })
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Something went wrong ${res.status}`);
//     })
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => console.error(err))
//     .finally(console.log("Zug Zug"));
// }
