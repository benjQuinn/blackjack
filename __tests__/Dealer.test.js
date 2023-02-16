const Dealer = require("../src/Dealer");

describe("Dealer", () => {
    let dealer;

    beforeAll(() => {
        dealer = new Dealer();
    });

    it("can be instantiated", () => {
        expect(dealer).toBeInstanceOf(Object);
    });
    it("creates a deck of 52 cards when instantiated", () => {
        expect(dealer.deck).toBeInstanceOf(Object);
        expect(dealer.deck.cards.length).toBe(52);
    });
    it("has a hand", () => {
        expect(dealer.hand).toStrictEqual([])
    });
    it("has a hand value", () => {
        expect(dealer.handValue).toBe(0);
    });
});

describe("shuffleDeck method", () => {
    let dealer;

    beforeAll(() => {
        dealer = new Dealer();
    });

    it("can shuffle the deck of cards into a random order", () => {
        const firstCard = dealer.deck.cards[0]
        const middleCard = dealer.deck.cards[26]
        const lastCard = dealer.deck.cards[52]

        dealer.shuffleDeck();

        expect(dealer.deck.cards.indexOf(firstCard)).not.toBe(0);
        expect(dealer.deck.cards.indexOf(middleCard)).not.toBe(26);
        expect(dealer.deck.cards.indexOf(lastCard)).not.toBe(52);
    });
});

