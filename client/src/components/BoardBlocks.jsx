import React, { useState, useContext } from "react";
import EditBoards from "../components/EditBoard";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { MyContext } from "../components/ContextProvider";
import { useNavigate } from "react-router-dom";

function BoardBlocks(props) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(null);
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
          {props.boards_data.map((item, index) => (
            <Card
              key={item?.board_id}
              onClick={() => navigate("/calendar")}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                margin: "10px",
                width: "200px",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <CardContent>
                <Typography
                  variant="body"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {item?.board_name.toUpperCase()}
                </Typography>
                {authorization_to_edit && isHovered === index && (
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation(); // Stop propagation here
                      prepEditBoard(item);
                    }}
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 5,
                    }}
                  >
                    <EditIcon style={{ fontSize: 20 }} />
                  </IconButton>
                )}
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
