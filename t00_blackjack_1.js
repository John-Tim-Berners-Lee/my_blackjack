// I stole the shuffling code from Google: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// The rest of the code is mine.

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function calculateValue(handi) {
    let value = 0;
    let aces = 0;
    for (var i = 0; i < handi.length; i++) {
        switch (handi[i].charAt(2)) {
            case "a":
                aces += 1;
                break;
            case "t":
                value += 10;
                break;
            case "j":
                value += 10;
                break;
            case "q":
                value += 10;
                break;
            case "k":
                value += 10;
                break;
            default:
                value += Number(handi[i].charAt(2));
                break;
        }
    }
    for (var i = 0; i < aces; i++) {
        if (value > (11 - aces)) {
            value += 1;
        } else {
            value += 11;
        }
    }
    return value;
}

const MAXMONEY = Number(prompt("What's your starting money?"));

let money = MAXMONEY;
if (money > 0) {
    while(confirm("Do you want to keep gambling? You have $" + money + ".") && money > 0) {
        let bet = Number(prompt("How much are you betting?"));

        while (bet > money) {
            bet = Number(prompt("You don't have enough money! How much are you betting?"));
        }

        let deck = ["sa", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "st", "sj", "sq", "sk", "ca", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ct", "cj", "cq", "ck", "ha", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9", "ht", "hj", "hq", "hk", "da", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "dt", "dj", "dq", "dk"];

        shuffle(deck);

        let hand = [" " + deck[0]];
        deck.shift();
        hand.unshift(" " + deck[0]);
        deck.shift();

        let handVal = calculateValue(hand);

        let dealerHand = [" " + deck[0]];
        deck.shift();
        dealerHand.unshift(" " + deck[0]);
        deck.shift();

        let dealerHandVal = calculateValue(dealerHand);

        let turnOver = false;

        while (turnOver != true) {
            if (confirm("Your hand is:" + hand + ".\nThe dealer's upcard is:" + dealerHand[0] + ".\nConfirm to hit, cancel to stand.")) {
                alert("You have chosen to hit.");
                hand.unshift(" " + deck[0]);
                deck.shift();
                handVal = calculateValue(hand);
                if (handVal > 21) {
                    alert("Bust! You picked up a" + hand[0]);
                    turnOver = true;
                }
            } else {
                turnOver = true;
            }
        }

        while (dealerHandVal < 17) {
            dealerHand.unshift(" " + deck[0]);
            deck.shift();
            dealerHandVal = calculateValue(dealerHand);
        }

        if (dealerHandVal > handVal && dealerHandVal <= 21) {
            alert("Dealer won with" + dealerHand + ".\nYou had" + hand + ".");
            money -= bet;
        } else if (dealerHandVal > 21 && handVal > 21) {
            alert("Both busted. Money back. You had" + hand + ".\nDealer had" + dealerHand);
        } else if (handVal > 21 && dealerHandVal <= 21) {
            alert("You busted with" + hand + ".\nDealer had" + dealerHand + ".");
            money -= bet;
        } else if (handVal == dealerHandVal) {
            alert("Tie, money back. You had" + hand + ".\nDealer had" + dealerHand);
        } else if (dealerHandVal > 21) {
            alert("Dealer busted with" + dealerHand + ".\nYou had" + hand + ".");
            money += bet;
        } else if (handVal > dealerHandVal) {
            alert("You won with" + hand + ".\nDealer had" + dealerHand + ".");
            money += bet;
        } else {
            alert("uhh an outcome was unaccounted for. dealer:" + dealerHand + "\nyour hand" + hand);
        }
    }
}

if (money <= 0) {
    alert("you're broke LMAO");
} else {
    alert("You have $" + money + "!");
}