import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/store/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const reviewRequest = async (status, id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(id));
    } catch (err) {
      console.error(err);
    }
  };
  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/request/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data || []));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-4">
        <div className="text-white text-lg backdrop-blur-md bg-[#00000040] rounded-xl p-6 shadow-lg">
          No Requests Found!
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center py-10 px-4 overflow-y-auto">

      <h1 className="text-4xl font-bold text-white mb-8">Requests</h1>

      <div className="max-w-[960px] w-full flex flex-col gap-6 pb-8">
        {requests.map((request) => {
          const user = request.fromUserId || {};
          const { firstName, lastName, age, gender, photoUrl } = user;

          return (
            <div
              key={request._id}
              className="flex items-center backdrop-blur-md bg-[#00000040] text-white rounded-2xl p-5 shadow-lg gap-8"
            >

              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={photoUrl || "/assets/profile-avatar.png"}
                  alt="profile"
                  onError={(e) => (e.target.src = "/assets/profile-avatar.png")}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-2 text-lg flex-grow">
                <div>{firstName} {lastName}</div>
                <div>{age}</div>
                <div>{gender}</div>
              </div>

              <div className="ml-auto flex gap-4 flex-shrink-0">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Requests;