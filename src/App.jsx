import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HeaderSection from "./components/HeaderSection ";
import TimeOptions from "./components/TimeOptions";
import PaymentSection from "./components/PaymentSection";
import PaymentProcessing from "./pages/PaymentProcessing";

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("$0.50");
  const [selectedMethod, setSelectedMethod] = useState("EVC Plus");

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const selectTime = (amount) => setSelectedAmount(amount);
  const selectMethod = (method) => setSelectedMethod(method);

  return (
    <div className={`${darkMode ? "dark" : ""} transition-colors duration-500`}>
      <div className="max-w-sm mx-auto p-5 rounded-2xl shadow-2xl bg-purple-50 dark:bg-[#1e2233] text-gray-800 dark:text-white">
        <HeaderSection darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="bg-white rounded-lg dark:bg-gray-800">
          <TimeOptions
            selectedAmount={selectedAmount}
            selectTime={selectTime}
          />
          <PaymentSection
            selectedAmount={selectedAmount}
            selectedMethod={selectedMethod}
            selectMethod={selectMethod}
            darkMode={darkMode}
          />
        </div>
        <footer className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Call us any feedback or problem{" "}
          <span className="font-semibold text-gray-800 dark:text-white">
            616586503 / 616251068
          </span>
        </footer>
      </div>
    </div>
  );
};

const WiFiPayment = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/payment-processing" element={<PaymentProcessing />} />
    </Routes>
  );
};

export default WiFiPayment;
