import React from "react";
import { Route, Navigate, Routes } from "react-router";

function ProtectedRoute({ Component }) {
  //const { token } = useSelector((state) => state);
  const token = localStorage.getItem("token");
  if (token == null) {
    return (
      <Routes>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  } else {
    return <Component />;
  }
}

export default ProtectedRoute;
