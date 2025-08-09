import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/store/connectionSlice";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {
        const res = await axios.get(BASE_URL + "/user/connections",{withCredentials:true});
        dispatch(addConnections(res.data.data));
        }
        catch(err)
        {
            console.error(err);
        }
    }
    useEffect(() => {
        fetchConnections();
    },[]);
    if (!connections)
        return;
    if (connections.length === 0)
        return <div className="min-h-screen bg-gradient-to-r from-[#F28383] via-[#9D6CD2] to-[#481EDC] flex flex-col items-center py-10 px-4">
    <div className="text-white text-lg bg-[#00000050] rounded-xl p-6 shadow-lg">
        No Connection Found!
    </div>
</div>
    
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#F28383] via-[#9D6CD2] to-[#481EDC] flex flex-col items-center py-10 px-4">
          
          <h1 className="text-4xl font-bold text-white mb-8">Connections</h1>
      
          <div className="max-w-[960px] w-full flex flex-col gap-6">
            {connections.map((connection, index) => {
              const { firstName, lastName, age, gender, photoUrl } = connection;
      
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
                </div>
              );
            })}
          </div>
        </div>
      );
      
}
    

export default Connections;