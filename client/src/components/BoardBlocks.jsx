import React, { useState } from "react";
import EditBoards from "../components/EditBoard";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function BoardBlocks(props) {
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
            padding: "10px",
          }}
        >
          <CardContent>
            <Typography variant="h6">{board?.board_name}</Typography>
            <EditBoards board={board} onDoneEditing={handleDoneEditing} />
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default BoardBlocks;
