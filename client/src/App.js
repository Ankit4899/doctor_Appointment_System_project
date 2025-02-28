import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoute";
import Spinner from "./components/Spinner";
import ApplyDoctor from "./pages/ApplyDoctor";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Notifications from "./pages/Notifications";
import Register from "./pages/Register";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <HomePage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/apply-doctor"
              element={
                <ProtectedRoutes>
                  <ApplyDoctor />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/notification"
              element={
                <ProtectedRoutes>
                  <Notifications />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoutes>
                  <Login />
                </PublicRoutes>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoutes>
                  <Register />
                </PublicRoutes>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
