import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";

const EditProfile = ({user}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [emailId, setEmailId] = useState(user.emailId);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error,setError] = useState();
  const dispatch = useDispatch();
  const handleSaveProfile = async () => {
    try{
       const res = await axios.patch(BASE_URL + "/profile/edit",{
        firstName,
        lastName,
        emailId,
        age,
        gender,
        about,
        photoUrl
       },{withCredentials:true});
       console.log(res);
       dispatch(addUser(res?.data?.data));
    }
    catch(err)
    {
        setError(err?.response?.data || "Something went wrong");
    }
  }
  return (
    <>
    <div className="min-h-screen bg-gradient-to-r from-[#F28383] from-10% via-[#9D6CD2] via-30% to-[#481EDC] to-90% flex items-center justify-center">
     <div className="max-w-[960px] bg-[#00000050] text-white grid grid-cols-2 items-center p-5 rounded-2xl gap-20">
    
    {/* Left Image Side */}
    <div className="relative">
      {/* <img src="/assets/signup-background.svg" alt="" />
      <img className="absolute top-36" src="/assets/teamwork.svg" alt="" /> */}
       < UserCard user={{firstName, lastName, emailId, age, gender, about, photoUrl}}/>
    </div>

    {/* Right Form Side */}
    <div className="max-w-80 grid gap-5">
      <h1 className="text-4xl font-bold">Edit Profile</h1>

      <form className="space-y-5 text-white">
        {/* First Name */}
        <div className="grid gap-1">
          <label className="text-sm">First Name:</label>
          <input
            type="text"
            className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12 focus:bg-[#00000050] focus:outline-none focus:ring-1 focus:ring-[#2FB8FF] drop-shadow-lg"
            placeholder="First Name"
            value={firstName}
            disabled={!isEditing}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div className="grid gap-1">
          <label className="text-sm">Last Name:</label>
          <input
            type="text"
            className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12 focus:bg-[#00000050] focus:outline-none focus:ring-1 focus:ring-[#2FB8FF] drop-shadow-lg"
            placeholder="Last Name"
            value={lastName}
            disabled={!isEditing}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="grid gap-1">
          <label className="text-sm">Email:</label>
          <input
            type="email"
            className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12 focus:bg-[#00000050] focus:outline-none focus:ring-1 focus:ring-[#2FB8FF] drop-shadow-lg"
            placeholder="Email"
            value={emailId}
            disabled={true}
            onChange={(e) => setEmailId(e.target.value)}
          />
        </div>

        {/* Age */}
        <div className="grid gap-1">
          <label className="text-sm">Age:</label>
          <input
            type="number"
            className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12 focus:bg-[#00000050] focus:outline-none focus:ring-1 focus:ring-[#2FB8FF] drop-shadow-lg"
            placeholder="Age"
            value={age}
            disabled={!isEditing}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        {/* Gender */}
        <div className="grid gap-1">
          <label className="text-sm">Gender:</label>
          <select
            className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12 focus:bg-[#00000050] focus:outline-none focus:ring-1 focus:ring-[#2FB8FF] drop-shadow-lg"
            value={gender}
            disabled={!isEditing}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* About */}
        <div className="grid gap-1">
          <label className="text-sm">About:</label>
          <input
            type="text"
            className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12 focus:bg-[#00000050] focus:outline-none focus:ring-1 focus:ring-[#2FB8FF] drop-shadow-lg"
            placeholder="About"
            value={about}
            disabled={!isEditing}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        {/* Photo URL */}
        <div className="grid gap-1">
          <label className="text-sm">Photo URL:</label>
          <input
            type="text"
            className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12 focus:bg-[#00000050] focus:outline-none focus:ring-1 focus:ring-[#2FB8FF] drop-shadow-lg"
            placeholder="Photo URL"
            value={photoUrl}
            disabled={!isEditing}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="grid gap-2">
          {!isEditing ? (
            <button
              type="button"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold rounded-full w-80 py-2 text-sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              className="bg-gradient-to-r from-green-500 to-blue-500 font-semibold rounded-full w-80 py-2 text-sm"
              onClick={() => {
                setIsEditing(false);
                handleSaveProfile();
              }}
            >
              Save Changes
            </button>
          )}
        </div>
      </form>
    </div>
  </div>
    </div>
    </>
  );
};

export default EditProfile;
