import axios from "axios";
import moment from "moment-timezone";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import DeletePopUp from "../components/DeletePopUp";
import ErrorPopup from "../components/ErrorPopup";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ShowPopup from "../components/ShowPopupTransactions";
import UpdatePopupTransactions from "../components/UpdatePopupTransactions";

function Transactions() {
  const { user } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const [toBeDeleted, setToBeDeleted] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const closePopup = () => {
    setTransactionData(formData);

    if (showErrorPopup === true) {
      setShowErrorPopup(false);
      return;
    }

    if (showDeletePopup === true) {
      setShowDeletePopup(false);
      return;
    }

    setShowPopup(false);
    setShowUpdatePopup(false);
  };

  const formData = {
    amount: 0,
    description: "",
    payment_method: "",
    date: "",
    time: "",
    user_id: user,
  };

  const [transactionData, setTransactionData] = useState(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData({ ...transactionData, [name]: value });
  };

  const handleSave = () => {
    if (
      transactionData.description === "" ||
      transactionData.payment_method === ""
    ) {
      setShowErrorPopup(true);
      return;
    }

    // Get the current date and time in Philippine Standard Time
    const now = moment().tz("Asia/Manila");
    const currentDate = now.format("YYYY-MM-DD");
    const currentTime = now.format("HH:mm:ss");

    const newData = {
      ...transactionData,
      date: currentDate,
      time: currentTime,
    };

    axios
      .post(`http://localhost:5000/transactions`, newData)
      .then(() => {
        fetchTransactions();
      })
      .catch((error) => {
        console.log(error);
      });

    setTransactionData(formData);
    closePopup();
  };

  // Read Transaction data
  const fetchTransactions = () => {
    axios
      .get(`http://localhost:5000/transactions/user/${user}`)
      .then((response) => {
        const transactionData = response.data.map((transaction) => {
          // Convert the date string to a Date object
          let dateObj = new Date(transaction.date);
          // Get the year, month, and day
          let year = dateObj.getFullYear();
          let month = dateObj.getMonth() + 1; // getMonth() is zero-based
          let day = dateObj.getDate();
          // Format the date
          let formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
            day < 10 ? "0" : ""
          }${day}`;

          return {
            ...transaction,
            amount: parseFloat(transaction.amount),
            date: formattedDate, // Use the formatted date
          };
        });

        const sum = transactionData.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        );
        setTotalAmount(sum);
        setTransactions(transactionData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Update Transaction data
  const handleUpdate = (transaction) => {
    setUpdateData({
      amount: transaction.amount,
      description: transaction.description,
      payment_method: transaction.payment_method,
      user_id: transaction.user_id,
      transaction_id: transaction.transaction_id,
      date: transaction.date,
      time: transaction.time,
    });
    setShowUpdatePopup(true);
  };

  const handleUpdateTransaction = (updatedTransactionData) => {
    axios
      .put(
        `http://localhost:5000/transactions/${updatedTransactionData.transaction_id}`,
        {
          ...updatedTransactionData,
        }
      )
      .then(() => {
        fetchTransactions();
      })
      .catch((error) => {
        console.log(error);
      });
    closePopup();
  };

  // Delete Transaction data
  const deleteHandling = (transaction) => {
    setToBeDeleted(transaction);
    setShowDeletePopup(true);
  };

  const handleDelete = (transaction) => {
    axios
      .delete(
        `http://localhost:5000/transactions/${toBeDeleted.transaction_id}`
      )
      .then(() => {
        fetchTransactions();
      })
      .catch((error) => {
        console.log(error);
      });
    closePopup();
  };

  return (
    <div className="bg-blue-950 h-screen w-screen">
      <div className="w-full h-full">
        <NavBar />
        <Header
          title="Transactions"
          subtitle="Money Spent"
          description="Record financial exchanges effortlessly, tracking amounts, dates, and involved parties. 
					Gain clarity on your financial history for better insights and organization."
        />
        <div className="px-32 mt-10">
          <div className="h-16 w-full mt-5 flex flex-row justify-between items-end">
            {/* Dynamic Total Transaction */}
            <div className="h-full w-fit flex flex-col items-start justify-end text-yellow-500 font-bold text-3xl">
              <div className="text-xs font-normal">Money Spent</div>
              <div>Php {Number(totalAmount).toFixed(2)}</div>
            </div>

            {/* Add Transaction */}
            <div className="h-full flex items-end">
              <button
                className="bg-yellow-500 h-10 w-44 rounded-3xl border-1 border-black font-bold hover:bg-white"
                onClick={() => setShowPopup(true)}
              >
                Add Transaction
              </button>
            </div>
          </div>

          <div className="mt-2 h-[500px] overflow-auto">
            <table className="mx-auto my-auto table-container">
              <thead className="h-10 table-header">
                <tr>
                  <th style={{ width: "5%" }}>#</th>
                  <th style={{ width: "20%" }}>Amount</th>
                  <th style={{ width: "25%" }}>Description</th>
                  <th style={{ width: "10%" }}>Date</th>
                  <th style={{ width: "10%" }}>Time</th>
                  <th style={{ width: "20%" }}>Payment Method</th>
                  <th style={{ width: "5%" }}>Edit</th>
                  <th style={{ width: "5%" }}>Delete</th>
                </tr>
              </thead>
              <tbody className="h-10 table-body">
                {transactions.map((transaction, index) => (
                  <tr key={transaction.transaction_id}>
                    <td>
                      <div className="flex items-center justify-center">
                        {index + 1}
                      </div>
                    </td>
                    <td>Php {Number(transaction.amount).toFixed(2)}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.time}</td>
                    <td>{transaction.payment_method}</td>
                    <td>
                      <div className="flex items-center justify-center">
                        <img
                          src="/images/edit.png"
                          alt="edit"
                          className="w-7 h-7 grayscale hover:grayscale-0"
                          onClick={() => handleUpdate(transaction)}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <img
                          src="/images/delete.png"
                          alt="delete"
                          className="w-7 h-7 grayscale hover:grayscale-0"
                          onClick={() => {
                            deleteHandling(transaction);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>

      {/* Create Pop-up */}
      {showPopup && (
        <ShowPopup
          title="Add Transaction"
          transactionData={transactionData}
          handleChange={handleChange}
          closePopup={closePopup}
          handleSave={handleSave}
        />
      )}

      {/* Update Pop Up */}
      {showUpdatePopup && (
        <UpdatePopupTransactions
          transactionData={updateData}
          closePopup={closePopup}
          handleUpdateTransaction={handleUpdateTransaction}
        />
      )}

      {/* Delete Pop Up */}
      {showDeletePopup && (
        <DeletePopUp
          title="transaction"
          handleDelete={handleDelete}
          closePopup={() => setShowDeletePopup(false)}
          row={toBeDeleted}
        />
      )}

      {/* Error Pop Up */}
      {showErrorPopup && <ErrorPopup setShowErrorPopup={setShowErrorPopup} />}
    </div>
  );
}

export default Transactions;
