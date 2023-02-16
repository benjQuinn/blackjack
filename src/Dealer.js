const Deck = require("./Deck");

class Dealer {
  constructor() {
    this.deck = new Deck();
    this.hand = [];
    this.handValue = 0;
  }
  shuffleDeck() {
    // using Fisher-Yates algorithm
    for (let i = this.deck.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck.cards[i], this.deck.cards[j]] = [
        this.deck.cards[j],
        this.deck.cards[i],
      ];
    }
    console.log(this.deck.cards);
    console.log(`Deck shuffled`);
  }
}

module.exports = Dealer;
