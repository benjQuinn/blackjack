const Card = require("./Card");
const { suits, faces } = require("./data/cardData");

class Deck {
  constructor() {
    this.cards = [];
    this.createDeck();
  }
  createDeck() {
    for (let f = 0; f < faces.length; f++) {
      for (let s = 0; s < suits.length; s++) {
        let cardVal;
        let isAce = false;

        if (faces[f] === "Ace") {
          cardVal = 11;
          isAce = true;
        } else if (
          faces[f] === "Jack" ||
          faces[f] === "King" ||
          faces[f] === "Queen"
        ) {
          cardVal = 10;
        } else {
          cardVal = faces[f];
        }
        this.cards.push(new Card(suits[s], faces[f], cardVal, isAce));
      }
    }
  }
}

module.exports = Deck;
