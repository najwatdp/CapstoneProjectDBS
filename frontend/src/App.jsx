import { Routes, Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./View/Auth/Login";
import Register from "./View/Auth/Signin";
import ForgotPassword from "./View/Auth/ForgotPassword";
import Home from "./View/Pages/Home";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./View/Dashboard/Dashboard";
import MainLayout from "./View/Dashboard/layouts/MainLayout";
import CreateArticle from "./View/Dashboard/CreateArticle";
import CreateUser from "./View/Dashboard/CreateUser";
import Categories from "./View/Dashboard/Categories";
import UserList from "./View/Dashboard/UserList";
import ArticleList from "./View/Dashboard/ArticleList";
import Settings from "./View/Dashboard/Settings";
import Analytics from "./View/Dashboard/Analytics";
import Profile from "./View/Dashboard/Profile";
import SetupRoleAdmin from "./SetupRoleAdmin";
import SetupRoleUser from "./SetupRoleUser";
import Error404 from "./View/Errors/404";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Home */}
      {/* <Route
        path="/home"
        element={
          <PrivateRoute>
            <SetupRoleUser>
              <Home />
            </SetupRoleUser>
          </PrivateRoute>
        }
      /> */}

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <SetupRoleAdmin>
              <MainLayout />
            </SetupRoleAdmin>
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/create" element={<CreateUser />} />
        <Route path="health-info" element={<ArticleList />} />
        <Route path="health-info/create" element={<CreateArticle />} />
        <Route path="health-info/categories" element={<Categories />} />
        <Route path="settings" element={<Settings />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      {/* loading */}
      <Route
        path="/percobaan"
        element={<SetupRoleAdmin/>}
      />
    </Routes>
  );
}

export default App;
