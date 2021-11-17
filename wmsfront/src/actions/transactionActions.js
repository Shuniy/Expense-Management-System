import {
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_SUCCESS,
  TRANSACTION_LIST_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
  TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_DELETE_FAIL,
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_UPDATE_REQUEST,
  TRANSACTION_UPDATE_SUCCESS,
  TRANSACTION_UPDATE_FAIL,
} from "../constants/transactionConstants";

import axios from 'axios'

export const listTransactions =
  (userId) =>
  async (dispatch) => {
    try {
      dispatch({ type: TRANSACTION_LIST_REQUEST });
      const { data } = await axios.get(
        `/api/users/${userId}/transactions`
      );

      dispatch({
        type: TRANSACTION_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TRANSACTION_LIST_FAIL,
        payload:
          error.message,
      });
    }
  };

export const listTransactionDetails = (transactionId, userId) => async (dispatch) => {
  try {
    dispatch({ type: TRANSACTION_DETAILS_REQUEST });
    const { data } = await axios.get(
      `/api/users/${userId}/transactions/${transactionId}`
    );
    dispatch({
      type: TRANSACTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_DETAILS_FAIL,
      payload:
        error.message,
    });
  }
};

export const deleteTransaction = (transactionId, userId) => async (dispatch) => {
  try {
    dispatch({
      type: TRANSACTION_DELETE_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.delete(
      `/api/users/${userId}/transactions/${transactionId}/delete`,
      config
    );

    dispatch({
      type: TRANSACTION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_DELETE_FAIL,
      payload:
        error.message,
    });
  }
};

export const createTransaction = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: TRANSACTION_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/users/${userId}/transactions/add`,
      {},
      config
    );

    dispatch({
      type: TRANSACTION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_CREATE_FAIL,
      payload:
        error.message,
    });
  }
};

export const updateTransaction = (transaction, transactionId, userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRANSACTION_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/users/${userId}/transactions/${transactionId}/update/`,
      transaction,
      config
    );

    dispatch({
      type: TRANSACTION_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: TRANSACTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_UPDATE_FAIL,
      payload:
        error.message,
    });
  }
};
