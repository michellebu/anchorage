function Player(id) {
  this.id = id;
  this.hand = [];
  // this.nghand = {}; // card => ng-card
  // ng-card contains metadata for drawing the card
  // see deck.js
  this.won = [];
  this.roundWinnings = [];
};

Player.prototype.play = function(card) {
  for (var i = 0; i < this.hand.length; ++i) {
    if (card.value == this.hand[i].value &&
      card.suit == this.hand[i].suit) {
      this.hand.splice(i, 1);
      //this.updateAngularHand();
      return true;
    }
  }
  return false;
};

Player.prototype.winCards = function(cards) {
  this.won = this.won.concat(cards);
  this.roundWinnings = cards;
};

Player.prototype.deal = function(card) {
  this.hand.push(card);
};

// Should really happen in the game...
Player.prototype.sortHand = function() {
  this.hand.sort(function(a, b) {
    var diff = Deck.valueMap[a.value] - Deck.valueMap[b.value];
    if (diff != 0) {
      return diff;
    } else {
      return Deck.suits.indexOf(a.suit) - Deck.suits.indexOf(b.suit);
    }
  });
  //this.updateAngularHand();
}

// Updating all the cards every time is really slow...
// TODO: Make faster
// Player.prototype.updateAngularHand = function() {
//   this.nghand = []
//   for (var i = 0; i < this.hand.length; ++i)
//   {
//     var ngcard = Deck.cardToAngularCard(this.hand[i]);
//     ngcard.playerid = this.id;
//     // Probably unnecessary
//     ngcard.cardindex = i;
//     ngcard.totalcards = this.hand.length;
//     this.nghand.push(ngcard);
//   }
// }

// debug
Player.prototype.dump = function() {
  return this.hand;
}

Player.prototype.dumpForFrontend = function() {
  return this.hand.map(Deck.frontendCard);
};

Player.prototype.randomCard = function() {
  return this.hand[Math.floor(Math.random() * (this.hand.length - 1))];
};
