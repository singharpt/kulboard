import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BoardsPopUp from "../components/BoardPopUp";
import BoardBlocks from "../components/BoardBlocks";
import getBoardsForUser from "../services/getBoardsForUser";
import { MyContext } from "../components/ContextProvider";
import EditBoards from "../components/EditBoard";

function Home() {
  const [showBoardsPopUp, setBoardsPopUp] = useState(false);
  const [ownerBoards, setOwnerBoards] = useState([]);
  const [memberBoards, setMemberBoards] = useState([]);
  const { user, setUser } = useContext(MyContext);

  const navigate = useNavigate();

  const getUserBoards = async () => {
    //console.log(user, !("user_id" in user));
    if (!("user_id" in user)) {
      navigate("/login", { replace: true });
    } else {
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
      <Navbar displayPopUp={setBoardsPopUp} />
      {showBoardsPopUp && <BoardsPopUp displayPopUp={setBoardsPopUp} />}
      {!showBoardsPopUp &&
        ownerBoards.length === 0 &&
        memberBoards.length === 0 && (
          <>
            <div style={{ fontSize: "100px" }}>This is the Home Page</div>
          </>
        )}
      {!showBoardsPopUp && ownerBoards.length > 0 && (
        <BoardBlocks boards_data={ownerBoards} />
      )}
      {!showBoardsPopUp && memberBoards.length > 0 && (
        <BoardBlocks boards_data={memberBoards} />
      )}
      <EditBoards />
    </>
  );
}

export default Home;
