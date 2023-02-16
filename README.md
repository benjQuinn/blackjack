# Blackjack

A blackjack game that can be played via REPL, made using an object orientated programming approach.

## Technologies

- JavaScript
- Jest
- Node.js

## How to play

- Clone this repo and move into repo folder

```
$ git clone git@github.com:benjQuinn/blackjack-game.git
$ cd blackjack-game
```
- Install dependencies
```
$ npm install
```
- Run node
```
$ node
```
- Require relevant modules 
```
const Card = require("./src/Card");
const Deck = require("./src/Deck");
const Dealer = require("./src/Dealer");
const Player = require("./src/Player");
const { suits, faces } = require("./src/data/cardData");
```
- Create a new player
```
const player = new Player("Ben")
```
- Initialize game
```
player.initializeGame()
```
- Deal first hand
```
player.deal()
```
- Hit or stand!
```
player.hit()
player.stand()
```
- Initialize game to restart
```
player.initializeGame();
```
## Testing

- Run tests
```
$ npm test
```