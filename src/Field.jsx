import { useState } from "react";

const numberOfHoles = 9;

export default function Field() {
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
