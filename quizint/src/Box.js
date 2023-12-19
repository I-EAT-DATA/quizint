import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';

const Box = ({ count }) => {
  const [cards, setCards] = useState();

  const handleDrop = (dropId, dragId) => {
    console.debug(dropId, dragId);
  }

  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: (item, monitor) => {
      console.debug(`Item ${item} dropped on da box`)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  useEffect(() => {
    const newCards = [];
    for (let i = 0; i < count; i++) {
      newCards.push(
        <Card
          key={i}
          id={i}
          text={`Card ${i}`}
          left={Math.floor(Math.random() * window.innerWidth * .9)}
          top={Math.floor(Math.random() * window.innerHeight * 1)}
          onDrop={handleDrop}
        />
      );
    }
    setCards(newCards);
  }, []);
  

  return (
    <div ref={drop} className="box">
      {cards}
    </div>
  );
};

export default Box;