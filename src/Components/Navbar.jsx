import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/store/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <nav className="w-full bg-[#00000050] backdrop-blur-md text-white shadow-md z-50">
      <div className="flex justify-between items-center px-8 py-3">
        <Link
          to="/"
          className="text-xl font-semibold tracking-wide hover:text-cyan-300 transition"
        >
          SYNKORA{" "}
          <span className="text-gray-300 font-normal text-sm">
            · Sync. Match. Connect.
          </span>
        </Link>
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/30">
                <img
                  alt="profile"
                  src={user.photoUrl || "/assets/profile-avatar.png"}
                  onError={(e) => {
                    e.target.src = "/assets/profile-avatar.png";
                  }}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#000000cc] text-white rounded-box z-[999] mt-3 w-52 p-2 shadow-lg backdrop-blur-md"
            >
              <li><Link to="/">Explore</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/requests">Requests</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;