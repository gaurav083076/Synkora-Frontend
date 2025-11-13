import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/store/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getFeed = async () => {
      try {
        const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
        dispatch(addFeed(res.data.data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (feed.length === 0) {
      getFeed();
    } else {
      setLoading(false);
    }
  }, [dispatch, feed.length]);
  if (loading) {
    return (
      <div className="h-full flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }
  if (feed.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-10 px-4">
        <div className="text-white text-lg bg-[#00000050] rounded-xl p-6 shadow-lg backdrop-blur-md">
          No More User Found!
        </div>
      </div>
    );
  }
  return (
    <div className="h-full flex justify-center items-center">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;