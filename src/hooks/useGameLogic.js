import { useState } from 'react';

const useGameLogic = () => {
  const [dice, setDice] = useState(Array(6).fill(null));
  const [selectedDice, setSelectedDice] = useState([]);
  const [score, setScore] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [potentialScore, setPotentialScore] = useState(0);
  const [isRolling, setIsRolling] = useState(true);
  const [remainingDice, setRemainingDice] = useState(6);
  const [isBust, setIsBust] = useState(false);
  const goal = 5000;

  const rollDice = () => {
    const newDice = Array(remainingDice)
      .fill(0)
      .map(() => Math.floor(Math.random() * 6) + 1);
    setDice(newDice);
    setSelectedDice([]);
    setIsRolling(false); // Hide the roll button after rolling
    setIsBust(false);
    checkForBust(newDice); // Check if the roll is a bust
  };

  const toggleSelectDice = (index) => {
    if (!isRolling) {
      let newSelectedDice;
      if (selectedDice.includes(index)) {
        newSelectedDice = selectedDice.filter((i) => i !== index);
      } else {
        newSelectedDice = [...selectedDice, index];
      }
      setSelectedDice(newSelectedDice);
      calculatePotentialScore(newSelectedDice);
    }
  };

  const calculatePotentialScore = (selectedDice) => {
    const counts = Array(7).fill(0);
    selectedDice.forEach((index) => counts[dice[index]]++);

    let potential = 0;

    // Check for special combinations
    if (selectedDice.length === 6 && counts.slice(1).every((count) => count === 1)) {
      potential += 1500;
    } else if (selectedDice.length === 6 && counts.filter((count) => count === 2).length === 3) {
      potential += 1500;
    } else {
      for (let value = 1; value <= 6; value++) {
        if (counts[value] >= 3) {
          potential += value === 1 ? 1000 : value * 100;
          counts[value] -= 3;
        }
      }
      potential += counts[1] * 100;
      potential += counts[5] * 50;
    }

    setPotentialScore(potential);
  };

  const checkForBust = (diceValues) => {
    const counts = Array(7).fill(0);
    diceValues.forEach((value) => counts[value]++);

    let canScore = false;

    // Check if any scoring combination exists
    if (counts[1] > 0 || counts[5] > 0) {
      canScore = true;
    } else {
      for (let value = 1; value <= 6; value++) {
        if (counts[value] >= 3) {
          canScore = true;
          break;
        }
      }
    }

    if (!canScore) {
      setIsBust(true);
    }
  };

  const scorePoints = () => {
    setRoundScore((prevRoundScore) => prevRoundScore + potentialScore);
    setScore((prevScore) => prevScore + potentialScore);
    const newRemainingDice = remainingDice - selectedDice.length;
    setRemainingDice(newRemainingDice);
    setDice(Array(newRemainingDice).fill(null));
    setSelectedDice([]);
    setIsRolling(true); // Show the roll button again
  };

  const scoreAndContinue = () => {
    setRoundScore((prevRoundScore) => prevRoundScore + potentialScore);
    setScore((prevScore) => prevScore + potentialScore);
    const newRemainingDice = remainingDice - selectedDice.length;
    setRemainingDice(newRemainingDice);
    setDice(Array(newRemainingDice).fill(null)); // Update dice to remaining count
    setSelectedDice([]);
    setIsRolling(true); // Show the roll button again
  };

  const skipTurn = () => {
    setRoundScore(0);
    setRemainingDice(6);
    setDice(Array(6).fill(null)); // Reset dice to 6
    setSelectedDice([]);
    setIsRolling(true); // Show the roll button again
  };

  return {
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
  };
};

export default useGameLogic;