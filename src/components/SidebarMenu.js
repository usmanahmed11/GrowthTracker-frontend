import { Link } from "react-router-dom";
const SidebarMenu = () => {
  return (
    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
      <div className="menu_section">
        <h3>General</h3>
        <ul className="nav side-menu">
          <li>
            <Link to="/dashboard">
              <i className="fa fa-home"></i>
              Growth Users
            </Link>
            <Link to="/user-table">
              <i className="fa fa-table"></i>
              Users Table
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SidebarMenu;
