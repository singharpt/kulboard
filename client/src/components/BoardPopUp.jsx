import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MyContext } from "../components/ContextProvider";
import addNewBoard from "../services/addNewBoard";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

function BoardsPopUp(props) {
  const { user, setUser } = useContext(MyContext);
  const set_display_boards_pop_up = props.displayPopUp;
  const schema = yup.object().shape({
    boardname: yup.string().required("Board name is required!"),
  });

  // Declare the useForm state where register has formData and handleSubmit helps in submitting form
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  // The submit function called inside handleSubmit state method
  const onSubmit = async (data) => {
    console.log(data);
    const response = await addNewBoard(data.boardname, user.user_id);
    console.log(response);
    if (!response?.status) {
      set_display_boards_pop_up(false);
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        borderStyle: "double",
        borderRadius: "10px",
        padding: "50px",
        position: "relative", // Added position relative for absolute positioning of the close icon
      }}
    >
      <IconButton
        onClick={() => set_display_boards_pop_up(false)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      >
        <ClearIcon />
      </IconButton>
      <p style={{ fontSize: "25px", fontWeight: "700" }}>CREATE NEW BOARD</p>
      <div>
        <input
          type="text"
          placeholder="Enter board name"
          {...register("boardname")}
          style={{ fontSize: "20px", padding: "15px", margin: "10px" }}
        />
        <p style={{ color: "red" }}>{errors.boardname?.message}</p>
      </div>
      <input
        type="submit"
        style={{
          fontSize: "20px",
          padding: "15px",
          width: "240px",
          margin: "10px",
        }}
      />
    </form>
  );
}

export default BoardsPopUp;
