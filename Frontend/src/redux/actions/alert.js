import { v4 as uuidv4 } from "uuid";
import ACTIONS from "./index";

export const setAlert =
  (msg, alertType, timeout = 1200) =>
  (dispatch) => {
    const id = uuidv4();

    dispatch({
      type: ACTIONS.SET_ALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(
      () => dispatch({ type: ACTIONS.REMOVE_ALERT, payload: id }),
      timeout
    );
  };
