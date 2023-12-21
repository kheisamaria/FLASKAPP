// import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import UserContext from "../UserContext";

function Home() {
  const { user } = useContext(UserContext);

  // use a useState hook to store the loading state
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Fetch user data when the component mounts
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

    if (user) {
      fetchUserData();
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

  // create a main content component
  const MainContent = () => {
    return (
      <div className="bg-blue-950 h-screen w-screen">
        <NavBar />

        <div className=" h-[650px] w-full px-32 flex flex-row justify-center items-center gap-x-14">
          <div className="w-[550px] h-[550px] rounded-full bg-yellow-500 shadow-2xl border-6 border-blue-950 flex justify-center items-center">
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
                  <span className="text-2xl">₱</span>
                  50
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
                  235
                </div>
                <div className="text-sm">Number of Transactions</div>
              </div>
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  };

  // use a conditional rendering to show the loading component or the main content based on the loading state
  return loading ? <Loading /> : <MainContent />;
}

export default Home;
