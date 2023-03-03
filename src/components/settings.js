import UpdateProfile from "../pages/Profile/updateProfile";
import ChangePassword from "../pages/Login/ChangePassword";
import TopNavigation from "./TopNavigation";
import React from "react";

const Settings = () => {
  return (
    <React.Fragment>
      <TopNavigation />
      <div className="my-padding">
        <UpdateProfile />

        <ChangePassword />
      </div>
    </React.Fragment>
  );
};
export default Settings;
