import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests,removeRequests } from "../utils/store/requestsSlice";

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    const reviewRequest = async (status,_id) => {
        try
        {
          const _ = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,{},{withCredentials:true});
          dispatch(removeRequests(_id));
        }
        catch(err)
        {
            console.error(err);
        }

    }
    const fetchRequest = async () => {
        try{
        const res = await axios.get(BASE_URL + "/user/request/received",{withCredentials:true});
        dispatch(addRequests(res.data.data));
        }
        catch(err)
        {
            console.error(err);
        }
      }
        useEffect(() => {
            fetchRequest();
        },[]);
        if (!requests)
        return;
        if (requests.length === 0)
            return (
                <div className="min-h-screen bg-gradient-to-r from-[#F28383] via-[#9D6CD2] to-[#481EDC] flex flex-col items-center py-10 px-4">
                    <div className="text-white text-lg bg-[#00000050] rounded-xl p-6 shadow-lg">
                        No Requests Found!
                    </div>
                </div>
            );
        return (
            <div className="min-h-screen bg-gradient-to-r from-[#F28383] via-[#9D6CD2] to-[#481EDC] flex flex-col items-center py-10 px-4">
              
              <h1 className="text-4xl font-bold text-white mb-8">Requests</h1>
          
              <div className="max-w-[960px] w-full flex flex-col gap-6">
                {requests.map((request, index) => {
                  const { firstName, lastName, age, gender, photoUrl } = request.fromUserId;
          
                  return (
                    <div
                      key={index}
                      className="flex items-center bg-[#00000050] text-white rounded-2xl p-5 shadow-lg gap-8"
                    >
                      {/* Left: Photo */}
                      <div className="w-32 h-32">
                        <img
                          src={photoUrl || "https://via.placeholder.com/150"}
                          alt="profile"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
          
                      {/* Right: Info */}
                      <div className="flex flex-col gap-2 text-lg">
                        <div>
                         {firstName} {lastName}
                        </div>
                        <div>
                         {age}
                        </div>
                        <div>
                        {gender}
                        </div>
                      </div>
                      <div className="ml-auto flex gap-4">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition" onClick={() => reviewRequest("accepted",request._id)}>
                            Accept
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition" onClick={() => reviewRequest("rejected",request._id)}>
                            Reject
                        </button>
                    </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );

}

export default Requests;