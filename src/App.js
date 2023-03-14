import Login from "./pages/Login/Login";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Switch } from "react-router-dom";
import ChangePassword from "./pages/Login/ChangePassword";
import ResetPassword from "./pages/Login/ResetPassword";
import UpdatePassword from "./pages/Login/UpdatePassword";
import PageNotFound from "./pages/Login/PageNotFound";
import UpdateProfile from "./pages/Profile/updateProfile";
import UserForm from "./pages/NewUsers/UserForm";
import ActivateAccount from "./pages/NewUsers/ActivateAccount";
import UsersTable from "./pages/NewUsers/UsersTable";
import EditUser from "./pages/NewUsers/EditUser";
import GrowthForm from "./pages/GrowthUsers/GrowthForm";
import EditGrowthUser from "./pages/GrowthUsers/EditGrowthUser";
import Settings from "./components/settings";
import DashboardComponents from "./pages/Home/DashboardComponents";
import EmailForm from "./pages/EmailConfiguration/EmailForm";
import CandidateInfoPage from "./pages/GrowthUsers/CandidateInfoPage";
import { Redirect } from "react-router-dom";
import showCandidateInfo from "./components/showCandidateInfo";

function App() {
  const roleId = document.cookie.replace(
    // eslint-disable-next-line
    /(?:(?:^|.*;\s*)role_id\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  const renderUsersTable = () => {
    if (roleId === "2" || roleId === "3") {
      return <Redirect to="/dashboard" />;
    } else {
      return <UsersTable />;
    }
  };

  const renderUserForm = () => {
    if (roleId === "2" || roleId === "3") {
      return <Redirect to="/dashboard" />;
    } else {
      return <UserForm />;
    }
  };

  const renderEditUser = () => {
    if (roleId === "2" || roleId === "3") {
      return <Redirect to="/dashboard" />;
    } else {
      return <EditUser />;
    }
  };

  const renderGrowthForm = () => {
    if (roleId === "3") {
      return <Redirect to="/dashboard" />;
    } else {
      return <GrowthForm />;
    }
  };

  const renderEditGrowthUser = () => {
    if (roleId === "3") {
      return <Redirect to="/dashboard" />;
    } else {
      return <EditGrowthUser />;
    }
  };

  const renderEmailForm = () => {
    if (roleId === "3") {
      return <Redirect to="/settings" />;
    } else {
      return <EmailForm />;
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/candidate" component={showCandidateInfo} /> */}
        <Route path="/" exact component={Login} />
        <Route path="/change-password" exact component={ChangePassword} />
        <Route path="/dashboard" exact component={DashboardComponents} />
        <Route path="/reset-password" exact component={ResetPassword} />
        <Route path="/update-password/:id" exact component={UpdatePassword} />
        <Route path="/update-profile" exact component={UpdateProfile} />

        <Route path="/users/add" exact render={() => renderUserForm()} />
        <Route path="/users" exact render={() => renderUsersTable()} />
        <Route path="/users/edit/:id" exact render={() => renderEditUser()} />
        <Route path="/growth/add" exact render={() => renderGrowthForm()} />
        <Route
          path="/growth/update/:id"
          exact
          render={() => renderEditGrowthUser()}
        />
        <Route path="/settings/email" exact render={() => renderEmailForm()} />

        <Route path="/activate-account/:id" exact component={ActivateAccount} />
        <Route path="/settings" exact component={Settings} />
        <Route
          path="/growth/candidate/:titleId"
          exact
          component={CandidateInfoPage}
        />

        <Route path="*" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
