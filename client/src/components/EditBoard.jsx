import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../components/ContextProvider";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import get_all_users from "../services/getAllUsers";

function EditBoards() {
  const { user, setUser } = useContext(MyContext);
  const [allusers, setUsers] = useState([{ email: "dummy" }]);

  const getAllUsers = async () => {
    const response = await get_all_users();
    console.log(response);
    setUsers(response);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Autocomplete
      multiple
      id="multiple-limit-tags"
      options={allusers}
      getOptionLabel={(option) => option.email}
      renderInput={(params) => (
        <TextField {...params} placeholder="Board Members" />
      )}
      sx={{ width: "500px" }}
    />
  );
}

export default EditBoards;
