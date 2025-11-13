import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (!emailId || !password) {
      setError("Email and password are required");
      return;
    }
    try {
      const result = await axios.post(
        BASE_URL + "/signin",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(result.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };
  const handleSignUp = async () => {
  if (!firstName || !lastName || !emailId || !password) {
    setError("All fields are required");
    return;
  }
  try {
    const res = await axios.post(
      BASE_URL + "/signup",
      { firstName, lastName, emailId, password },
      { withCredentials: true }
    );
    dispatch(addUser(res.data.data));
    navigate("/profile");
  } catch (err) {
    const msg = err?.response?.data;
    setError(
      typeof msg === "string"
        ? msg
        : msg?.error ||
          msg?.message ||
          "Something went wrong"
    );
  }
};
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#F28383] via-[#9D6CD2] to-[#481EDC]">
      <Navbar />
      <div className="flex justify-center items-center flex-1">
        <div className="max-w-[960px] bg-[#00000050] text-white grid grid-cols-2 items-center p-5 rounded-2xl gap-20">
          <div className="relative">
            <img src="/assets/signup-background.svg" alt="" />
            <img className="absolute top-36" src="/assets/teamwork.svg" alt="" />
          </div>
          <div className="max-w-80 grid gap-5">
            <h1 className="text-5xl font-bold">{isLogin ? "Login" : "Sign Up"}</h1>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <>
                  <div className="relative">
                    <div className="absolute top-1 left-1 bg-[#FFFFFF40] rounded-full p-2">
                      <img className="w-4 h-4" src="/assets/user-icon.svg" alt="" />
                    </div>
                    <input
                      className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12"
                      type="text"
                      value={firstName}
                      placeholder="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute top-1 left-1 bg-[#FFFFFF40] rounded-full p-2">
                      <img className="w-4 h-4" src="/assets/user-icon.svg" alt="" />
                    </div>
                    <input
                      className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12"
                      type="text"
                      value={lastName}
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </>
              )}
              <div className="relative">
                <div className="absolute top-1 left-1 bg-[#FFFFFF40] rounded-full p-2">
                  <img className="w-4 h-4" src="/assets/envelope-open-solid.svg" alt="" />
                </div>
                <input
                  className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12"
                  type="email"
                  value={emailId}
                  placeholder="Email"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>
              <div className="relative">
                <div className="absolute top-1 left-1 bg-[#FFFFFF40] rounded-full p-2">
                  <img className="w-4 h-4" src="/assets/lock-solid.svg" alt="" />
                </div>
                <input
                  className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-80 py-2 text-sm font-semibold"
                onClick={isLogin ? handleLogin : handleSignUp}
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
              <hr className="border-gray-400 w-full mt-6 mb-3" />
              <div className="flex flex-col items-start gap-1">
                {isLogin && (
                  <p className="text-gray-300 cursor-pointer" onClick={handleForgotPassword}>
                    Forgot Password?
                  </p>
                )}
                <p
                  className="text-gray-300 cursor-pointer"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                  }}
                >
                  {isLogin ? "New User? Sign Up" : "Existing User? Sign In"}
                </p>
              </div>
            </form>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;