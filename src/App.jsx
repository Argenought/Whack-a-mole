import { useGame } from "./GameContext";

import Field from "./Field";
import Welcome from "./Welcome";
import Scoreboard from "./Scoreboard";

export default function App() {
  const { playing } = useGame();
  return (
    <>
      <h1>Whack a Mole</h1>
      {playing ? (
        <>
          <Scoreboard />
          <Field />
        </>
      ) : (
        <Welcome />
      )}
    </>
  );
}
