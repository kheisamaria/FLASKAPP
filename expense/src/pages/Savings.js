import axios from "axios";
import moment from "moment-timezone";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import DeletePopUp from "../components/DeletePopUp";
import ErrorPopup from "../components/ErrorPopup";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ShowPopup from "../components/ShowPopupSavings";
import UpdatePopupSavings from "../components/UpdatePopupSavings";

function Savings() {
  const { user } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [savings, setSavings] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const [toBeDeleted, setToBeDeleted] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchSavings();
  }, [user]);

  const closePopup = () => {
    setSavingsData(formData);

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
    category: "",
    date: "",
    time: "",
    user_id: user,
  };

  const [savingsData, setSavingsData] = useState(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSavingsData({ ...savingsData, [name]: value });
  };

  const handleSave = () => {
    if (savingsData.description === "" || savingsData.category === "") {
      setShowErrorPopup(true);
      return;
    }

    // Get the current date and time in Philippine Standard Time
    const now = moment().tz("Asia/Manila");
    const currentDate = now.format("YYYY-MM-DD");
    const currentTime = now.format("HH:mm:ss");

    const newData = {
      ...savingsData,
      date: currentDate,
      time: currentTime,
    };

    console.log("Saving data to the database:", newData);

    axios
      .post(`http://localhost:5000/savings`, newData)
      .then(() => {
        fetchSavings();
      })
      .catch((error) => {
        console.log(error);
      });

    setSavingsData(formData);
    closePopup();
  };

  // Read savings data
  const fetchSavings = () => {
    axios
      .get(`http://localhost:5000/savings/user/${user}`)
      .then((response) => {
        const savingsData = response.data.map((saving) => {
          // Convert the date string to a Date object
          let dateObj = new Date(saving.date);
          // Get the year, month, and day
          let year = dateObj.getFullYear();
          let month = dateObj.getMonth() + 1; // getMonth() is zero-based
          let day = dateObj.getDate();
          // Format the date
          let formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
            day < 10 ? "0" : ""
          }${day}`;

          return {
            ...saving,
            amount: parseFloat(saving.amount),
            date: formattedDate, // Use the formatted date
          };
        });

        const sum = savingsData.reduce((acc, saving) => acc + saving.amount, 0);
        setTotalAmount(sum);
        setSavings(savingsData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Update savings data
  const handleUpdate = (saving) => {
    setUpdateData({
      amount: saving.amount,
      description: saving.description,
      category: saving.category,
      date: saving.date,
      time: saving.time,
      user_id: saving.user_id,
      savings_id: saving.savings_id,
    });
    setShowUpdatePopup(true);
  };

  const handleUpdateSavings = (updatedSavingsData) => {
    axios
      .put(`http://localhost:5000/savings/${updatedSavingsData.savings_id}`, {
        ...updatedSavingsData,
      })
      .then(() => {
        alert("Savings updated.");
        fetchSavings();
      })
      .catch((error) => {
        console.log(error);
      });
    closePopup();
  };

  // Delete savings data
  const deleteHandling = (saving) => {
    setToBeDeleted(saving);
    setShowDeletePopup(true);
  };

  const handleDelete = (saving) => {
    axios
      .delete(`http://localhost:5000/savings/${saving.savings_id}`)
      .then(() => {
        fetchSavings();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Savings deleted.");
    closePopup();
  };

  return (
    <div className="bg-blue-950 h-screen w-screen">
      <div className="w-full h-full">
        <NavBar />
        <Header
          title="Savings Tracker"
          subtitle="Money Earned"
          description="Enhance your financial insights by seamlessly adding savings,
				consolidating a real-time overview of total funds,
				encompassing both cash and assets."
        />
        <div className="px-32 mt-10">
          <div className="h-16 w-full mt-5 flex flex-row justify-between items-end">
            {/* Dynamic Total Savings */}
            <div className="h-full w-fit flex flex-col items-start justify-end text-yellow-500 font-bold text-3xl">
              <div className="text-xs font-normal">Money Earned</div>
              <div>Php {Number(totalAmount).toFixed(2)}</div>
            </div>

            <div className="h-full flex items-end">
              <button
                className="bg-yellow-500 h-10 w-40 rounded-3xl border-1 border-black font-bold hover:bg-white"
                onClick={() => setShowPopup(true)}
              >
                Add Savings
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
                  <th style={{ width: "20%" }}>Category</th>
                  <th style={{ width: "5%" }}>Edit</th>
                  <th style={{ width: "5%" }}>Delete</th>
                </tr>
              </thead>
              <tbody className="h-10 table-body">
                {savings.map(
                  (
                    saving,
                    index // map over the savings array and render each row
                  ) => (
                    <tr key={saving.savings_id}>
                      <td>
                        <div className="flex items-center justify-center">
                          {index + 1}
                        </div>
                      </td>
                      <td>{saving.amount}</td>
                      <td>{saving.description}</td>
                      <td>{saving.date}</td>
                      <td>{saving.time}</td>
                      <td>{saving.category}</td>
                      <td>
                        <div className="flex items-center justify-center">
                          <img
                            src="/images/edit.png"
                            alt="edit"
                            className="w-7 h-7 grayscale hover:grayscale-0"
                            onClick={() => handleUpdate(saving)}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center justify-center">
                          <img
                            src="/images/delete.png"
                            alt="delete"
                            className="w-7 h-7 grayscale hover:grayscale-0"
                            onClick={() => deleteHandling(saving)}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>

      {/* Pop-up */}
      {showPopup && (
        <ShowPopup
          title="Add Savings"
          savingsData={savingsData}
          handleChange={handleChange}
          closePopup={closePopup}
          handleSave={handleSave}
        />
      )}

      {/* Update Pop Up */}
      {showUpdatePopup && (
        <UpdatePopupSavings
          title="Update Savings"
          savingsData={updateData}
          handleChange={handleChange}
          closePopup={closePopup}
          handleUpdateSavings={handleUpdateSavings}
        />
      )}

      {/* Delete Pop Up */}
      {showDeletePopup && (
        <DeletePopUp
          title="savings"
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

export default Savings;
