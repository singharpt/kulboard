import React from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import TasksDisplay from "./pages/TasksDisplay";
// import Navbar from "./components/Navbar";
// import CreateBoard from "./pages/CreateBoard";

const App = () => {
  const element = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/:board/:date",
      element: <TasksDisplay />,
    },
    // {
    //   path: "/createboard",
    //   element: <CreateBoard />,
    // },
  ]);
  return <div className="app">{element}</div>;
};

export default App;
