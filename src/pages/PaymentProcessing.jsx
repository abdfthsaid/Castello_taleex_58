import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

const PaymentProcessing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phone, amount, paymentMethod } = location.state || {};

  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("");
  const [batteryInfo, setBatteryInfo] = useState(null);
  const [waafiMessage, setWaafiMessage] = useState("");

  useEffect(() => {
    if (!phone || !amount) {
      navigate("/");
      return;
    }

    processPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const processPayment = async () => {
    try {
      // Step 1: Checking blacklist
      setStep(1);
      setMessage("Hubinaya macluumaadka...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const blacklistCheck = await axios.get(
        `https://usersbackend-nxjy.onrender.com/api/blacklist/check/${phone}`,
        { validateStatus: () => true },
      );

      if (blacklistCheck.data?.blacklisted) {
        setStatus("failed");
        setMessage(
          "Macamiil waxa kugu maqan battery hore fadlan soo celi midkaas",
        );
        return;
      }

      // Step 2: Processing Waafi payment
      setStep(2);
      setMessage("Diraya lacagta Waafi... Fadlan sug");
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const res = await axios.post(
        "https://usersbackend-nxjy.onrender.com/api/pay/58",
        {
          phoneNumber: phone,
          amount: parseFloat(amount.replace("$", "")),
        },
        { validateStatus: () => true },
      );

      const data = res.data;

      if (res.status === 200 && data.success === true) {
        // Step 3: Success - Opening battery
        setStep(3);
        setMessage("Lacagta waa la helay! Battery-ga waa la furayaa...");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setStatus("success");
        setBatteryInfo({ battery_id: data.battery_id, slot_id: data.slot_id });
        setWaafiMessage(data.waafiMessage || "Lacag bixinta waa guulaysatay!");
        setMessage("Guul! Battery-ga waa la furay");

        // Auto redirect after 5 seconds
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else if (data.error) {
        handleError(data.error);
      } else {
        setStatus("failed");
        setMessage("Khalad dhacay, fadlan mar kale isku day");
      }
    } catch {
      setStatus("failed");
      setMessage("Network error, fadlan mar kale isku day");
    }
  };

  const handleError = (errorMsg) => {
    setStatus("failed");

    if (errorMsg.includes("No available battery")) {
      setMessage("Ma jiro baytari diyaar ah hadda, fadlan mar kale isku day");
    } else if (errorMsg.includes("already have an active rental")) {
      setMessage(
        "Waxaad hore u haysataa battery, fadlan soo celi midkaas ka hor intaadan mid kale kireysanin",
      );
    } else if (errorMsg.includes("battery is already rented")) {
      setMessage("Battery-gan waa la kireystay, fadlan mar kale isku day");
    } else if (errorMsg.includes("blocked from renting")) {
      setMessage("Waa lagaa mamnuucay kireysiga. Fadlan la xiriir taageerada.");
    } else if (errorMsg.includes("Payment not approved")) {
      setMessage("Lacag bixinta ma dhicin, fadlan hubi numberkaaga");
    } else {
      setMessage(errorMsg);
    }
  };

  const getStepColor = (stepNum) => {
    if (stepNum < step) return "bg-green-500";
    if (stepNum === step && status === "processing")
      return "bg-blue-500 animate-pulse";
    if (stepNum === step && status === "failed") return "bg-red-500";
    return "bg-gray-300";
  };

  const getStepIcon = (stepNum) => {
    if (stepNum < step) return <FaCheckCircle className="text-white" />;
    if (stepNum === step && status === "processing")
      return <FaSpinner className="text-white animate-spin" />;
    if (stepNum === step && status === "failed")
      return <FaTimesCircle className="text-white" />;
    return <span className="text-white">{stepNum}</span>;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 p-5">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Lacag Bixinta
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {paymentMethod} • {amount}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((stepNum) => (
              <React.Fragment key={stepNum}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${getStepColor(stepNum)} transition-all duration-300`}
                  >
                    {getStepIcon(stepNum)}
                  </div>
                  <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                    {stepNum === 1 && "Hubinta"}
                    {stepNum === 2 && "Lacagta"}
                    {stepNum === 3 && "Battery"}
                  </p>
                </div>
                {stepNum < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${step > stepNum ? "bg-green-500" : "bg-gray-300"}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Status Message */}
        <div className="text-center mb-6">
          {status === "processing" && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                {message}
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
                Guul!
              </h2>
              {waafiMessage && (
                <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                  ✅ {waafiMessage}
                </p>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {message}
              </p>
              {batteryInfo && (
                <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    🔓 Battery:{" "}
                    <span className="text-purple-600">
                      {batteryInfo.battery_id}
                    </span>
                  </p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    📍 Slot:{" "}
                    <span className="text-purple-600">
                      {batteryInfo.slot_id}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}

          {status === "failed" && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <FaTimesCircle className="text-5xl text-red-500 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
                Khalad!
              </h2>
              <p className="text-sm text-red-700 dark:text-red-300">
                {message}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {status === "failed" && (
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl hover:scale-105 transition-transform"
            >
              Dib u celi
            </button>
          )}

          {status === "success" && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Redirecting in 5 seconds...
            </p>
          )}

          {status === "processing" && (
            <div className="flex items-center justify-center space-x-2">
              <FaSpinner className="animate-spin text-purple-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Fadlan sug...
              </span>
            </div>
          )}
        </div>

        {/* Phone Number Display */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            Number: +252{phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;
