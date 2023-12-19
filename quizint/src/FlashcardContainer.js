import React from "react";
import Flashcards from "./Flashcards";

import "./Flashcard.css";

const FlashcardContainer = ({ cardData }) => {
  return (
    <div className="flashcard-container">
      <div className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <h1 className="title has-text-centered">Flashcards</h1>

            <Flashcards cardData={cardData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardContainer;
