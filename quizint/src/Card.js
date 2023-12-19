import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  CARD: 'CARD'
};

const Card = ({ id, text, left, top, onDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { type: ItemTypes.CARD, id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => onDrop(item.id, id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const style = {
    position: 'absolute',
    left: left,
    top: top,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div className="match-card" style={style}>
      <div ref={drop}>
        <div ref={drag}>
          <p className="subtitle is-5">{text}</p>
        </div>
      </div>  
    </div>
    
  );
};

export default Card;