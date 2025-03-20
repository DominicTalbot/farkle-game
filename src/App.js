import React from 'react';
import useGameLogic from './hooks/useGameLogic';
import Dice from './components/Dice';
import ScoringRules from './components/Rules/ScoringRules';
import './styles/global.css';

const App = () => {
  const {
    dice,
    selectedDice,
    score,
    roundScore,
    potentialScore,
    goal,
    isRolling,
    isBust,
    remainingDice,
    rollDice,
    toggleSelectDice,
    scorePoints,
    scoreAndContinue,
    skipTurn,
  } = useGameLogic();

  const hasScorableSelection = potentialScore > 0;

  return (
    <div className="tavern-ui">
      <h1>Farkle Game - Medieval Tavern Edition</h1>
      <ScoringRules />
      <div className="dice-container">
        {dice.map((value, index) => (
          <Dice
            key={index}
            value={value}
            isSelected={selectedDice.includes(index)}
            isRolling={!isRolling} // Show dice only when not rolling
            onClick={() => toggleSelectDice(index)}
          />
        ))}
      </div>
      {isBust && <h2 className="bust-message">Bust! No scoring dice.</h2>}
      {isRolling ? (
        <button onClick={rollDice}>Roll Dice</button>
      ) : (
        <>
          {hasScorableSelection && (
            <>
              <button onClick={scorePoints}>Score</button>
              <button onClick={scoreAndContinue}>Score and Continue</button>
            </>
          )}
          <button onClick={skipTurn}>Skip Turn</button>
        </>
      )}
      <div className="scoreboard">
        <h2>Score: {score}</h2>
        <h3>Round Score: {roundScore}</h3>
        <h3>Potential Score: {potentialScore}</h3>
        <h3>Goal: {goal}</h3>
        <h3>Remaining Dice: {remainingDice}</h3>
      </div>
    </div>
  );
};

export default App;