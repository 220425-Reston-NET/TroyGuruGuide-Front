import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";
import users from "./usersReducer";
import results from "./results";
import agents from "./agents";
import alert from "./alert";

export default combineReducers({
  auth,
  token,
  users,
  results,
  agents,
  alert,
});
