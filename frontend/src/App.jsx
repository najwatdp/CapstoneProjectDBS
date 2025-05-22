import { Routes, Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Auth/Login";
import Register from "./Auth/Signin";
import ForgotPassword from "./Auth/ForgotPassword";
import Home from "./Pages/Home";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard/Dashboard";
import LoadingSpinner from "./Animation Loading/loadingSpinner";
import MainLayout from "./Dashboard/layouts/MainLayout";
import CreateArticle from "./Dashboard/CreateArticle";
import CreateUser from "./Dashboard/CreateUser";
import Categories from "./Dashboard/Categories";
import UserList from "./Dashboard/UserList";
import ArticleList from "./Dashboard/ArticleList";
import Settings from "./Dashboard/Settings";
import Analytics from "./Dashboard/Analytics";
import Profile from "./Dashboard/Profile";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Home */}
      {/* <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      /> */}

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <MainLayout />
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
        element={<LoadingSpinner Width={20} Height={2} />}
      />
    </Routes>
  );
}

export default App;
