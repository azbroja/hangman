import React, { useState } from "react";
import "./App.css";

const solution = "apple is good";
const wordsToSend = solution.split("").map((letter) => {
  return { [letter]: false };
});

const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "y",
  "x",
  "y",
  "z",
];

let alphabet = [..."abcdefghijklmnopqrstuvyxyz"].reduce(
  (alphabet, letter) => ({ ...alphabet, [letter]: false }),
  {}
);

console.log(alphabet);

function LettersList(props) {
  const letters = props.letters;

  const listItems = letters.map((letter) => (
    <div
      className="letter-box"
      key={letter}
      onClick={() => {
        props.sendLetter(letter);
      }}
    >
      {letter}
    </div>
  ));
  return <div className="letters-list">{listItems}</div>;
}

function App() {
  let [gameCount, setGameCount] = useState(0);
  let [chosenLetter, setChosenLetter] = useState("_");
  let [objectOfWords, setObjectOfWords] = useState(wordsToSend);

  let lettersOfWord = [];

  const sendLetter = (data) => {
    setChosenLetter(data);
    console.log(data);
    alphabet[data] = true;
    // let objectOfWordsSend = objectOfWords.map(({ letter, isVisible }) => {
    //   if (isVisible) {
    //     return { letter: letter, isVisible: true };
    //   }
    //   if (data === letter) {
    //     return { letter: letter, isVisible: true };
    //   }
    //   setGameCount(gameCount + 1);
    //   return { letter: letter, isVisible: false };
    // });
    // setObjectOfWords(objectOfWordsSend);
  };

  console.log(alphabet);
  lettersOfWord = objectOfWords.map(({ letter, isVisible }) => {
    return <div>{isVisible ? letter : "_"}</div>;
  });

  return (
    <div className="app">
      <div className="letters-list">
        <LettersList letters={letters} sendLetter={sendLetter} />
      </div>
      <div className="chosen-letter">{chosenLetter}</div>
      <div className="puzzle-word"> {lettersOfWord}</div>
      <div className="score">{gameCount}</div>
    </div>
  );
}

export default App;
