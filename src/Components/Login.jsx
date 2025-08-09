import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login = () => {
    // Binding your state variables with UI components
    const [isLogin,setIsLogin] = useState(true);
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [emailId,setEmailId] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async () => {
        try
        {
        const result = await axios.post(BASE_URL+"/signin",{
            emailId,
            password
        },{withCredentials:true});
        dispatch(addUser(result.data));
        return navigate("/");
        }
        catch(err)
        {
            setError(err?.response?.data || "Something went wrong");
        }
    };
    const handleSignUp = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup",{
                firstName,
                lastName,
                emailId,
                password
            },{withCredentials:true});
            console.log(res)
            setIsLogin(true);
            setPassword("");
            setEmailId("");
        } 
        catch(err)
        {
            console.error(err);
        }
        
    }
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#F28383] from-10% via-[#9D6CD2] via-30% to-[#481EDC] to-90% flex items-center justify-center">
            <div className="max-w-[960px] bg-[#00000050] text-white grid grid-cols-2 items-center p-5 rounded-2xl gap-20">
            <div className="relative">
                <img src="/assets/signup-background.svg" alt=""/>
                <img className="absolute top-36" src="/assets/teamwork.svg" alt=""/>
            </div>
            <div className="max-w-80 grid gap-5">
                <h1 className="text-5xl font-bold">{isLogin ? "Login" : "Sign Up"}</h1>
                <form action="" className="space-y-6 text-white">
                    {!isLogin &&
                    <>
                    <div className="relative">
                        <div className="absolute top-1 left-1 bg-[#FFFFFF40] rounded-full p-2 flex items-center justify-center text-blue-300">
                             <img className="w-4 h-4" src="/assets/envelope-open-solid.svg" alt=""/>
                        </div>
                        <input className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12 focus:bg-[#00000050] focus:outline-none focus:ring-1 focus:ring-[#2FB8FF] drop-shadow-lg" 
                        type="text" 
                        value={firstName} 
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <div className="absolute top-1 left-1 bg-[#FFFFFF40] rounded-full p-2 flex items-center justify-center text-blue-300">
                             <img className="w-4 h-4" src="/assets/envelope-open-solid.svg" alt=""/>
                        </div>
                        <input className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12 focus:bg-[#00000050] focus:outline-none focus:ring-1 focus:ring-[#2FB8FF] drop-shadow-lg" 
                        type="text" 
                        value={lastName} 
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                        />
                    </div></>}
                    <div className="relative">
                        <div className="absolute top-1 left-1 bg-[#FFFFFF40] rounded-full p-2 flex items-center justify-center text-blue-300">
                             <img className="w-4 h-4" src="/assets/envelope-open-solid.svg" alt=""/>
                        </div>
                        <input className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12 focus:bg-[#00000050] focus:outline-none focus:ring-1 focus:ring-[#2FB8FF] drop-shadow-lg" 
                        type="email" 
                        value={emailId} 
                        placeholder="Email"
                        onChange={(e) => setEmailId(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <div className="absolute top-1 left-1 bg-[#FFFFFF40] rounded-full p-2 flex items-center justify-center text-blue-300">
                            <img className="w-4 h-4" src="/assets/lock-solid.svg" alt=""/>
                        </div>
                        <input className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12 focus:bg-[#00000050] focus:outline-none focus:ring-1 focus:ring-[#2FB8FF] drop-shadow-lg" 
                        type="password"
                        value={password} 
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='button' className="bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold rounded-full w-80 py-2 text-sm" 
                    onClick={isLogin ? handleLogin : handleSignUp}
                    >{isLogin ? "Sign In" : "Sign Up"}</button>
                </form>
                <p className="text-red-500">{error}</p>
                <div className="text-gray-400 border-t-1 pt-4 space-y-4">
                <p onClick={() => setIsLogin((value) => !value )}>{isLogin ? "New User ? Sign Up" : "Existing User ? Sign In"}</p>
                </div>
            </div>
            </div>
        </div>       
    );
};

export default Login;
