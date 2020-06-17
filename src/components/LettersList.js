import React from "react";

function LettersList(props) {
  const letters = props.alphabet;

  const listItems = Object.entries(letters).map(([letter, used]) => (
    <div
      className="alphabet-box"
      key={letter}
      onClick={() => {
        props.revealLetter(letter);
      }}
    >
      {!used ? <button>{letter}</button> : <button disabled>{letter}</button>}
    </div>
  ));
  return <div className="letters-list">{listItems}</div>;
}

export default LettersList;
