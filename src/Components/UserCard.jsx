import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/store/feedSlice";
import { useState } from "react";

const UserCard = ({ user, disableActions = false }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills = [] } = user;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleRequest = async (status, userId) => {
    if (disableActions || loading) return;
    setLoading(true);
    setError("");

    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, null, {
        withCredentials: true,
      });
      dispatch(removeFeed(userId));
    } catch (err) {
      console.error(err);
      setError(err?.response?.data || "Request failed!");
    } finally {
      setLoading(false);
    }
  };
  const fallbackImage =
    photoUrl && photoUrl.length > 5 ? photoUrl : "/assets/card-profile-avatar.png";

  return (
    <div className="card w-96 text-white bg-[#ffffff20] backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-4">
     
      <figure className="px-5 pt-5">
        <img
          src={fallbackImage}
          alt={`${firstName} ${lastName}`}
          onError={(e) => (e.target.src = "/assets/profile-avatar.png")}
          className="rounded-xl h-60 w-full object-cover"
        />
      </figure>

      <div className="card-body items-center text-center space-y-3">
        <h2 className="text-xl font-semibold text-white">
          {firstName} {lastName}
        </h2>

        {(age || gender) && (
          <p className="text-sm text-gray-200">
            {age && gender ? `${age}, ${gender}` : age || gender}
          </p>
        )}

        {about && (
          <p className="text-sm text-gray-300 max-w-[260px] leading-snug mx-auto">
            {about}
          </p>
        )}

        {skills && skills.length > 0 && (
          <>
            <div className="h-px w-16 bg-white/30 mx-auto my-2"></div>

            <div className="text-center">
              <h3 className="text-xs font-semibold text-gray-100 mb-2 uppercase tracking-wide">
                Skills
              </h3>
              <div className="flex flex-wrap justify-center gap-2 px-4">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-[#ffffff30] text-white text-xs px-4 py-1.5 rounded-full shadow-sm border border-white/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="card-actions mt-4 flex gap-3">
          <button
            disabled={disableActions || loading}
            className={`rounded-full text-white px-6 py-2 text-sm font-semibold transition ${
              disableActions
                ? "opacity-50 cursor-not-allowed bg-red-500"
                : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={() => handleRequest("ignored", _id)}
          >
            Ignore
          </button>

          <button
            disabled={disableActions || loading}
            className={`rounded-full text-white px-6 py-2 text-sm font-semibold transition ${
              disableActions
                ? "opacity-50 cursor-not-allowed bg-green-500"
                : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={() => handleRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;