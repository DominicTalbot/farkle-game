import React, { useState } from 'react';
import './ScoringRules.css';

const ScoringRules = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="scoring-rules">
      <button onClick={() => setIsOpen(!isOpen)}>Scoring Rules</button>
      {isOpen && (
        <div className="rules-modal">
          <h3>Farkle Scoring Rules</h3>
          <ul>
            <li>Single 1 = 100 points</li>
            <li>Single 5 = 50 points</li>
            <li>Three 1s = 1,000 points</li>
            <li>Three 2s = 200 points</li>
            <li>Three 3s = 300 points</li>
            <li>Three 4s = 400 points</li>
            <li>Three 5s = 500 points</li>
            <li>Three 6s = 600 points</li>
            <li>Straight (1-2-3-4-5-6) = 1,500 points</li>
            <li>Three Pairs = 1,500 points</li>
            <li>Four of a Kind = 1,000 points</li>
            <li>Five of a Kind = 2,000 points</li>
            <li>Six of a Kind = 3,000 points</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ScoringRules;