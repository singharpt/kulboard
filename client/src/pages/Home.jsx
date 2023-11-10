import React, { useEffect, useState } from "react";
import validateUser from "../services/validateUser";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkUser = async () => {
    const isUserLoggedIn = await validateUser();
    console.log(isUserLoggedIn);
    if (isUserLoggedIn) {
      setUserLoggedIn((prev) => !prev);
    } else {
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ fontSize: "100px" }}>This is the Home Page</div>
    </>
  );
}

export default Home;
