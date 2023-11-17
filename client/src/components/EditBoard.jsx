import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../components/ContextProvider";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import get_all_users from "../services/getAllUsers";
import Button from "@mui/material/Button";

function EditBoards(props) {
  const { user, setUser } = useContext(MyContext);
  const [allusers, setUsers] = useState([{ email: "dummy" }]);

  const getAllUsers = async () => {
    const response = await get_all_users();
    setUsers(response);
  };

  const editMembers = (event, value) => {
    console.log(value);
    // You can perform additional logic here to handle edited members
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <Autocomplete
        multiple
        id="multiple-limit-tags"
        options={allusers}
        onChange={editMembers}
        getOptionLabel={(option) => option.email}
        renderInput={(params) => (
          <TextField {...params} label="Board Members" />
        )}
        sx={{ width: "100%" }}
      />
      <Button
        variant="outlined"
        onClick={props.onDoneEditing}
        style={{ marginTop: "10px" }}
      >
        DONE
      </Button>
    </div>
  );
}

export default EditBoards;
