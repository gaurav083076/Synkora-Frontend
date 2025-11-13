import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/store/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data || []));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }
  if (connections.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-10 px-4">
        <div className="text-white text-lg bg-[#00000050] backdrop-blur-md rounded-xl p-6 shadow-lg">
          No Connection Found!
        </div>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col items-center py-10 px-4 overflow-y-auto">
      <h1 className="text-4xl font-bold text-white mb-8">Connections</h1>

      <div className="max-w-[960px] w-full flex flex-col gap-6 pb-8">
        {connections.map((connection) => {
          const { _id, firstName, lastName, age, gender, photoUrl } = connection;

          return (
            <div
              key={_id}
              className="flex items-center bg-[#00000050] backdrop-blur-md text-white rounded-2xl p-5 shadow-lg gap-8"
            >
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={photoUrl || "/assets/profile-avatar.png"}
                  onError={(e) => (e.target.src = "/assets/profile-avatar.png")}
                  alt="profile"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-2 text-lg flex-grow">
                <div>{firstName} {lastName}</div>
                <div>{age}</div>
                <div>{gender}</div>
              </div>
              <Link to={`/chat/${_id}`} className="flex-shrink-0">
                <button
                  className="bg-gradient-to-r from-[#F28383] via-[#9D6CD2] to-[#481EDC] text-white font-semibold py-2 px-6 rounded-2xl shadow hover:scale-105 transition-all"
                >
                  Chat
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;