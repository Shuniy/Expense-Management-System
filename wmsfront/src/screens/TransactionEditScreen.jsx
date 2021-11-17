import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button } from "react-bootstrap";
import {
  listTransactionDetails,
  updateTransaction,
} from "../actions/transactionActions";
import { TRANSACTION_UPDATE_RESET } from "../constants/transactionConstants";

function TransactionEditScreen(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const params = useParams();
  const transactionId = params.id;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [note, setNote] = useState("");

  const transactionDetails = useSelector((state) => state.transactionDetails);
  const { error, loading, transaction } = transactionDetails;

  const userDetails = useSelector((state) => state.userDetails.user);
  const { userId } = userDetails;

  const transactionUpdate = useSelector((state) => state.transactionUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = transactionUpdate;

  useEffect(() => {
    if (!userId) {
      navigate(`/`);
    }

    if (successUpdate) {
      dispatch({ type: TRANSACTION_UPDATE_RESET });
      navigate(`/`);
    } else {
      if (!transaction || transaction.transactionId !== Number(transactionId)) {
        dispatch(listTransactionDetails(transactionId, userId));
      } else {
        setTitle(transaction.title);
        setAmount(transaction.amount);
        setNote(transaction.note);
      }
    }
  }, [dispatch, successUpdate, navigate, transaction, transactionId, userId]);

  const submitHandler = (event) => {
    event.preventDefault();
    // update product
    dispatch(
      updateTransaction(
        {
          title: title,
          note: note,
          amount: amount.toString(),
        },
        transaction.transactionId,
        userId
      )
    );
  };

  const handleChange = (event) => {
    event.preventDefault();
    setTitle(event.target.value)
  }

  return (
    <div className="my-3">
      <Link className="btn btn-primary" to={`/`}>
        Go Back
      </Link>
      {loadingUpdate && <Loader />}
      {errorUpdate && (
        <Message className="my-3" variant="danger">
          {errorUpdate}!, Try Logging In Again !!!
        </Message>
      )}
      <FormContainer>
        <h1>Transaction Details</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error}! Try Reloading, If error persist, LOGIN AGAIN !!!
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-3" controlId="title">
              <Form.Label>Transaction Title</Form.Label>
              <Form.Select
                value={title}
                placeholder="Select a type"
                onChange={handleChange}
              >
                <option value="Rent">Rent</option>
                <option value="Transportation">Transportation</option>
                <option value="Groceries">Groceries</option>
                <option value="Home and Utilities">Home and Utilities</option>
                <option value="Insurance">Insurance</option>
                <option value="Bills and Emails">Bills and Emails</option>
                <option value="Education">Education</option>
                <option value="Health and Personal Care">
                  Health and Personal Care
                </option>
                <option value="Shopping and Entertainment">
                  Shopping and Entertainment
                </option>
                <option value="Food and Drinking">Food and Drinking</option>
                <option value="Travel">Travel</option>
                <option value="Memberships">Memberships</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3" controlId="amount">
              <Form.Label>Transaction Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-3" controlId="note">
              <Form.Label>Transaction Note</Form.Label>
              <Form.Control
                as="textarea"
                row={5}
                placeholder="Enter Short Note on your transaction!"
                value={note}
                style={{ height: "100px" }}
                onChange={(event) => setNote(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button className="btn btn-primary" variant="primary" type="submit">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default TransactionEditScreen;
