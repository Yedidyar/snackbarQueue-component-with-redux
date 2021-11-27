import React, { useState } from "react";
import "./App.css";
import { useAppDispatch } from "./app/hooks";
import SnackbarQueue from "./features/SnackbarQueue";
import style from "./index.module.css";
import {
  addToQueue,
  SnackbarQueueType,
} from "./store/slices/sankbarQueueSlice";

function App() {
  const [inputBox, setInputBox] = useState("insert alert value");
  const [alertType, setAlertType] = useState<SnackbarQueueType>("info");
  const dispatch = useAppDispatch();
  const SnackbarQueueOptions: SnackbarQueueType[] = [
    "info",
    "warning",
    "error",
    "success",
  ];
  return (
    <div className="App">
      <header className="App-header">
        <div className={style.container}>
          <input
            className={style.textbox}
            value={inputBox}
            onChange={(e) => setInputBox(e.target.value)}
          />
          <button
            className={style.button}
            onClick={() => {
              dispatch(addToQueue({ type: alertType, content: inputBox }));
            }}
          >
            צור התראה
          </button>
          <select
            onChange={(e) => {
              setAlertType(e.target.value as SnackbarQueueType);
            }}
          >
            {SnackbarQueueOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </header>
      <SnackbarQueue />
    </div>
  );
}

export default App;
