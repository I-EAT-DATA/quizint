import "./Flashcard.css";

const Flashcard = ({ frontText, backText, image, isFlipped, setIsFlipped }) => {
  return (
    <div
      className={`flashcard ${isFlipped ? "flipped" : ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flashcard-front ${isFlipped ? "flipped" : ""}`}>
        {image && (
          <div className="flashcard-image">
            <figure className="image is-128x128">
              <img src={image} alt="If you can see this, something broke" />
            </figure>
          </div>
        )}
        <p className="subtitle is-5">{frontText}</p>
      </div>

      <div className="flashcard-back">
        <p className="subtitle is-5">{backText}</p>
      </div>
    </div>
  );
};

export default Flashcard;
