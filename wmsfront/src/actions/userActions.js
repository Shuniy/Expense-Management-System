import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
} from "../constants/userConstants";

import axios from "axios";
import { listTransactions } from "./transactionActions";
import { TRANSACTION_LIST_RESET } from "../constants/transactionConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login/",
      { email: email, password: password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(getUserDetails());
    
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("userDetails");
  
  dispatch({
    type: USER_LOGOUT,
  });

  dispatch({
    type: USER_DETAILS_RESET,
  });
  
  dispatch({
    type: TRANSACTION_LIST_RESET,
  });
};

export const register =
  (first_name, last_name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/register/",
        {
          firstName: first_name,
          lastName: last_name,
          email: email,
          password: password,
        },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      dispatch(getUserDetails());

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.message,
      });
    }
  };

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
    };

    const {data} = await axios.get(
      `/api/users/getClaims`,
      config
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userDetails", JSON.stringify(data));
    dispatch(listTransactions(data.userId));

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.message,
    });
  }
};
