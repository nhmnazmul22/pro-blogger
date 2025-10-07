import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import { Footer, Header } from "./components";
import { login, logout } from "./store/features/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.error("Failed to load user data:", err);
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="max-h-screen flex flex-wrap content-between bg-slate-200">
      <div className="container m-auto">
        <div className="w-full block py-4">
          <Header />
          <main>{/* TODO: <Outlet /> */}</main>
          <Footer />
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App;
