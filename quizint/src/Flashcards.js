import React, { useEffect, useState } from "react";
import Flashcard from "./Flashcard";

import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";
import { BiShuffle } from "react-icons/bi";

import "./Flashcard.css";

const Flashcards = ({ cardData }) => {
  const [localCardData, setLocalCardData] = useState(cardData);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // stupid reload thing
  const [reload, setReload] = useState(1);

  const shuffleCardData = () => {
    setLocalCardData(localCardData.sort(() => Math.random() - 0.5));
    setReload((p) => p + 1);
  };

  useEffect(() => {
    setLocalCardData(cardData);
  }, [cardData]);

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(
      () => {
        const flashCard = document.querySelector(".flashcard");
        flashCard.classList.add("swipe-right");
        setTimeout(() => {
          setCurrentCardIndex((currentCardIndex + 1) % cardData.length);
          flashCard.classList.add("swipe-left");
          flashCard.classList.remove("swipe-right");
        }, 300);
        setTimeout(() => {
          flashCard.classList.remove("swipe-left");
        }, 600);
      },
      isFlipped ? 500 : 0
    );
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setTimeout(
      () => {
        const flashCard = document.querySelector(".flashcard");
        flashCard.classList.add("swipe-left");
        setTimeout(() => {
          setCurrentCardIndex(
            currentCardIndex === 0 ? cardData.length - 1 : currentCardIndex - 1
          );
          flashCard.classList.add("swipe-right");
          flashCard.classList.remove("swipe-left");
        }, 300);
        setTimeout(() => {
          flashCard.classList.remove("swipe-right");
        }, 600);
      },
      isFlipped ? 500 : 0
    );
  };

  return (
    <div className="flashcard-top-container">
      <div className="flashcard-container">
        <button
          className="button is-primary flashcard-button"
          onClick={handlePrevCard}
        >
          <span className="icon">
            <BiLeftArrow />
          </span>
        </button>
        {Boolean(reload) && (
          <Flashcard
            frontText={localCardData[currentCardIndex].term}
            backText={localCardData[currentCardIndex].definition}
            image={localCardData[currentCardIndex].image}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
          />
        )}
        <button
          className="button is-primary flashcard-button"
          onClick={handleNextCard}
        >
          <span className="icon">
            <BiRightArrow />
          </span>
        </button>
      </div>
      <button className="button is-primary shuffle" onClick={shuffleCardData}>
        <span className="icon">
          <BiShuffle />
        </span>
      </button>
    </div>
  );
};

export default Flashcards;
