import "./App.css";
import Home from "./components/Home";
import LoginComponent from "./components/LoginComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router";
import Categories from "./components/Categories";
import Car from "./components/Car";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <LoginComponent />;
  return children;
};

function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Navigate replace to="/home" />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={
              token === null ? (
                <Navigate replace to="/" />
              ) : (
                <Navigate replace to="/home/*" />
              )
            }
          />
          <Route path="/home" element={<ProtectedRoute Component={Home} />}/>
          <Route path="/categories" element={<ProtectedRoute Component={Categories} />}/>
          <Route path="/car" element={<ProtectedRoute Component={Car} />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
