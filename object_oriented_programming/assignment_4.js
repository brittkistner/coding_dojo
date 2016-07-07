// Card Object Constructor
var Card = function(val, suit){
  this.value = val;
  this.suit = suit;
}

// Deck Object Constructor
var DeckConstructor = function(){
// create a 52 card deck
  this.deck = [];
  this.removedCards = []

  this.makeDeck();
}

// Instantiate the 52 card deck
DeckConstructor.prototype.makeDeck = function(){
  var values = ["Ace", "King", "Queen", "Jack", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];

  for (var i = 0; i < values.length; i++){
    for(var j=0; j < suits.length; j++){
      this.deck.push(new Card(values[i],suits[j]));
    };
  };
}

// Shuffle those cards!
// Good Example on the Fisher-Yates Shuffle by Mike Bostock (D3 creator)
// https://bost.ocks.org/mike/shuffle/
DeckConstructor.prototype.shuffle = function(){
  var deck = this.deck
  var m = deck.length, t, i;

  // While there remain elements to shuffle…
  while (m) {
    console.log(m)
    // Pick a remaining element…
    // everytime we set a new i, we decrement m until m = 0
    // This way we only pick an index that is within the remaining array
    i = Math.floor(Math.random() * m--);
    console.log(m)
    // And swap it with the current element.
    t = deck[m];
    deck[m] = deck[i];
    deck[i] = t;
  }
  console.log("The deck is shuffled")
  console.log(this.deck)
  return this;
}

// Reset the deck of cards
DeckConstructor.prototype.reset = function(){
  this.deck = [];
  this.makeDeck()
}

// Deal a random card and remove from the deck
DeckConstructor.prototype.deal = function(){
  i = Math.floor(Math.random(0,this.deck.length-1));
  var removedCard = this.deck[i];
  this.removedCards.push(this.deck.splice(i,1)[0]);
  return removedCard
}

var d = new DeckConstructor();
console.log(d.deck.length) // 52
var firstCard = d.deck[0]
d.shuffle()
console.log(d.deck.length) // 52
console.log(d.deck[0].value !== firstCard.value) // true
d.deal() // returns a card object
console.log(d.deck.length) //51
d.reset()
console.log(d.deck.length) //52


// Player object Constructor
var PlayerConstructor = function(name){
  this.name = name;
  this.hand = [];
}

// Player can take a card from the deck
PlayerConstructor.prototype.play = function(deck){
  var newCard = deck.deal();
  this.hand.push(newCard);
}

// Player can discard from their hand
PlayerConstructor.prototype.discard = function(value,suit){
  console.log(value)
  console.log(suit)
  var i = 0;
  for (i in this.hand){
    if(this.hand[i].value === value && this.hand[i].suit === suit){
      this.hand.splice(i,1);
      console.log("The " + value + " of " + suit + " was discarded");
      return
    }
  }
  console.log("The " + value + " of " + suit + " is not in your hand. \
    Please discard a different card");
  return
}

var player1 = new PlayerConstructor("player1")
player1.play(d)
console.log(player1.hand.length) // 1
player1.play(d)
player1.play(d)
player1.play(d)
console.log(d.deck.length) // 48
player1Card = player1.hand[0]
player1.discard(player1Card.value,player1Card.suit)
console.log(player1.hand.length) // 3

