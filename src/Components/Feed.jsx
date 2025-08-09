import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/store/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();
    const getFeed = async () => {
    if (feed.length > 0)
        return;
    try {
    const res = await axios.get(BASE_URL + "/feed",{withCredentials:true});
    dispatch(addFeed(res.data.data));
    }
    catch(err)
    {
        console.error(err);
    }
    }
    useEffect(() => {
        getFeed();
    },[]);
    if (feed.length == 0)
        return (
            <div className="min-h-screen bg-gradient-to-r from-[#F28383] via-[#9D6CD2] to-[#481EDC] flex flex-col items-center py-10 px-4">
                <div className="text-white text-lg bg-[#00000050] rounded-xl p-6 shadow-lg">
                    No More User Found!
                </div>
            </div>
        );
    return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#F28383] from-10% via-[#9D6CD2] via-30% to-[#481EDC] to-90%">
        {feed?.length > 0 ? <UserCard user={feed[0]} /> : <p>Loading...</p>}
    </div>
    );
   
};

export default Feed;