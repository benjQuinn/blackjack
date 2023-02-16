const Deck = require("../src/Deck");

describe("Deck", () => {
  let deck;

  beforeAll(() => {
    deck = new Deck();
  });
  it("can be instantiated", () => {
    expect(deck).toBeInstanceOf(Object);
  });
  it("creates a deck of 52 cards when instantiated", () => {
    expect(deck.cards.length).toBe(52);
  });
  it("creates a deck of 52 cards including 13 from `Spades` suit", () => {
    expect(deck.cards.filter((item) => item.suit === "Spades").length).toBe(13);
  });
  it("creates a deck of 52 cards including 13 from `Clubs` suit", () => {
    expect(deck.cards.filter((item) => item.suit === "Clubs").length).toBe(13);
  });
  it("creates a deck of 52 cards including 13 from `Hearts` suit", () => {
    expect(deck.cards.filter((item) => item.suit === "Hearts").length).toBe(13);
  });
  it("creates a deck of 52 cards including 13 from `Diamonds` suit", () => {
    expect(deck.cards.filter((item) => item.suit === "Diamonds").length).toBe(
      13
    );
  });
  it("Ace card has a value of 11", () => {
    const aceCard = deck.cards.find((item) => item.face === "Ace");

    expect(aceCard.value).toBe(11);
  });
  it("Jack card has a value of 10", () => {
    const jackCard = deck.cards.find((item) => item.face === "Jack");

    expect(jackCard.value).toBe(10);
  });
  it("King card has a value of 10", () => {
    const kingCard = deck.cards.find((item) => item.face === "King");

    expect(kingCard.value).toBe(10);
  });
  it("Queen card has a value of 10", () => {
    const queenCard = deck.cards.find((item) => item.face === "Queen");

    expect(queenCard.value).toBe(10);
  });
});
