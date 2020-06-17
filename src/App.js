import React, { useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import data from "./data/data.json";

import LettersList from "./components/LettersList";
import picture0 from "./data/0.png";
import picture1 from "./data/1.png";
import picture2 from "./data/2.png";
import picture3 from "./data/3.png";
import picture4 from "./data/4.png";
import picture5 from "./data/5.png";
import picture6 from "./data/6.png";
import picture7 from "./data/7.png";
import picture8 from "./data/8.png";
import picture9 from "./data/9.png";
import picture10 from "./data/9.png";

let pictures = [
  picture0,
  picture1,
  picture2,
  picture3,
  picture4,
  picture5,
  picture6,
  picture7,
  picture8,
  picture9,
  picture10,
];

let passwords = data;
var min = 0;
var max = 14;

var random = Math.floor(Math.random() * (max - min + 1) + min);
console.log(random);

let category = passwords[random].category;
let solution = passwords[random].solution;
var solutionToLowerCase = solution.toLowerCase();

let alphabet = [..."abcdefghijklmnopqrstuvwxyz"].reduce(
  (alphabet, letter) => ({ ...alphabet, [letter]: false }),
  {}
);

let hiddenPassword = [...solutionToLowerCase].reduce(
  (hiddenPassword, letter) => ({ ...hiddenPassword, [letter]: false }),
  {}
);

Object.entries(hiddenPassword).filter(([letter, used]) => {
  if (alphabet[letter] === undefined) {
    hiddenPassword[letter] = true;
  }
});

function App() {
  let [gameCount, setGameCount] = useState(1);
  let [gamePicture, setGamePicture] = useState(picture0);

  let [result, setResult] = useState("");
  let [letter, setLetter] = useState("_");

  const revealLetter = (chosenLetter) => {
    console.log(gameCount);

    setLetter(chosenLetter);
    if (!solutionToLowerCase.includes(chosenLetter)) {
      setGameCount(gameCount + 1);

      setGamePicture(pictures[gameCount]);
      console.log(gamePicture);
    }

    if (gameCount === 9) {
      setResult("lose");
      alphabet = [..."abcdefghijklmnopqrstuvwxyz"].reduce(
        (alphabet, letter) => ({ ...alphabet, [letter]: true }),
        {}
      );
    }

    alphabet[chosenLetter] = true;
    if (alphabet[chosenLetter]) {
      hiddenPassword[chosenLetter] = true;
    }

    let passed = Object.entries(hiddenPassword).every(([letter, used]) => {
      return used === true;
    });

    if (passed) {
      setResult("win");
      alphabet = [..."abcdefghijklmnopqrstuvwxyz"].reduce(
        (alphabet, letter) => ({ ...alphabet, [letter]: true }),
        {}
      );
    }
  };

  return (
    <div className="app">
      <Modal />
      <div className="letters-list">
        <LettersList alphabet={alphabet} revealLetter={revealLetter} />
      </div>
      <div className="game-category"> Category of password: {category}</div>

      <div className="puzzle-word">
        {[...solutionToLowerCase].map((letter, key) => (
          <div key={key}>
            <div className="letter-box">
              {alphabet[letter] !== false ? letter : ""}
            </div>
          </div>
        ))}
      </div>

      <div className="game-count">Number of bad attempts: {gameCount - 1}</div>
      <div className="game-result">
        {result === "win" ? <div>You win, hidden word is: {solution}</div> : ""}
        {result === "lose" ? (
          <div>You lose, hidden word is: {solution}</div>
        ) : (
          ""
        )}
      </div>
      <div>
        <img className="image" src={gamePicture} alt="Hangman"></img>
      </div>
    </div>
  );
}

export default App;
