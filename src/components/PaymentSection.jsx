import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const PaymentSection = ({ selectedAmount, selectedMethod, selectMethod }) => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [agree1, setAgree1] = useState(true);
  const [errors, setErrors] = useState({});

  const handlePayment = () => {
    // Navigate to payment processing page with payment data
    navigate("/payment-processing", {
      state: {
        phone: phone,
        amount: selectedAmount,
        paymentMethod: selectedMethod,
      },
    });
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

    return newErrors;
  };

  const getplaceholders_Input = () => {
    if (selectedMethod === "EVC Plus") return "61 xxxxx";
    if (selectedMethod === "ZAAD") return "63 xxxxx";
    if (selectedMethod === "SAHAL") return "37 xxxxx";
    return "Telefoon Numberka";
  };

  const handlePay = () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      handlePayment();
    }
  };

  return (
    <>
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
          <p className="mt-1 ml-3 text-xs text-red-500">{errors.phone}</p>
        )}
        <label className="flex items-center mt-3 ml-3 mr-3 text-xs text-gray-600 dark:text-gray-400">
          Fadlan Gali Numberka lacagta la Dirayo
        </label>
      </div>

      {/* Checkboxes */}
      <div className="mx-3 mt-5">
        <div
          onClick={() => setAgree1(!agree1)}
          className={`flex items-center gap-3 p-3 transition-all duration-200 border-2 cursor-pointer rounded-xl ${
            agree1
              ? "border-pink-400 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 dark:border-pink-500"
              : "border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-600 hover:border-pink-200 dark:hover:border-pink-700"
          } ${errors.agree1 ? "border-red-400 dark:border-red-500" : ""}`}
        >
          {/* Custom Checkbox */}
          <div
            className={`flex items-center justify-center w-6 h-6 rounded-md border-2 transition-all duration-200 flex-shrink-0 ${
              agree1
                ? "bg-gradient-to-r from-pink-500 to-purple-500 border-pink-500"
                : "border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700"
            }`}
          >
            {agree1 && (
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>

          {/* Label Content */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Waan ogolahay
            </span>
            <a
              href="/rules.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-medium text-pink-500 underline transition hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300 decoration-dotted underline-offset-2"
            >
              📜 Shuruudaha iyo xeerarka isticmaalka Danab
            </a>
          </div>
        </div>
        {errors.agree1 && (
          <p className="mt-1 ml-1 text-xs text-red-500">{errors.agree1}</p>
        )}
      </div>

      {/* <div className="flex items-start mt-5 ml-3 mr-3 space-x-2">
        <input
          type="checkbox"
          checked={agree2}
          onChange={(e) => setAgree2(e.target.checked)}
          className="w-4 h-4 mt-0.5"
        />
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
          Qofkale shuruudaha iyo xeerarka isticmaala Danab
          {errors.agree2 && (
            <p className="mt-1 text-xs text-red-500">{errors.agree2}</p>
          )}
        </span>
      </div> */}

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
