import React, { useState, useEffect } from "react";
import { renderToString } from "react-dom/server";
import reactStringReplace from "react-string-replace";
import { useNavigate } from "react-router-dom";
import stringSimilarity from "string-similarity";

import "bulma/css/bulma.css";
import "./Styles.css";

const Learn = ({ cardData, useTermAsQuestion }) => {
  const navigate = useNavigate();

  const questionBatchSize = Math.floor(cardData.length * 0.3);

  const [inputValue, setValue] = useState("");
  const [useInputBasedAnswer, setUseInputBasedAnswer] = useState(false);
  const [inputBatch, setInputBatch] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [isQuestionAnswered, setQuestionAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const [randomAnswers, setRandomAnswers] = useState(null);

  const [incorrectMCQAnswerIndices, setIncorrectMCQAnswerIndices] = useState(
    []
  );
  const [correctMCQAnswerIndices, setCorrectMCQAnswerIndices] = useState([]);

  const [incorrectInputAnswerIndices, setIncorrectInputAnswerIndices] =
    useState([]);
  const [correctInputAnswerIndices, setCorrectInputAnswerIndices] = useState(
    []
  );

  const [cardIndex, setCardIndex] = useState(0);

  const [cardMinHeight, setCardMinHeight] = useState(300);

  const [stringSimilarityValue, setStringSimilarityValue] = useState(0);

  // create questions and answers arrays on changes in cardData or term as question
  useEffect(() => {
    setQuestions(
      cardData.map((td) => (useTermAsQuestion ? td.term : td.definition))
    );
    setAnswers(
      cardData.map((td) => (useTermAsQuestion ? td.definition : td.term))
    );
  }, [cardData, useTermAsQuestion]);

  // update input or multipule choice batches and which to use on answer input or card data population
  useEffect(() => {
    // if every multipule choice is correct and every input is correct then learn is complete,
    // for now we go back but in the future we can have a summary
    if (
      correctMCQAnswerIndices.length >= cardData.length &&
      correctInputAnswerIndices.length >= cardData.length
    ) {
      console.debug("All done, going back.");
      setAllDone(true);
      setCardMinHeight(700);
    }

    // set active question and answer based on the card index
    setQuestion(questions[cardIndex]);
    setAnswer(answers[cardIndex]);
    setQuestionAnswered(false);
    setCardMinHeight(300);
    console.debug(
      `Set question to ${questions[cardIndex]} and answer to ${answers[cardIndex]}`
    );

    // if we already using an input based answer as in we go through correct MCQ and ask input
    if (!useInputBasedAnswer) {
      // ask multipule choice based questions
      setRandomAnswers(
        [
          ...answers.filter((a) => a !== answers[cardIndex]).slice(0, 3),
          answers[cardIndex],
        ].sort(() => Math.random() - 0.5)
      );
    } else {
      console.debug("Setting input batch");
      console.debug(correctMCQAnswerIndices, correctInputAnswerIndices);

      const newInputBatch = [
        ...correctMCQAnswerIndices.filter(
          (id) => !correctInputAnswerIndices.includes(id)
        ),
        ...incorrectInputAnswerIndices,
      ];
      console.debug(newInputBatch);
      setInputBatch(newInputBatch);
      setCardIndex(newInputBatch.length ? newInputBatch[0] : correctMCQAnswerIndices[0]);
    }
  }, [cardIndex, cardData]);

  const checkMCQAnswer = (event) => {
    // no clicking after!
    if (isQuestionAnswered) return;
    // update the ui
    setQuestionAnswered(true);

    // if the clicked on choice is the answer, it works so we go with it
    setIsCorrect(event.target.innerHTML === answer);

    // expand the card
    setCardMinHeight(500);
  };

  const checkInputAnswer = () => {
    // no clicking after!
    if (isQuestionAnswered) return;
    // update the ui
    setQuestionAnswered(true);

    // this is the only difference between input answer and MCQ answer but too much work to combine the two
    // if the strings are close enough set it as correct, but if it's not exact let the user know as well
    const newStringSimilarityValue = stringSimilarity.compareTwoStrings(
      inputValue,
      answer
    );
    setStringSimilarityValue(newStringSimilarityValue);
    console.debug(newStringSimilarityValue);

    setIsCorrect(inputValue.length && newStringSimilarityValue >= 0.75);

    // trying to clear the input, TODO: not sure why this doesn't work
    setValue("");

    // expand the card
    setCardMinHeight(500);
  };

  const continueLearn = () => {
    if (useInputBasedAnswer) {
      if (isCorrect) {
        console.debug("Correct.");

        // add to correct input indicies
        setCorrectInputAnswerIndices([...correctInputAnswerIndices, cardIndex]);

        if (incorrectInputAnswerIndices.indexOf(cardIndex) !== -1) {
          // remove from incorrect input indicies (if it's there)
          setIncorrectInputAnswerIndices(
            incorrectInputAnswerIndices.filter((i) => i !== cardIndex)
          );
        }
      } else {
        console.debug("Incorrect.");

        // add to incorrect input indicies
        setIncorrectInputAnswerIndices([
          ...incorrectInputAnswerIndices,
          cardIndex,
        ]);
      }
      const filteredInputBatch = inputBatch.filter((b) => b !== cardIndex);
      setInputBatch(filteredInputBatch);

      // if there are cards left in input batch, do the next else continue the MCQs
      if (filteredInputBatch.length) {
        setCardIndex(filteredInputBatch[0]);
      } else if (inputBatch.length && inputBatch[0] + 1 !== cardData.length) {
        setUseInputBasedAnswer(false);
        setCardIndex(inputBatch[0] + 1);
      } else {
        setCardIndex(0);
      }
    } else {
      if (isCorrect) {
        console.debug("Correct.");

        // add to correct MCQ indicies
        setCorrectMCQAnswerIndices([...correctMCQAnswerIndices, cardIndex]);

        if (incorrectMCQAnswerIndices.indexOf(cardIndex) !== -1) {
          // remove from incorrect MCQ indicies (if it's there)
          setIncorrectMCQAnswerIndices(
            incorrectMCQAnswerIndices.filter((i) => i !== cardIndex)
          );
        }
      } else {
        console.debug("Incorrect.");

        // add to incorrect MCQ indicies
        setIncorrectMCQAnswerIndices([...incorrectMCQAnswerIndices, cardIndex]);
      }

      /*
        check to ask input based questions
        if there are correct multipule choice and we've reached a multipule of question batch size
        or we're at the end of card data
      */
      setUseInputBasedAnswer(
        correctMCQAnswerIndices.filter(
          (id) => !correctInputAnswerIndices.includes(id)
        ).length &&
          ((cardIndex + 1) % questionBatchSize === 0 ||
            correctMCQAnswerIndices.length >= cardData.length)
      );

      /*
        if the card index is not at the end then increment the card index
        if it is at the end start asking incorrect MCQs
        then start asking incorrect input answers
      */
      if (cardIndex !== cardData.length - 1) {
        setCardIndex(cardIndex + 1);
      } else if (incorrectMCQAnswerIndices.length !== 0) {
        setCardIndex(incorrectMCQAnswerIndices[0] !== cardIndex ? incorrectMCQAnswerIndices[0] : 0);
      } else if (incorrectInputAnswerIndices.length !== 0) {
        setCardIndex(incorrectInputAnswerIndices[0]);
      } else {
        setCardIndex(0);
      }
    }
  };

  // TODO: Fix styling so that card is always the same size and buttons are always on the bottom, it is ok ig for now
  return (
    <div className="hero is-fullheight is-flex is-flex-direction-column is-justify-content-center">
      <div className="hero-body">
        <div className="container">
          <section className="section">
            <div className="card">
              <div
                className="card-content"
                style={{
                  // height: `${cardMinHeight}px`, there used to be an attempt at making the card smoothly transition between different heights based on content but it was problematic to say the least...
                  overflow: "hidden",
                  transition: "height 0.5s ease-out",
                }}
              >
                <div className="content">
                  <progress
                    className="progress is-primary"
                    value={
                      (correctMCQAnswerIndices.length / 2 +
                        correctInputAnswerIndices.length / 2) /
                      cardData.length
                    }
                    max="1"
                  >
                    {(correctMCQAnswerIndices.length / 2 +
                      correctInputAnswerIndices.length / 2) /
                      cardData.length}
                    %
                  </progress>
                  <div className="columns">
                    <div className="column is-narrow">
                      {cardIndex < cardData.length &&
                        cardData[cardIndex].image && (
                          <div className="card-image">
                            <figure className="image is-128x128">
                              <img
                                src={cardData[cardIndex].image}
                                alt="If you can see this, something broke"
                              />
                            </figure>
                          </div>
                        )}
                    </div>
                    <div className="column">
                      {allDone ? (
                        <div className="notification is-success">All done!</div>
                      ) : (
                        <p
                          className="subtitle is-3"
                          dangerouslySetInnerHTML={{
                            __html: reactStringReplace(question, "\n", () => (
                              <br />
                            ))
                              .map((element, index) => renderToString(element))
                              .join(""),
                          }}
                        />
                      )}
                      <nav className="level"></nav>
                      <footer className="card-footer is-flex-wrap-wrap">
                        {!allDone && question &&
                          (useInputBasedAnswer ? (
                            <div className="card-footer-item is-flex-wrap-wrap">
                              <input
                                className="input is-primary"
                                type="text"
                                placeholder="Type the answer"
                                onChange={(event) =>
                                  setValue(event.target.value)
                                }
                              ></input>
                              <button
                                className="button is-primary is-outlined card-footer-item has-text-centered"
                                onClick={checkInputAnswer}
                              >
                                Answer
                              </button>
                            </div>
                          ) : (
                            randomAnswers.map((item, index) => (
                              <div
                                key={index}
                                className="card-footer-item is-flex-wrap-wrap"
                              >
                                <button
                                  className={`button is-primary card-footer-item has-text-centered ${
                                    isQuestionAnswered
                                      ? item === answer
                                        ? "is-success"
                                        : "is-danger"
                                      : "is-info"
                                  }`}
                                  onClick={checkMCQAnswer}
                                >
                                  {reactStringReplace(item, "\n", () => <br />)
                                    .map((element, index) =>
                                      renderToString(element)
                                    )
                                    .join("")}
                                </button>
                              </div>
                            ))
                          ))}
                      </footer>
                    </div>
                  </div>
                  {allDone && (
                    <div>
                      <div className="card-footer-item is-flex-wrap-wrap">
                        <button
                          className="button is-primary card-footer-item has-text-centered is-info"
                          onClick={() => navigate(-1)}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  )}
                  {!allDone && isQuestionAnswered && (
                    <div>
                      <div className="card-footer-item is-flex-wrap-wrap">
                        <button
                          className="button is-primary card-footer-item has-text-centered is-info"
                          onClick={continueLearn}
                        >
                          Next
                        </button>
                      </div>
                      <br />
                      {
                        <div
                          className={`notification ${
                            isCorrect
                              ? useInputBasedAnswer
                                ? stringSimilarityValue === 1
                                  ? " is-success"
                                  : " is-warning"
                                : "is-success"
                              : "is-danger"
                          }`}
                        >
                          {isCorrect
                            ? useInputBasedAnswer
                              ? stringSimilarityValue === 1
                                ? "Correct!"
                                : "Close enough, the correctist answer is " +
                                  answer
                              : "Correct!"
                            : "Incorrect, the correct answer is " + answer}
                        </div>
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Learn;
