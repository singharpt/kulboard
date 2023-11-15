import express from "express";
import BoardDetailsController from "../controllers/boardDetails.js";
import middlewareAuthentication from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/board/:board_id",
  middlewareAuthentication,
  BoardDetailsController.getBoardByBoardId
);
router.get(
  "/board/users/:board_id",
  middlewareAuthentication,
  BoardDetailsController.getUsersByBoardId
);
router.get(
  "/board/tasks/:board_id",
  middlewareAuthentication,
  BoardDetailsController.getTasksByBoardId
);

export default router;
