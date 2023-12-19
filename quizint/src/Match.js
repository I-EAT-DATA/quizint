import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Box from './Box';
import Card from './Card';

import "./Match.css"

const Match = () => {

  // const [{ isOver }, drop] = useDrop({
  //   accept: 'card',
  //   drop: (item, monitor) => {
  //     // Get the mouse position relative to the drop target
  //     const delta = monitor.getClientOffset();

  //     // Calculate the new position of the dropped item
  //     const left = Math.round(delta.x - monitor.getInitialClientOffset().x);
  //     const top = Math.round(delta.y - monitor.getInitialClientOffset().y);

  //     // Update the position of the dropped item
  //     item.left = left;
  //     item.top = top;
  //   },
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver(),
  //   }),
  // });

  const handleDrop = (dragId, dropId) => {
    console.log(`Item ${dragId} has been dropped on item ${dropId}`);
  };

  // const cards = [];

  // // Generate a random position for each card
  // for (let i = 0; i < 20; i++) {
  //   const xPos = Math.floor(Math.random() * 500); // Random x position between 0 and 500
  //   const yPos = Math.floor(Math.random() * 500); // Random y position between 0 and 500

  //   cards.push(
  //     <Card
  //       key={i}
  //       id={i}
  //       text={`Card ${i}`}
  //       style={{ position: 'absolute', left: xPos, top: yPos }}
  //       onDrop={handleDrop}
  //     />
  //   );
  // }

  return (
      <div>
        <DndProvider backend={HTML5Backend}>
          <Box count={10} />
        </DndProvider>
      </div>
      
  );
};

export default Match;