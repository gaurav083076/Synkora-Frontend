import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  if (!user) {
    return (
      <div className="h-full flex justify-center items-center text-white">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return <EditProfile user={user} />;
};

export default Profile;