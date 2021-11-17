import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
} from "./reducers/userReducer";
import {
  transactionCreateReducer,
  transactionDeleteReducer,
  transactionDetailsReducer,
  transactionListReducer,
  transactionUpdateReducer,
} from "./reducers/transactionReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  transactionList: transactionListReducer,
  transactionDetails: transactionDetailsReducer,
  transactionDelete: transactionDeleteReducer,
  transactionCreate: transactionCreateReducer,
  transactionUpdate: transactionUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userDetailsFromStorage = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userDetails: { user: userDetailsFromStorage },
};

const middleware = [thunk, logger];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
