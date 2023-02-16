const Card = require("../src/Card");
const Player = require("../src/Player");

describe("Player", () => {
  let player;

  beforeAll(() => {
    player = new Player("Ben");
  });

  it("can be instantiated", () => {
    expect(player).toBeInstanceOf(Object);
  });
  it("has a name", () => {
    expect(player.name).toBe("Ben");
  });
  it("instantiates a dealer", () => {
    expect(player.dealer).toBeInstanceOf(Object);
  });
  it("has a hand", () => {
    expect(player.hand).toStrictEqual([]);
  });
  it("has a hand value", () => {
    expect(player.handValue).toBe(0);
  });
});

describe("checkHandValue method", () => {
  let player;

  beforeAll(() => {
    player = new Player("Ben");
  });

  it("returns player wins message if player gets 21", () => {
    player.handValue = 21;

    expect(player.checkHandValue()).toBe(`BLACKJACK! Ben wins!!`);
  });
  it("returns dealer wins message if player exceeds 21", () => {
    player.handValue = 22;

    expect(player.checkHandValue()).toBe(`BUST! Dealer wins!!`);
  });
});

describe("initializeGame method", () => {
  let player;

  beforeAll(() => {
    player = new Player("Ben");
  });

  it("should create a fresh deck", () => {
    player.initializeGame();

    expect(player.dealer.deck.cards.length).toBe(52);
  });
  it("initializes previous player scores", () => {
    player.hand = ["Card", "Card", "Card"];
    player.handValue = 18;

    player.initializeGame();

    expect(player.hand).toStrictEqual([]);
    expect(player.handValue).toBe(0);
  });
});

describe("deal method", () => {
  let player;

  beforeAll(() => {
    player = new Player("Ben");
  });

  beforeEach(() => {
    player.initializeGame();
  });

  it("deals the first three cards, removing them from the deck", () => {
    player.deal();

    expect(player.dealer.deck.cards.length).toBe(49);
  });
  it("deals one card to dealer", () => {
    player.deal();

    expect(player.dealer.hand.length).toBe(1);
  });
  it("deals two cards to the player", () => {
    player.deal();

    expect(player.hand.length).toBe(2);
  });
  it("returns player wins message if hand value is 21 after first cards are dealt", () => {
    const dealersCard = new Card("", "", 0, false);
    const playersFirstCard = new Card("", "Ace", 11, true);
    const playersSecondCard = new Card("", "King", 10, false);

    player.dealer.deck.cards = [
      playersSecondCard,
      playersFirstCard,
      dealersCard,
    ];

    expect(player.deal()).toBe(`BLACKJACK! Ben wins!!`);
  });
});

describe("hit method", () => {
  let player;

  beforeAll(() => {
    player = new Player("Ben");
  });

  beforeEach(() => {
    player.initializeGame();
  });

  it("deals a card to the player", () => {
    player.hit();

    expect(player.hand.length).toBe(1);
  });
  it("decreases the score by 10 if the player has an ace and they exceed 21", () => {
    player.hand = [
      new Card("", "Jack", 10, false),
      new Card("", "9", 9, false),
    ];
    player.handValue = 19;
    player.dealer.deck.cards = [new Card("", "Ace", 11, true)];

    player.hit();

    expect(player.handValue).toBe(20);
  });
  it("returns a dealer wins message if hand value exceeds 21", () => {
    // hand can't contain an Ace or the score will decrease
    player.hand = [
      new Card("", "Jack", 10, false),
      new Card("", "Jack", 10, false),
      new Card("", "2", 2),
      false,
    ];
    player.handValue = 22;

    expect(player.hit()).toBe(`BUST! Dealer wins!!`);
  });
  it("doesn't return anything if hand value is < 21", () => {
    player.hand = [
      new Card("Spades", "2", 2, false),
      new Card("Clubs", "2", 2, false),
    ];
    player.handValue = 4;

    expect(player.hit()).toBe();
  });
  it("returns a player wins message if hand value equals 21", () => {
    player.hand = [
      new Card("", "Jack", 10, false),
      new Card("", "5", 5, false),
    ];
    player.handValue = 15;
    player.dealer.deck.cards = [new Card("", "6", 6, false)];

    expect(player.hit()).toBe(`BLACKJACK! Ben wins!!`);
  });
});

describe("stand method", () => {
  let player;

  beforeAll(() => {
    player = new Player("Ben");
  });

  beforeEach(() => {
    player.initializeGame();
  });

  it("dealer deals themselves a card if their hand value is less than 16", () => {
    player.dealer.handValue = 15;

    player.stand();

    expect(player.dealer.hand.length).toBe(1);
  });
  it("dealer stands if their hand value is 17 or above", () => {
    player.dealer.handValue = 17;

    player.stand();

    expect(player.dealer.hand.length).toBe(0);
  })
  it("returns dealer bust message if dealers hand value exceeds 21", () => {
    player.dealer.handValue = 15;
    player.dealer.deck.cards = [new Card("", "8", 8, false)];

    expect(player.stand()).toBe(`Dealer is BUST! Ben wins!!`);
  });
  it("returns dealer wins message if they are closer to 21", () => {
    player.handValue = 17;
    player.dealer.handValue = 15;
    player.dealer.deck.cards = [new Card("", "5", 5, false)];

    expect(player.stand()).toBe(`Dealer wins!!`);
  });
  it("returns a draw message if dealer and player have the same hand", () => {
    player.handValue = 19;
    player.dealer.handValue = 15;
    player.dealer.deck.cards = [new Card("", "4", 4, false)]

    expect(player.stand()).toBe(`It's a tie!!`);
  })
  it("returns player wins message if player is closer to 21", () => {
    player.handValue = 19;
    player.dealer.handValue = 15;
    player.dealer.deck.cards = [new Card("", "2", 2, false)];

    expect(player.stand()).toBe(`Ben wins!!`);
  });
  it("decreases dealers hand value by 10 if they have an ace and exceed 21", () => {
    player.dealer.handValue = 16;
    player.dealer.deck.cards = [new Card("", "Ace", 11, true)];

    player.stand();

    expect(player.dealer.handValue).toBe(17);
  });
});
