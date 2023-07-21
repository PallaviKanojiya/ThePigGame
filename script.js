'use strict';
//Selecting elements

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activeplayer, playing;

//Starting Condition
const init = function () {
  const scores = [0, 0];
  let currentScore = 0;
  let activeplayer = 0;
  let playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
init();
const switching = function () {
  activeplayer = activeplayer === 0 ? 1 : 0;
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generating a random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
      //for switching--
    } else {
      switching();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add curent score to active player
    scores[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    //check if player's score is >=100
    if (scores[activeplayer] >= 20) {
      //finish the game--
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('.player-active');
    }

    //switch to the next player--
    else {
      switching();
    }
  }
});

btnNew.addEventListener('click', init);
