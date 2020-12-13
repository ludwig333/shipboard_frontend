import React, { useState } from "react";

export default function BotModal() {
  const [counter, setCounter] = useState(0);
  return {
    children: (
      <>
        <p>Counter: {counter}</p>
        <button
          className="btn-primary"
          onClick={() => setCounter((state) => state + 1)}
        >
          Increment Counter
        </button>
      </>
    ),
    title: <>The Title of The Modal</>
  };
}
