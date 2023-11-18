import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BoardsPopUp from "../components/BoardPopUp";
import BoardBlocks from "../components/BoardBlocks";
import getBoardsForUser from "../services/getBoardsForUser";
import { MyContext } from "../components/ContextProvider";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";

function Home() {
  const [showBoardsPopUp, setBoardsPopUp] = useState(false);
  const [ownerBoards, setOwnerBoards] = useState([]);
  const [memberBoards, setMemberBoards] = useState([]);
  const { user, setUser } = useContext(MyContext);

  const navigate = useNavigate();

  const getUserBoards = async () => {
    await user;
    console.log(user, !("user_id" in user));
    if ("user_id" in user) {
      const owner_boards_response = await getBoardsForUser.boards_user_is_owner(
        user.user_id
      );
      const member_boards_response =
        await getBoardsForUser.boards_user_is_member(user.user_id);
      if (owner_boards_response === false || member_boards_response === false) {
        navigate("/login", { replace: true });
      }
      console.log(owner_boards_response);
      console.log(member_boards_response);
      setOwnerBoards(owner_boards_response);
      setMemberBoards(member_boards_response);
    }
  };

  useEffect(() => {
    getUserBoards();
  }, [user?.user_id, showBoardsPopUp]);

  return (
    <div style={{ marginTop: "50px" }}>
      {showBoardsPopUp && <BoardsPopUp displayPopUp={setBoardsPopUp} />}
      {!showBoardsPopUp &&
        ownerBoards.length === 0 &&
        memberBoards.length === 0 &&
        (user.hasOwnProperty("user_id") ? (
          <>
            <span style={{ fontSize: "50px" }}>Create your own family </span>
            <button
              onClick={() => setBoardsPopUp(true)}
              style={{
                fontSize: "50px",
                borderStyle: "dashed",
                padding: "5px",
                marginLeft: "3px",
                borderRadius: "5px",
              }}
            >
              Board{" "}
            </button>
          </>
        ) : (
          <div style={{ fontSize: "50px" }}>
            Login to your account to access boards
          </div>
        ))}
      {!showBoardsPopUp &&
        (ownerBoards.length > 0 || memberBoards.length > 0) && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            {ownerBoards.length > 0 && (
              <div style={{ maxWidth: "50vmax" }}>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  BOARDS OWNED
                  <Button
                    variant="outlined"
                    onClick={() => setBoardsPopUp(true)}
                    style={{ marginLeft: "16px" }}
                  >
                    <AddIcon />
                    Add Board
                  </Button>
                </div>
                <BoardBlocks boards_data={ownerBoards} authorization={true} />
              </div>
            )}
            {ownerBoards.length > 0 && memberBoards.length > 0 && (
              <Divider orientation="vertical" flexItem />
            )}
            {memberBoards.length > 0 && (
              <div style={{ maxWidth: "50max" }}>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "22px",
                  }}
                >
                  MEMBER OF BOARDS
                </div>
                <BoardBlocks boards_data={memberBoards} authorization={false} />
              </div>
            )}
          </div>
        )}
    </div>
  );
}

export default Home;
