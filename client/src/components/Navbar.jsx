import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../components/ContextProvider";
import React, { useEffect, useContext } from "react";
import checkUserLoggedIn from "../services/checkUserLoggedIn";
import logoutUser from "../services/logoutUser";

function Navbar() {
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const response = await checkUserLoggedIn();
    console.log(response.userdata[0]);
    setUser(response.userdata[0]);
  };

  const handleAuthentication = async () => {
    if ("user_id" in user) {
      await logoutUser();
      setUser(null);
      window.location.reload();
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppBar color="default" elevation={0}>
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          WELCOME TO KUL'BOARD
        </Typography>
        <nav>
          <Button
            onClick={() => (window.location.href = "/")}
            sx={{ my: 1, mx: 1.5 }}
          >
            HOME
          </Button>
        </nav>
        <Button
          onClick={handleAuthentication}
          variant="outlined"
          sx={{ my: 1, mx: 1.5 }}
        >
          {"user_id" in user ? "LOGOUT" : "LOGIN"}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
