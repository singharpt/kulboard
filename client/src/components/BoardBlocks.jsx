import React, { useState, useContext } from "react";
import EditBoards from "../components/EditBoard";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { MyContext } from "../components/ContextProvider";

function BoardBlocks(props) {
  const { user, setUser } = useContext(MyContext);
  const [showEdit, setShowEdit] = useState(false);
  const [board, setBoard] = useState([]);
  const authorization_to_edit = props.authorization;

  const prepEditBoard = (item) => {
    setBoard(item);
    setShowEdit(true);
  };

  const handleDoneEditing = () => {
    setShowEdit(false);
    setBoard(null);
  };

  return (
    <>
      {!showEdit && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {props.boards_data.map((item) => (
            <Card
              key={item?.board_id}
              onClick={
                authorization_to_edit ? () => prepEditBoard(item) : undefined
              }
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                margin: "10px",
                width: "200px",
                cursor: authorization_to_edit ? "pointer" : "default",
              }}
            >
              <CardContent>
                <Typography variant="body">{item?.board_name}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {showEdit && (
        <Card
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            width: "300px",
            margin: "40px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <Typography variant="h6" style={{ fontWeight: "700" }}>
              {board?.board_name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Owner: {user.email}
            </Typography>
            <EditBoards board={board} onDoneEditing={handleDoneEditing} />
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default BoardBlocks;
