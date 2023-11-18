import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../components/ContextProvider";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import get_all_users from "../services/getAllUsers";
import get_all_board_members from "../services/getBoardMembers";
import Button from "@mui/material/Button";
import updateBoardMembers from "../services/updateBoardMembers";

function EditBoards(props) {
  const { user, setUser } = useContext(MyContext);
  const [allusers, setUsers] = useState([{ email: "dummy" }]);
  const [boardMembers, setBoardMembers] = useState([]);
  const board_data = props.board;

  const getAllUsers = async () => {
    const allUsersRespone = await get_all_users(board_data.board_id);
    const allBoardMembersResponse = await get_all_board_members(
      board_data.board_id
    );
    console.log("Board Members", allBoardMembersResponse);

    // filter admin from the user_list
    const nonAdminUserList = allUsersRespone.filter(
      (item) => item.user_id !== user.user_id
    );

    // filter admin from the members_list
    const nonAdminMembersList = allBoardMembersResponse.filter(
      (item) => item.user_id !== user.user_id
    );

    // Remove users that are also board members
    const availableMembers = nonAdminUserList.filter(
      (nonAdminUsers) =>
        !nonAdminMembersList.some(
          (members) => members.user_id === nonAdminUsers.user_id
        )
    );

    setUsers(availableMembers);
    setBoardMembers(nonAdminMembersList);
  };

  const addMembers = async (addedMember) => {
    //console.log("Added Email IDs:", addedMember);
    const response = await updateBoardMembers.addBoardMembers(
      board_data.board_id,
      addedMember.user_id
    );
    console.log(response);
    if (response?.length > 0) {
      setBoardMembers((prev) => [...prev, addedMember]);
    }
  };

  const removeMembers = async (removedMember) => {
    //console.log("Removed Email IDs:", removedMember);
    const response = await updateBoardMembers.removeBoardMembers(
      board_data.board_id,
      removedMember.user_id
    );
    console.log(response);
    if (response?.length > 0) {
      const updatedMemberList = boardMembers.filter(
        (member) => member.user_id !== removedMember.user_id
      );
      setBoardMembers(updatedMemberList);
    }
  };

  const editMembers = (event, value) => {
    //console.log(value);

    // Check if user added an email id
    const addedEmails = value.filter((email) => !boardMembers.includes(email));
    if (addedEmails.length > 0) {
      addMembers(addedEmails[0]);
    }

    // Check if user removed an email id
    const removedEmails = boardMembers.filter(
      (email) => !value.includes(email)
    );
    if (removedEmails.length > 0) {
      removeMembers(removedEmails[0]);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Autocomplete
        multiple
        id="multiple-limit-tags"
        options={allusers}
        onChange={editMembers}
        value={boardMembers}
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
    </>
  );
}

export default EditBoards;
