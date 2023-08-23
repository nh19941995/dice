'use strict';

function changeImg(num) {
  document.querySelector('.dice').src = `dice-${num}.png`;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chageSite(turn) {
  // Loại bỏ lớp "player--active" khỏi danh sách các lớp của phần tử
  var sectionElement = document.querySelector('.player--' + turn);
  if (sectionElement) {
    sectionElement.classList.remove('player--active');
  }
  document.querySelector(`#current--${turn}`).textContent = 0;
  turn = 1 - turn; // Chuyển lượt chơi
  document.querySelector('.player--' + turn).classList.add('player--active');
  return turn;
}

function newGame(turn) {
  document.querySelector(`#score--1`).textContent = 0;
  document.querySelector(`#score--0`).textContent = 0;

  if (turn) {
    turn = chageSite(turn);
  }
  scoreA = 0;
  scoreB = 0;
  tempScore = 0;

  var sectionElement = document.querySelector('.player--winner');
  if (sectionElement) {
    sectionElement.classList.remove('player--winner');
  }
}

let turn = 0;
let scoreA = 0;
let scoreB = 0;
let tempScore = 0;

function checkWin(score) {
  if (score >= 20) {
    return true;
  }
  return false;
}

document.querySelector('.btn--roll').addEventListener('click', function () {
  let resultRoll = getRandomNumber(1, 6);
  changeImg(resultRoll);
  console.log(resultRoll);
  if (resultRoll !== 1) {
    // khác 1
    tempScore += resultRoll;
    document.querySelector(`#current--${turn}`).textContent = tempScore;
  } else {
    // bằng 1
    document.querySelector(`#current--${turn}`).textContent = 0;
    tempScore = 0;
    turn = chageSite(turn);
  }
});

document.querySelector('.btn--new').addEventListener('click', function () {
  newGame(turn);
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (tempScore > 0) {
    if (turn === 0) {
      scoreA += tempScore;
      document.querySelector(`#score--${turn}`).textContent = scoreA;

      if (checkWin(scoreA)) {
        document
          .querySelector('.player--' + turn)
          .classList.add('player--winner');
      } else {
        turn = chageSite(turn);
      }
    } else {
      scoreB += tempScore;
      document.querySelector(`#score--${turn}`).textContent = scoreB;
      if (checkWin(scoreB)) {
        document
          .querySelector('.player--' + turn)
          .classList.add('player--winner');
      } else {
        turn = chageSite(turn);
      }
    }
    tempScore = 0;
    document.querySelector(`#current--${turn}`).textContent = tempScore;
  }
});
