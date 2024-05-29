import React from "react";
import { useContext } from "react";
import { userContext } from "../../context/UserContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "../../Pages/PlacesPage";
import AccountNav from "../../Components/AccountNav";

const Profile = () => {
  const { user, ready, setUser } = useContext(userContext);
  let { subpage } = useParams();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post("/logout");
    navigate("/", { replace: true });
    setUser(null);
  };
  if (subpage === undefined) {
    subpage = "account";
  }
  if (!ready) {
    return "Loading.....";
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <React.Fragment>
      <div>
        <AccountNav />
        {subpage === "account" && (
          <div className="text-center max-w-lg mx-auto ">
            Logged in as {user.name} ({user.email}) <br />
            <button onClick={handleLogout} className="primary max-w-sm mt-3">
              Logout
            </button>
          </div>
        )}
        {subpage === "places" && <PlacesPage />}
      </div>
    </React.Fragment>
  );
};

export default Profile;
