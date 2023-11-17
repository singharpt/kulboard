import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BoardsPopUp from "../components/BoardPopUp";
import BoardBlocks from "../components/BoardBlocks";
import getBoardsForUser from "../services/getBoardsForUser";
import { MyContext } from "../components/ContextProvider";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

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
    <>
      {showBoardsPopUp && <BoardsPopUp displayPopUp={setBoardsPopUp} />}
      {!showBoardsPopUp &&
        ownerBoards.length === 0 &&
        memberBoards.length === 0 && (
          <>
            <div style={{ fontSize: "50px" }}>
              Login to your account to access boards
            </div>
          </>
        )}
      {!showBoardsPopUp &&
        (ownerBoards.length > 0 || memberBoards.length > 0) && (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {ownerBoards.length > 0 && (
              <div style={{ flex: 1, paddingRight: "16px" }}>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  OWNER BOARDS
                  <Button
                    variant="outlined"
                    onClick={() => setBoardsPopUp(true)}
                    style={{ marginLeft: "8px" }}
                  >
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
              <div style={{ flex: 1, paddingLeft: "16px" }}>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  MEMBER BOARDS
                </div>
                <BoardBlocks boards_data={memberBoards} authorization={false} />
              </div>
            )}
          </div>
        )}
    </>
  );
}

export default Home;
