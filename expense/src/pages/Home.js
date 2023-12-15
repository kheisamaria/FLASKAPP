// import "./App.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useUserContext } from "../UserContext.js";
import axios from "axios";

function Home() {
  const { user } = useUserContext();
  console.log(user); //delete after sa home
  const [transactions, setTransactions] = useState([]);
  const [savings, setSavings] = useState([]);

  useEffect(() => {
    fetchTransactions();
    fetchSavings();
  }, [user.user_id]);

  const fetchTransactions = async () => {
    console.log(user.user_id);
    try {
      const result = await axios.get(
        `http://localhost:5000/transactions/user/${user.user_id}`
      );
      setTransactions(result.data.length);
      console.log(transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSavings = async () => {
    console.log(user.user_id);
    try {
      const result = await axios.get(
        `http://localhost:5000/savings/user/${user.user_id}`
      );
      if (result.data.length === 0) {
        setSavings("0.00");
        console.log(savings);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-blue-950 h-screen w-screen">
      <NavBar />

      <div className=" h-[650px] w-full px-32 flex flex-row justify-center items-center gap-x-14">
        <div className="w-[550px] h-[550px] rounded-full bg-yellow-500 shadow-2xl border-6 border-blue-950 flex justify-center items-center">
          <div className="h-full w-full flex flex-col justify-center items-center">
            <div className=" h-20 w-full flex flex-row items-center justify-center font-bold text-7xl gap-x-1">
              <span className="text-3xl">₱</span>
              {user.balance}
            </div>
            <div>Current Balance</div>
          </div>
        </div>
        <div className=" w-3/12 h-4/5 flex flex-col items-center justify-center gap-y-6">
          <Link to="/savings" className="h-full w-full">
            <div className="bg-yellow-500 h-32 w-full rounded-2xl shadow-2xl border-6 border-blue-950 flex items-center justify-center flex-col hover:bg-yellow-400">
              <div className=" h-12 w-full flex flex-row items-center justify-center font-bold text-4xl gap-1">
                <span className="text-2xl">₱</span>
                {savings}
              </div>
              <div className="text-sm">Total Savings</div>
            </div>
          </Link>
          <Link to="/expenses" className="h-full w-full">
            <div className="bg-yellow-500 h-32 w-full rounded-2xl shadow-2xl border-6 border-blue-950 flex items-center justify-center flex-col hover:bg-yellow-400">
              <div className=" h-12 w-full flex flex-row items-center justify-center font-bold text-4xl gap-1">
                <span className="text-2xl">₱</span>18,000.00
              </div>
              <div className="text-sm">Total Expenses</div>
            </div>
          </Link>
          <Link to="/transactions" className="h-full w-full">
            <div className="bg-yellow-500 h-32 w-full rounded-2xl shadow-2xl border-6 border-blue-950 flex items-center justify-center flex-col hover:bg-yellow-400">
              <div className=" h-12 w-full flex flex-row items-center justify-center font-bold text-4xl gap-1">
                {transactions}
              </div>
              <div className="text-sm">Number of Transactions</div>
            </div>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
