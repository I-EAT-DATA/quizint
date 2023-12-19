import React from "react";

import "./Styles.css";

const Loading = ({ text }) => {
  return (
    <div className="columns is-centered">
      <div className="column is-narrow">
        <div className="box">
          <div className="columns is-vcentered is-centered">
            <div className="column is-narrow">
              <span className="icon is-large">
                <i className="fas fa-spinner fa-pulse fa-3x"></i>
              </span>
            </div>
            <div className="column is-narrow is-loading">
              <p className="subtitle">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
