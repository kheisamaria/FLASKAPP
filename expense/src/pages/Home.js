// import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import moment from "moment-timezone";
import UserContext from "../UserContext";
import AddBalancePopup from "../components/AddBalancePopup";

function Home() {
  const { user } = useContext(UserContext);
  const [showAddBalancePopup, setShowAddBalancePopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [numberOfTransactions, setNumberOfTransactions] = useState(0);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${user}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      // Set loading to false after fetching data, whether it was successful or not
      setLoading(false);
    }
  };

  const fetchSavingsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/savings/user/${user}`
      );
      const savingsData = response.data;
      // Calculate the sum of amounts
      const sum = savingsData.reduce(
        (acc, saving) => acc + parseFloat(saving.amount),
        0
      );
      setTotalSavings(sum);
    } catch (error) {
      console.error("Error fetching savings data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchExpensesData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/expenses/user/${user}`
        );
        const expensesData = response.data;
        const sum = expensesData.reduce(
          (acc, expense) => acc + parseFloat(expense.amount),
          0
        );
        setTotalExpenses(sum);
      } catch (error) {
        console.error("Error fetching expenses data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTransactionsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/transactions/user/${user}`
        );
        const transactionsData = response.data;
        setNumberOfTransactions(transactionsData.length);
      } catch (error) {
        console.error("Error fetching transactions data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
      fetchSavingsData();
      fetchExpensesData();
      fetchTransactionsData();
    } else {
      setLoading(false); // If there's no user, set loading to false
    }
  }, [user]);

  // create a loading component
  const Loading = () => {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  };

  const handleConfirm = async (balanceToAdd) => {
    if (balanceToAdd > totalSavings) {
      alert("Error: Balance to be added is greater than total savings.");
      // You can show an error message to the user or handle it as needed
      return;
    }
    const newBalance = parseFloat(userData.balance) + parseFloat(balanceToAdd);

    // Check if balanceToAdd is greater than totalSavings

    const now = moment().tz("Asia/Manila");
    const currentDate = now.format("YYYY-MM-DD");
    const currentTime = now.format("HH:mm:ss");
    const newSavings = {
      amount: balanceToAdd * -1.0,
      description: "Added Balance",
      category: "Withdraw",
      date: currentDate,
      time: currentTime,
      user_id: user,
    };

    try {
      // Update the balance in the database
      const updatedUserData = {
        ...userData,
        balance: newBalance.toFixed(2),
      };

      await axios.put(`http://localhost:5000/users/${user}`, updatedUserData);

      await axios
        .post(`http://localhost:5000/savings`, newSavings)
        .then(() => {
          fetchSavingsData();
        })
        .catch((error) => {
          console.log(error);
        });

      // Fetch updated user data to reflect the changes
      await fetchUserData();

      // Close the popup
      closePopup();
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };

  const closePopup = () => {
    setShowAddBalancePopup(false);
  };

  // create a main content component
  const MainContent = () => {
    return (
      <div className="bg-blue-950 h-screen w-screen">
        <NavBar />

        <div className=" h-[680px] w-full px-32 flex flex-row justify-center items-center gap-x-14 my-7">
          <div
            className="w-[550px] h-[550px] rounded-full bg-yellow-500 shadow-2xl border-6 border-blue-950 flex justify-center items-center hover:bg-yellow-400"
            onClick={() => setShowAddBalancePopup(true)}
          >
            <div className="h-full w-full flex flex-col justify-center items-center">
              <div className=" h-20 w-full flex flex-row items-center justify-center font-bold text-7xl gap-x-1">
                <span className="text-3xl">₱</span>
                {userData.balance}
              </div>
              <div>Current Balance</div>
            </div>
          </div>
          <div className=" w-3/12 h-4/5 flex flex-col items-center justify-center gap-y-6">
            <Link to="/savings" className="h-full w-full">
              <div className="bg-yellow-500 h-32 w-full rounded-2xl shadow-2xl border-6 border-blue-950 flex items-center justify-center flex-col hover:bg-yellow-400">
                <div className=" h-12 w-full flex flex-row items-center justify-center font-bold text-4xl gap-1">
                  <span className="text-2xl">₱ </span>
                  {Number(totalSavings).toFixed(2)}
                </div>
                <div className="text-sm">Total Savings</div>
              </div>
            </Link>
            <Link to="/expenses" className="h-full w-full">
              <div className="bg-yellow-500 h-32 w-full rounded-2xl shadow-2xl border-6 border-blue-950 flex items-center justify-center flex-col hover:bg-yellow-400">
                <div className=" h-12 w-full flex flex-row items-center justify-center font-bold text-4xl gap-1">
                  <span className="text-2xl">₱ </span>
                  {Number(totalExpenses).toFixed(2)}
                </div>
                <div className="text-sm">Total Expenses</div>
              </div>
            </Link>
            <Link to="/transactions" className="h-full w-full">
              <div className="bg-yellow-500 h-32 w-full rounded-2xl shadow-2xl border-6 border-blue-950 flex items-center justify-center flex-col hover:bg-yellow-400">
                <div className=" h-12 w-full flex flex-row items-center justify-center font-bold text-4xl gap-1">
                  {numberOfTransactions}
                </div>
                <div className="text-sm">Number of Transactions</div>
              </div>
            </Link>
          </div>
        </div>

        {showAddBalancePopup && (
          <AddBalancePopup
            handleConfirm={handleConfirm}
            closePopup={closePopup}
          />
        )}

        <Footer />
      </div>
    );
  };

  // use a conditional rendering to show the loading component or the main content based on the loading state
  return loading ? <Loading /> : <MainContent />;
}

export default Home;
