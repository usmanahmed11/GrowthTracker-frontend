import React, { useEffect, useState } from "react";
import DashboardComponents from "./DashboardComponents";


const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // get the access token from the cookie
      const accessTokenCookie = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  
      // redirect the user to the login page if the access token cookie is not present
      if (!accessTokenCookie) {
        props.history.push("/login");
        return;
      }
  
      // If the access token is present, redirect the user to the dashboard
      props.history.push("/dashboard");
      setIsLoading(false);
      setIsAuthenticated(true);
    };
  
    checkAuth();
  }, [props.history]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  

  return (
    <React.Fragment>
      {isAuthenticated ? (
        <DashboardComponents/>
      ) : (
        <p>You are not authenticated.</p>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
