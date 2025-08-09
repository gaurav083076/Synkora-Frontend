import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/store/feedSlice";

const UserCard = ({user}) => {
   console.log(user);
   const { _id, firstName, lastName, photoUrl, age, gender, about} = user;
   console.log(_id,firstName);
   const dispatch = useDispatch();
   const handleRequest = async (status,userId) => {
        try{
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,{},{withCredentials:true});
            console.log(res);
            dispatch(removeFeed(userId));
        }
        catch(err)
        {
            console.error(err);
        }
   }
   return (
   <div className="card bg-base-100 w-96 shadow-sm bg-gray-400">
   <figure className="px-10 pt-10">
     <img
       src={photoUrl}
       alt=""
       className="rounded-xl" />
   </figure>
   <div className="card-body items-center text-center">
     <h2 className="card-title">{firstName +" "+ lastName}</h2>
     {age && gender && <p>{age + ", " + gender}</p>}
     <p>{about}</p>
     <div className="card-actions">
       <button className="btn btn-primary bg-red-500 rounded-full" onClick={() => handleRequest("ignored",_id)}>Ignore</button>
       <button className="btn btn-primary bg-green-500 rounded-full" onClick={() => handleRequest("interested",_id)}>Interested</button>
     </div>
   </div>
 </div>)
}

export default UserCard;