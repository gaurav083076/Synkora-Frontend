import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";

const EditProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    emailId: user.emailId,
    age: user.age,
    gender: user.gender || "",
    about: user.about,
    photoUrl: user.photoUrl || "/assets/card-profile-avatar.png",
    skills: user.skills || [],
  });
  const [newSkill, setNewSkill] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleAddSkill = (e) => {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault();
      const skill = newSkill.trim();
      if (!form.skills.includes(skill)) {
        setForm((prev) => ({
          ...prev,
          skills: [...prev.skills, skill],
        }));
      }
      setNewSkill("");
    }
  };
  const handleRemoveSkill = (index) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${BASE_URL}/upload`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { imageUrl } = res.data;
      setForm((prev) => ({ ...prev, photoUrl: imageUrl }));
      setSuccessMessage("Photo uploaded successfully!");
    } catch (err) {
      setError(err?.response?.data || "Photo upload failed!");
    } finally {
      setUploading(false);
    }
  };
  const handleSaveProfile = async () => {
    try {
      setError("");
      setSuccessMessage("");
      const { firstName, lastName, age, gender, about, photoUrl, skills } = form;
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="h-full w-full flex justify-center items-start py-10 px-4 overflow-y-auto">
      <div className="max-w-[960px] w-full backdrop-blur-md bg-[#00000040] text-white grid grid-cols-2 items-start p-6 rounded-2xl gap-20 shadow-xl">
        <div className="relative flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold mb-4 text-white/90">Your Card</h2>
          <UserCard user={form} disableActions={true} />
        </div>
        <div className="max-w-80 grid gap-5">
          <h1 className="text-4xl font-bold">Edit Profile</h1>
          <form className="space-y-5 text-white">
            <InputField label="First Name" value={form.firstName} disabled={!isEditing}
              onChange={(e) => handleChange("firstName", e.target.value)} />
            <InputField label="Last Name" value={form.lastName} disabled={!isEditing}
              onChange={(e) => handleChange("lastName", e.target.value)} />
            <InputField label="Email" type="email" value={form.emailId} disabled />
            <InputField label="Age" type="number" value={form.age} disabled={!isEditing}
              onChange={(e) => handleChange("age", Number(e.target.value))} />
            <div className="grid gap-1">
              <label className="text-sm">Gender:</label>
              <select
                className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12 focus:bg-[#00000050] 
                           focus:outline-none focus:ring-1 focus:ring-[#2FB8FF] drop-shadow-lg disabled:opacity-60"
                value={form.gender}
                disabled={!isEditing}
                onChange={(e) => handleChange("gender", e.target.value)}
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <InputField label="About" value={form.about} disabled={!isEditing}
              onChange={(e) => handleChange("about", e.target.value)} />

            <div className="grid gap-1">
              <label className="text-sm">Skills:</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`bg-[#FFFFFF30] px-3 py-1 rounded-full flex items-center gap-2 text-sm ${
                      !isEditing ? "opacity-60" : ""
                    }`}
                  >
                    {skill}
                    {isEditing && (
                      <button
                        type="button"
                        className="text-white hover:text-red-400 font-bold"
                        onClick={() => handleRemoveSkill(index)}
                      >
                        ✕
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {isEditing && (
                <input
                  type="text"
                  placeholder="Add a skill and press Enter"
                  className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12 focus:bg-[#00000050] 
                             focus:outline-none focus:ring-1 focus:ring-[#2FB8FF] drop-shadow-lg"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleAddSkill}
                />
              )}
            </div>

            <div className="grid gap-2">
              <label className="text-sm">Profile Photo:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={!isEditing || uploading}
                className="w-80 text-sm file:rounded-full file:border-none file:px-4 
                           file:py-2 file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer disabled:opacity-60"
              />
              {uploading && <p className="text-xs text-gray-300">Uploading...</p>}
            </div>

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
                <>
                  <button
                    type="button"
                    className="bg-gradient-to-r from-green-500 to-blue-500 font-semibold rounded-full w-80 py-2 text-sm"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    className="bg-gray-500 font-semibold rounded-full w-80 py-2 text-sm"
                    onClick={() => {
                      setForm(user);
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>

            {error && <p className="text-red-400">{error}</p>}
            {successMessage && <p className="text-green-400">{successMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

const InputField = ({ label, type = "text", value, disabled, onChange }) => (
  <div className="grid gap-1">
    <label className="text-sm">{label}:</label>
    <input
      type={type}
      value={value}
      disabled={disabled}
      onChange={onChange}
      className="w-80 bg-[#FFFFFF30] rounded-full py-2 px-12 focus:bg-[#00000050] 
                 focus:outline-none focus:ring-1 focus:ring-[#2FB8FF] drop-shadow-lg disabled:opacity-60"
    />
  </div>
);