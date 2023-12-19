import React, { useState } from "react";

import "bulma/css/bulma.css";
import "./Styles.css";

import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";

const App = () => {
  const navigate = useNavigate();

  const [inputValue, setValue] = useState("");

  const [error, setError] = useState(null);

  const handleCloseError = () => {
    // navigate home
    navigate("/");
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let quizletId = null;

    try {
      quizletId = inputValue.match("/[0-9]{9}/")[0].slice(1, -1);
    } catch (error) {
      console.error(error);
      setError("That is not a valid Quizlet id");
      return;
    }

    navigate(`/quizint/${quizletId}`);
  };

  return (
    <div className="hero is-fullheight is-flex is-flex-direction-column is-justify-content-center">
      {error && <ErrorModal message={error} onClose={handleCloseError} />}
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">Quizlet Clone</h1>
          <form onSubmit={handleSubmit}>
            <div className="field has-addons has-addons-centered">
              <div className="control">
                <input
                  className="input is-rounded"
                  type="text"
                  placeholder="Enter quizlet set url"
                  value={inputValue}
                  onChange={(event) => setValue(event.target.value)}
                />
              </div>
              <div className="control">
                <button className="button is-primary is-rounded" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
