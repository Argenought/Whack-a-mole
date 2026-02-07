import { useState } from "react";

export default function App() {
  const [isMole, setIsMole] = useState(false);
  return (
    <>
      <h1>Whack a Mole</h1>
      <li
        className={isMole ? "hole" : "mole"}
        onClick={() => setIsMole(!isMole)}
      ></li>
    </>
  );
}
