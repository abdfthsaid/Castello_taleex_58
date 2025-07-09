import axios from "axios";
import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import ProcessingModal from "./ProcessingModal";

const PaymentSection = ({ selectedAmount, selectedMethod, selectMethod }) => {
  const [showProcessing, setShowProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState("processing");
  const [phone, setPhone] = useState("");
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [errors, setErrors] = useState({});

  const handlePayment = async () => {
    const number = phone;
    const amount = parseFloat(selectedAmount.replace("$", ""));

    try {
      const res = await axios.post("https://phasebackend-m7nn.onrender.com/api/pay/58", {
        phoneNumber: number,
        amount: amount,
      });

      console.log("Payment response:", res.data);
      setProcessingStatus("success");

      setTimeout(() => {
        setPhone("");
        setAgree1(false);
        setAgree2(false);
        setErrors({});
        selectMethod(null);
        setShowProcessing(false);
        setProcessingStatus("processing");
      }, 3000);
    } catch (err) {
      console.error("Payment failed:", err.response?.data || err.message);
      setProcessingStatus("error");

      setTimeout(() => {
        setShowProcessing(false);
        setProcessingStatus("processing");
      }, 3000);
    }
  };

  const isActiveMethod = (method) => selectedMethod === method;

  const validate = () => {
    const newErrors = {};
    if (!phone || phone.length < 7) {
      newErrors.phone = "Fadlan gali number sax ah (ugu yaraan 7 digit)";
    }
    if (!agree1) {
      newErrors.agree1 = "Fadlan ogolow shuruudaha koowaad";
    }
    if (!agree2) {
      newErrors.agree2 = "Fadlan ogolow shuruudaha labaad";
    }
    return newErrors;
  };

  const getplaceholders_Input = () => {
    if (selectedMethod === "EVC Plus") {
      return "61 xxxxx";
    } else if (selectedMethod === "ZAAD") {
      return "63 xxxxx";
    } else if (selectedMethod === "SAHAL") {
      return "37 xxxxx";
    } else {
      return "Telefoon Numberka"; // default placeholder if none selected
    }
  };

  // console.log("Selected Method:", selectedMethod);
  const handlePay = () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setShowProcessing(true);
      setProcessingStatus("processing");
      handlePayment();
    }
  };

  return (
    <>
      {showProcessing && (
        <ProcessingModal
          status={processingStatus}
          onClose={() => setShowProcessing(false)}
        />
      )}

      {/* Amount to Pay */}
      <div className="py-4 mt-6 ml-3 mr-3 text-center bg-purple-200 shadow rounded-xl dark:bg-purple-800">
        <p className="text-lg font-semibold text-purple-800 dark:text-purple-200">
          Amount to Pay:
        </p>
        <p className="text-3xl font-extrabold text-purple-900 dark:text-white">
          {selectedAmount}
        </p>
      </div>

      {/* Payment Method */}
      <div className="mt-6 ml-3 mr-3">
        <p className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Habka Lacag Bixinta
        </p>
        <div className="grid grid-cols-4 gap-2 text-xs font-medium text-center">
          {["EVC Plus", "ZAAD", "SAHAL"].map((method) => (
            <button
              key={method}
              onClick={() => selectMethod(method)}
              className={`px-2 py-1 rounded-full shadow-sm border ${
                isActiveMethod(method)
                  ? "bg-pink-100 text-pink-800 border-pink-400 active-method dark:bg-pink-700 dark:text-pink-200 dark:border-pink-600"
                  : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300 border-transparent"
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      {/* Phone Number Input */}
      <div className="mt-5 ml-3 mr-3">
        <label className="block mb-1 ml-3 mr-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Telefonn Numberka
        </label>
        <div
          className={`flex items-center ml-3 mr-3 overflow-hidden border rounded-xl shadow-sm focus-within:ring-2 ring-pink-100 ${
            errors.phone
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-700 dark:focus-within:ring-pink-300"
          }`}
        >
          <span className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
            <img
              src="https://flagcdn.com/w40/so.png"
              alt="SO"
              className="w-5 h-3.5 rounded-sm"
            />
            +252
          </span>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-transparent outline-none dark:text-white"
            placeholder={getplaceholders_Input()}
          />
        </div>
        {errors.phone && (
          <p className="ml-3 mt-1 text-xs text-red-500">{errors.phone}</p>
        )}
        <label className="flex items-center mt-3 ml-3 mr-3 text-xs text-gray-600 dark:text-gray-400">
          Fadlan Gali Numberka lacagta la Dirayo
        </label>
      </div>

      {/* Checkboxes */}
      <div className="flex items-start mt-5 ml-3 mr-3 space-x-2">
        <input
          type="checkbox"
          checked={agree1}
          onChange={(e) => setAgree1(e.target.checked)}
          className="w-4 h-4 mt-1"
        />
        <div className="flex flex-col">
          <span className="text-gray-600 text-shadow-xs dark:text-gray-300">
            Ogolow
          </span>
          <span className="text-xs font-bold text-pink-500 underline cursor-pointer">
            shuruudaha iyo xeerarka isticmaalka Danab
          </span>
          {errors.agree1 && (
            <p className="text-xs text-red-500">{errors.agree1}</p>
          )}
        </div>
      </div>

      <div className="flex items-start mt-5 ml-3 mr-3 space-x-2">
        <input
          type="checkbox"
          checked={agree2}
          onChange={(e) => setAgree2(e.target.checked)}
          className="w-4 h-4 mt-0.5"
        />
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
          Qofkale shuruudaha iyo xeerarka isticmaala Danab
          {errors.agree2 && (
            <p className="text-xs text-red-500 mt-1">{errors.agree2}</p>
          )}
        </span>
      </div>

      {/* Pay Button */}
      <div className="ml-3 mr-3">
        <button
          onClick={handlePay}
          className="flex items-center justify-center w-full gap-2 py-3 mt-5 text-lg font-bold text-white transition shadow-lg bg-gradient-to-r from-pink-500 to-indigo-500 rounded-xl hover:scale-105"
        >
          Bixi Hadda
          <FaLongArrowAltRight className="w-6 h-6" />
        </button>
      </div>
    </>
  );
};

export default PaymentSection;
// This code is a React component for a payment section in a web application. It allows users
