import { createContext, useContext, useEffect, useRef, useState } from "react";

/* Sets the values for time and amount of holes*/
const NUM_HOLES = 9;
const TIME_LIMIT = 15;

const GameContext = createContext();

/* Game logic for Whack-a-Mole */
export function GameProvider({ children }) {
  const [field, setField] = useState(makeField());
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const [playing, setPlaying] = useState(false);

  /* Sets the values for the timer */
  const [time, setTime] = useState(TIME_LIMIT);
  /*Does not cause re-render when it changes and persists between renders */
  const timer = useRef();

  // Stop the game when timer reaches 0
  useEffect(() => {
    if (time <= 0) stop();
  }, [time]);

  /** Whacking a mole means making a new field and increasing the score */
  const whack = () => {
    setField(makeField(field));
    setScore(score + 1);
  };

  /** Starts a new game by resetting the score and field */
  const start = () => {
    setScore(0);
    setField(makeField());
    setPlaying(true);
    /* This starts the time and keeps lowering time by 1 */
    timer.current = setInterval(() => setTime((time) => time - 1), 1000);
  };

  // Why make this a separate function instead of letting components use `setPlaying`?
  // This allows us to add more game-stopping logic in the future in this one place
  // instead of having to rewrite all the components that would have used `setPlaying`.
  // ... such as updating the high scores!

  /* The stop function goes off when time <= 0 */
  const stop = () => {
    setPlaying(false);
    /* adds the score value to the end of highScore, then sorts the values from highest to lowest and stores it into newScores*/
    const newScores = [...highScores, score].sort((a, z) => z - a);
    /* .slice(0,5) keeps the first five numbers in newScores and makes that the new hightScore with setHighScores*/
    setHighScores(newScores.slice(0, 5));
    /* Stops setInterval */
    clearInterval(timer.current);
    /* Resets the value in time */
    setTime(TIME_LIMIT);
  };
  /* Declares the values in and stores them into GameContext on line 69(Nice) */
  const value = {
    field,
    score,
    highScores,
    playing,
    time,
    whack,
    start,
    stop,
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
/* Exports the function */
export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw Error("Game context must be used within GameProvider.");
  return context;
}

/** @returns {boolean[]} false = hole, true = mole */

/* On lines above it states setField = makeField which was never defined but it's defined here I hope */
function makeField(field = Array(NUM_HOLES).fill(false)) {
  // Create an array containing the indexes of all holes
  const holes = field.reduce((holes, isMole, i) => {
    if (!isMole) holes.push(i);
    return holes;
  }, []);
  const mole = holes[Math.floor(Math.random() * holes.length)];

  const newField = Array(NUM_HOLES).fill(false);
  newField[mole] = true;
  return newField;
}
