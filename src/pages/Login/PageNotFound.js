import React from "react";

const PageNotFound = () => {

  const divStyle = {
    backgroundColor: "blue",
  };
  

  return <React.Fragment>
   <div className="nav-md" style={divStyle} >
    <div className="container body">
      <div className="main_container">
        <div className="col-md-12">
          <div className="col-middle">
            <div className="text-center text-center">
              <h1 className="error-number">404</h1>
              <h2>Sorry but we couldn't find this page</h2>
              <p>This page you are looking for does not exist 
              </p>
              <div className="mid_center">  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  </React.Fragment>
    
  
}
export default PageNotFound;