export default class Api {
  constructor(options) {
    this._url = options.url;
    this.authorization = options.authorization;
    this._headers = {
      authorization: this.authorization,
      "Content-Type": "application/json",
    };
  }

  _processResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  getCurrentUser() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._processResponse);
  }

  editCurrentUser(input) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: input.title,
        about: input.description,
      }),
    }).then(this._processResponse);
    // .then((result) => {
    //   console.log(result);
    //   return result
    // })
    // .catch((err) => console.error(err));
  }

  editUserAvatar(input) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: input.url,
      }),
    }).then(this._processResponse);

    // .catch((err) => console.error(err));
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._processResponse);
    // .then((result) => {
    //   console.log(result);
    //   return (initialCards = result);
    //   // initialCards.push(result[1]);
    //   // console.log(result[1]);
    //   //console.log(initialCards);
    // })
    //.then((result) => cardsListSection.renderItems(result))
    // .catch((err) => console.error(err))
  }

  postCard(input) {
    console.log(input);
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        link: input.link,
        name: input.name,
      }),
    }).then(this._processResponse);
    // .then((result) => {
    //   console.log(result);
    //   return result;
    // });
    // .catch((err) => console.error(err));
  }

  deleteCard(cardId) {
    console.log(cardId);
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._processResponse);
    //   .then((result) => {
    //     console.log(result);
    //   });
    // // .catch((err) => console.error(err));
  }

  likeCard(cardId) {
    console.log(cardId);
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._processResponse);

    // .catch((err) => console.error(err))
  }

  disLikeCard(cardId) {
    console.log(cardId);
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._processResponse);

    // .catch((err) => console.error(err))
  }
}

/* -------------------------------------------------------------------------- */
/*                              request template                              */
/* -------------------------------------------------------------------------- */

// function basicCall() {
//   return fetch(`${this._url}${endPoint}`, {
//     method: "GET",
//     headers: this._headers,
//   })
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Something went wrong ${res.status}`);
//     })
//     .then((result) => {
//       console.log(result);
//       return result;
//     })
//     .catch((err) => console.error(err))
//     .finally(console.log("Zug Zug"));
// }
