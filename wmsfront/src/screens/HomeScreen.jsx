import Button from "@restart/ui/esm/Button";
import React, { useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  createTransaction,
  deleteTransaction,
  listTransactions,
} from "../actions/transactionActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { TRANSACTION_CREATE_RESET } from "../constants/transactionConstants";

function HomeScreen(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const transactionList = useSelector((state) => state.transactionList);
  const { loading, error, transactions } = transactionList;

  const transactionDelete = useSelector((state) => state.transactionDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = transactionDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const transactionCreate = useSelector((state) => state.transactionCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    transaction: createdTransaction,
  } = transactionCreate;

  const deleteHandler = (transactionId) => {
    if (window.confirm("Are you sure you want to delete this transaction? ")) {
    }
    dispatch(deleteTransaction(transactionId, user.userId));
  };

  const createHandler = () => {
    dispatch(createTransaction(user.userId));
  };

  useEffect(() => {
    dispatch({ type: TRANSACTION_CREATE_RESET });

    if (!userInfo) {
      console.log("yes");
      navigate(`/login`);
    }

    if (!user) {
      console.log("yes1");
      navigate(`/login`);
    }

    if (successCreate) {
      navigate(`/transaction/${createdTransaction.transactionId}/edit/`);
    } else {
      if (user) {
        dispatch(listTransactions(user.userId));
      }
    }
  }, [
    userInfo,
    successDelete,
    successCreate,
    createdTransaction,
    navigate,
    dispatch,
    user,
  ]);

  return (
    <Container>
      <div className="my-3">
        <Row className="align-items-center">
          <Col>
            <h1>Transactions</h1>
          </Col>
          <Col className="text-end">
            <Button
              className="my-3 btn btn-primary"
              variant="primary"
              onClick={createHandler}
            >
              <i className="fas fa-plus"></i> Create Transaction
            </Button>
          </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && (
          <Message variant="danger">
            {errorDelete}! Try Logging In Again!
          </Message>
        )}
        {loadingCreate && <Loader />}
        {errorCreate && (
          <Message variant="danger">
            {errorCreate}! Try Logging In Again!
          </Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error}! Try Reloading, If error persist, LOGIN AGAIN !!!
          </Message>
        ) : (
          <div>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Title</th>
                  <th>Note</th>
                  <th>Amount</th>
                  <th>Transaction Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.transactionId}</td>
                      <td>{transaction.title}</td>
                      <td>{transaction.note}</td>
                      <td>₹{transaction.amount}</td>
                      <td>{transaction.transactionDate}</td>

                      <td>
                        <Link
                          to={`/transaction/${transaction.transactionId}/edit/`}
                        >
                          <Button variant="light" className="btn btn-sm">
                            <i className="fa fa-edit"></i>
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          className="btn btn-sm mx-3"
                          onClick={() =>
                            deleteHandler(transaction.transactionId)
                          }
                        >
                          <i className="fa fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <Container>
                    <h3>No Transactions, Try adding one !</h3>
                  </Container>
                )}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </Container>
  );
}

export default HomeScreen;
