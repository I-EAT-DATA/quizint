import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import { MyContext } from "./MyContextProvider";
import { useParams, useNavigate } from "react-router-dom";

import "bulma/css/bulma.css";
import "./Styles.css";

import ErrorModal from "./ErrorModal";
import Loading from "./Loading";
import Navbar from "./Navbar";

import OptionList from "./OptionList";
import Flashcards from "./Flashcards";
import FlashcardContainer from "./FlashcardContainer";
import Learn from "./Learn";
import Match from "./Match";

import NotFound from "./NotFound";

const Quizint = () => {
  const navigate = useNavigate();

  const { cardData, setCardData } = useContext(MyContext);
  const mode = useParams().mode;
  const quizletId = useParams();

  useEffect(() => {
    const getCardData = async () => {
      axios
        .post(
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8080/api/card-data"
            : `https://${process.env.PUBLIC_URL}/api/card-data`,
          quizletId
        )
        .then((response) => {
          setCardData(response.data);
        })
        .catch((error) => {
          console.error(error);
          setError("There was an issue fetching the cards");
        });
    };

    getCardData();
  }, [quizletId]);

  const [error, setError] = useState(null);

  const handleCloseError = () => {
    // navigate home
    navigate("/");
    setError("");
  };

  return (
    <div>
      <Navbar />
      {error && <ErrorModal message={error} onClose={handleCloseError} />}
      {(() => {
        switch (mode) {
          case "flashcards":
            if (!cardData) break;
            return <FlashcardContainer cardData={cardData.slice(1)} />;
          case "learn":
            if (!cardData) break;
            return (
              <Learn cardData={cardData.slice(1)} useTermAsQuestion={false} />
            );
          case "test":
            if (!cardData) break;
            return <p>Option test is selected. Not done yet though...</p>;
          case "match":
            if (!cardData) break;
            return <Match />;
          case "q-chat":
            if (!cardData) break;
            return <p>Option q-chat is selected. Not done yet though...</p>;
          case undefined:
            return (
              <div className="is-justify-content-center">
                <div className="container">
                  {(error && (
                    <ErrorModal message={error} onClose={handleCloseError} />
                  )) ||
                    (!cardData && <Loading text="Loading..." />)}
                  {cardData && <OptionList title={cardData[0].title} />}
                  {cardData && <Flashcards cardData={cardData.slice(1)} />}
                  <div className="card-list mt-5">
                    {cardData &&
                      cardData.slice(1).map((item, index) => (
                        <div key={index} className="card">
                          <div className="card-content">
                            {item.image && (
                              <div className="card-image">
                                <figure className="image is-128x128">
                                  <img
                                    src={item.image}
                                    alt="If you can see this, something broke"
                                    className="m-1 p-3"
                                  />
                                </figure>
                              </div>
                            )}
                            <div className="content">
                              <h3>{item.term}</h3>
                              <p>{item.definition}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            );
          default:
            return <NotFound />;
        }
      })()}
    </div>
  );
};

export default Quizint;
