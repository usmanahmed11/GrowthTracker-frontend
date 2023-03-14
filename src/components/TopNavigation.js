import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import API_URL from "../config";
import API_URL2 from "../config2";

const TopNavigation = ({ handleSettingsClick, handleDashboardClick }) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const roleId = document.cookie.replace(
    // eslint-disable-next-line
    /(?:(?:^|.*;\s*)role_id\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  useEffect(() => {
    const getUser = async () => {
      try {
        const accessToken = document.cookie.replace(
          // eslint-disable-next-line
          /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
          "$1"
        );

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            roleId,
          },
        };
        const response = await axios.get(API_URL + "/user", config);
        setName(response.data.name);
        setProfilePicture(response.data.profile_picture || "default_image.png");
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [roleId]);

  const handleLogout = useCallback(() => {
    //Get the access token from the cookie storage
    const accessToken = document.cookie.replace(
      // eslint-disable-next-line
      /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    // Include the access token in the request header
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .post(API_URL + "/logout", {}, config)
      .then((response) => {
        if (response.status === 200) {
          //Remove the access token from the cookie storage
          document.cookie =
            "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          history.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [history]);

  return (
    <>
      <div className="top_nav">
        <div className="nav_menu">
          <div className="nav toggle"></div>

          <nav className="nav navbar-nav my-padding">
            <ul className=" navbar-right">
              <Link to="/dashboard">
                <img
                  src="/images/growth-tracker.png"
                  alt=""
                  className="m-lg-n4 my-custommargin"
                />
              </Link>
              <li className="nav-item dropdown open">
                <a
                  className="user-profile dropdown-toggle"
                  aria-haspopup="true"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={`${API_URL2}/storage/profile_pictures/${profilePicture}`}
                    alt=""
                  />

                  {name}
                </a>
                <div
                  className="dropdown-menu dropdown-usermenu pull-right"
                  aria-labelledby="navbarDropdown"
                >
                  {roleId === "1" && (
                    <>
                      <Link
                        to="/dashboard"
                        className="dropdown-item"
                        onClick={handleDashboardClick}
                      >
                        Growth Management
                      </Link>
                      <Link to="/users" className="dropdown-item">
                        User Management
                      </Link>
                      <Link to="/settings/email" className="dropdown-item">
                        Email Configuration
                      </Link>
                    </>
                  )}
                  {roleId === "2" && (
                    <>
                      <Link
                        to="/dashboard"
                        className="dropdown-item"
                        onClick={handleDashboardClick}
                      >
                        Growth Management
                      </Link>
                      <Link to="/settings/email" className="dropdown-item">
                        Email Configuration
                      </Link>
                    </>
                  )}
                  {roleId === "3" && (
                    <>
                      <Link
                        to="/dashboard"
                        className="dropdown-item"
                        onClick={handleDashboardClick}
                      >
                        Growth Management
                      </Link>
                    </>
                  )}
                  <Link
                    to="/settings"
                    onClick={handleSettingsClick}
                    className="dropdown-item"
                  >
                    Settings
                  </Link>

                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
export default TopNavigation;
