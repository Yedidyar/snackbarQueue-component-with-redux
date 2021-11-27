import React, { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import {
  createDelay,
  filterFromQueue,
  SnackBar,
} from "../../../store/slices/sankbarQueueSlice";
import style from "./index.module.css";
import { ReactComponent as CloseIcon } from "./close-icon.svg";
interface Props {
  snackbar: SnackBar;
}
const Snackbar: React.FC<Props> = ({ snackbar }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      createDelay({
        key: snackbar.key,
      })
    );
  }, [dispatch, snackbar]);
  let styleType;
  switch (snackbar.type) {
    case "success":
      styleType = style.success;
      break;
    case "info":
      styleType = style.info;
      break;
    case "warning":
      styleType = style.warning;
      break;
    case "error":
      styleType = style.error;
      break;
    default:
      break;
  }

  return (
    <div className={`${style.alert} ${styleType}`}>
      <span>{snackbar.content}</span>
      <div
        className={style.closeIcon}
        onClick={() => {
          dispatch(filterFromQueue(snackbar.key));
        }}
      >
        <CloseIcon />
      </div>
    </div>
  );
};

export default Snackbar;
