const Card = require("../src/Card");

describe("Card", () => {
  let card;

  beforeAll(() => {
    card = new Card("Clubs", "Ace", 11, true);
  });

  it("can be instantiated", () => {
    expect(card).toBeInstanceOf(Object);
  });
  it("has a suit", () => {
    expect(card.suit).toBe("Clubs");
  });
  it("has a face", () => {
    expect(card.face).toBe("Ace");
  });
  it("has a value", () => {
    expect(card.value).toBe(11);
  });
  it("can be an ace", () => {
    expect(card.ace).toBe(true);
  });
});
