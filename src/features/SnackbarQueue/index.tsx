import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useAppSelector } from "../../app/hooks";
import style from "./index.module.css";
import Snackbar from "./Snackbar";

const SnackbarQueue = () => {
  const currentSnackbarQueue = useAppSelector(
    (state) => state.snackbarQueue.sankbarQueue
  );
  return (
    <div>
      <TransitionGroup className={style.container}>
        {currentSnackbarQueue.map((snackbar) => (
          <CSSTransition
            key={snackbar.key}
            timeout={{
              enter: 0,
              exit: 500,
            }}
            classNames={{
              enterActive: style.itemEnterActive,
              enterDone: style.itemEnterDone,
              exit: style.itemExit,
              exitActive: style.itemExitActive,
            }}
          >
            <div>
              <Snackbar key={snackbar.key} snackbar={snackbar} />
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default SnackbarQueue;
