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
router.get(
  "/board/user/member/:board_member_id",
  middlewareAuthentication,
  BoardDetailsController.getBoardsByMemberId
);
router.get(
  "/board/user/owner/:board_owner_id",
  middlewareAuthentication,
  BoardDetailsController.getBoardsByOwnerId
);
router.get(
  "/board",
  middlewareAuthentication,
  BoardDetailsController.getAllBoards
);
router.post(
  "/board/add",
  middlewareAuthentication,
  BoardDetailsController.addNewBoard
);
router.patch(
  "/board/add/member",
  middlewareAuthentication,
  BoardDetailsController.addBoardMembers
);

export default router;
