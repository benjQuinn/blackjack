const Dealer = require("../src/Dealer");
const Deck = require("./Deck");

class Player {
  constructor(name) {
    this.name = name;
    this.dealer = new Dealer();
    this.hand = [];
    this.handValue = 0;
    console.log(`Welcome to the table ${this.name}!!`);
  }
  checkHandValue() {
    if (this.handValue > 21) {
      return `BUST! Dealer wins!!`;
    } else if (this.handValue === 21) {
      return `BLACKJACK! ${this.name} wins!!`;
    } else {
      return;
    }
  }
  initializeGame() {
    // creates fresh Deck and shuffles it
    this.dealer.deck = new Deck();
    this.dealer.shuffleDeck();
    // initialize player and dealer properties
    this.dealer.hand = [];
    this.dealer.handValue = 0;
    this.hand = [];
    this.handValue = 0;
  }
  deal() {
    // dealer deals first card to themselves
    const dealersCard = this.dealer.deck.cards.pop();
    this.dealer.hand.push(dealersCard);
    this.dealer.handValue += dealersCard.value;
    // dealer deals two cards to player
    for (let i = 0; i < 2; i++) {
      const playersCard = this.dealer.deck.cards.pop();

      this.hand.push(playersCard);
      this.handValue += playersCard.value;
    }

    console.log(this.hand);
    console.log(`${this.name}'s hand value is ${this.handValue}`);
    return this.checkHandValue();
  }
  hit() {
    // dealer deals card to player
    const card = this.dealer.deck.cards.pop();
    this.hand.push(card);
    this.handValue += card.value;

    if (this.hand.some((item) => item.ace) && this.handValue > 21) {
      this.handValue -= 10;
    }

    console.log(this.hand);
    console.log(`${this.name}'s hand value is ${this.handValue}`);
    return this.checkHandValue();
  }
  stand() {
    // dealer must hit when 16 or below, and must stand when 17 or above
    while (this.dealer.handValue <= 16) {
      const card = this.dealer.deck.cards.pop();
      this.dealer.hand.push(card);
      this.dealer.handValue += card.value;

      if (this.dealer.hand.some((item) => item.ace) && this.dealer.handValue > 21) {
        this.dealer.handValue -= 10;
      }

      console.log(this.dealer.hand);
      console.log(`Dealer's hand value is ${this.dealer.handValue}`);
    }

    if (this.dealer.handValue > 21) {
      return `Dealer is BUST! ${this.name} wins!!`;
    } else if (this.dealer.handValue > this.handValue) {
      return `Dealer wins!!`;
    } else if (this.dealer.handValue === this.handValue) {
      return `It's a tie!!`
    } else {
      return `${this.name} wins!!`;
    }
  }
}

module.exports = Player;
