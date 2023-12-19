import React from "react";
import { useNavigate } from "react-router-dom";

import { BsFillChatFill, BsTrophy } from "react-icons/bs";
import { BsBack } from "react-icons/bs";
import { RiTestTubeFill } from "react-icons/ri";
import { SiSololearn } from "react-icons/si";
import { RiLightbulbFlashFill } from "react-icons/ri";

import "bulma/css/bulma.css";
import "./Styles.css";

const OptionList = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1 className="title is-3 has-text-centered">{title}</h1>
      <div className="columns is-centered">
        <div className="column is-three-quarters">
          <div className="columns is-vcentered is-centered">
            <div className="column is-narrow">
              <button
                className="button is-primary"
                onClick={() => navigate("flashcards")}
              >
                <span className="icon">
                  <RiLightbulbFlashFill />
                </span>
                <span>Flashcards</span>
              </button>
            </div>
            <div className="column is-narrow">
              <button
                className="button is-primary"
                onClick={() => navigate("learn")}
              >
                <span className="icon">
                  <SiSololearn />
                </span>
                <span>Learn</span>
              </button>
            </div>
            <div className="column is-narrow">
              <button
                className="button is-primary"
                onClick={() => navigate("learn")}
              >
                <span className="icon">
                  <RiTestTubeFill />
                </span>
                <span>Test</span>
              </button>
            </div>
            <div className="column is-narrow">
              <button
                className="button is-primary"
                onClick={() => navigate("match")}
              >
                <span className="icon">
                  <BsBack />
                </span>
                <span>Match</span>
              </button>
            </div>
            <div className="column is-narrow">
              <button
                className="button is-primary"
                onClick={() => navigate("learn")}
              >
                <span className="icon">
                  <BsFillChatFill />
                </span>
                <span>Q-Chat</span>
              </button>
            </div>
            <div className="column is-narrow">
              <button
                className="button is-primary"
                onClick={() => navigate("tierlist")}
              >
                <span className="icon">
                  <BsTrophy />
                </span>
                <span>Tierlist</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionList;
