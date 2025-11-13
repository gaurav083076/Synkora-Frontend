import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ForgotPassword = () => {
  const [emailId, setEmailId] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!emailId) {
      setStatus({ type: "error", message: "Email is required" });
      return;
    }
    setLoading(true);
    setStatus({ type: "", message: "" });
    try {
      await axios.post(
        `${BASE_URL}/forgot-password`,
        { emailId },
        { withCredentials: true }
      );
      setStatus({ type: "success", message: "Reset link sent to your email!" });
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.response?.data || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-r from-[#F28383] via-[#9D6CD2] to-[#481EDC]">
      <div className="flex-shrink-0">
        <Navbar />
      </div>
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-[960px] bg-[#00000050] text-white grid grid-cols-2 items-center p-5 rounded-2xl gap-20">
          <div className="relative">
            <img src="/assets/signup-background.svg" alt="" />
            <img className="absolute top-36" src="/assets/teamwork.svg" alt="" />
          </div>
          <div className="max-w-80 grid gap-5">
            <h1 className="text-4xl font-bold">Forgot Password</h1>
            <form
              className="space-y-6 text-white"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative">
                <div className="absolute top-1 left-1 bg-[#FFFFFF40] rounded-full p-2">
                  <img className="w-4 h-4" src="/assets/envelope-open-solid.svg" alt="" />
                </div>
                <input
                  className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12 focus:bg-[#00000050] focus:outline-none"
                  type="email"
                  value={emailId}
                  placeholder="Email"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>
              <button
                type="button"
                disabled={loading}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold rounded-full w-80 py-2 text-sm disabled:opacity-60"
                onClick={handleSend}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              <hr className="border-gray-400 w-full mt-6 mb-3" />
              <Link to="/login" className="text-gray-300 hover:text-white">
                Back to Login
              </Link>
            </form>
            {status.message && (
              <p
                className={
                  status.type === "success" ? "text-green-400" : "text-red-400"
                }
              >
                {status.message}
              </p>
            )}
          </div>
        </div>
      </main>
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
};

export default ForgotPassword;