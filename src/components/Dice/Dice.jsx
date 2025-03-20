import React from 'react';
import './Dice.css';

const Dice = ({ value, isSelected, onClick, isRolling }) => {
  if (!isRolling && isSelected) {
    return null; // Hide selected dice after scoring
  }

  return (
    <div
      className={`dice ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export default Dice;