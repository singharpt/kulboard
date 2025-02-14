import express from "express";
import BoardDetailsController from "../controllers/boardDetails.js";
import middlewareAuthentication from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/board/:board_id",
  // middlewareAuthentication,
  BoardDetailsController.getBoardByBoardId
);
router.get(
  "/board/name/:board_name",
  middlewareAuthentication,
  BoardDetailsController.getBoardByBoardName
);
router.get(
  "/board/users/:board_id",
  // middlewareAuthentication,
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
router.post(
  "/board/add/memberId",
  middlewareAuthentication,
  BoardDetailsController.addBoardMembersByMemberId
);
router.post(
  "/board/add/memberEmail",
  middlewareAuthentication,
  BoardDetailsController.addBoardMembersByMemberEmail
);
router.post(
  "/board/remove/memberId",
  middlewareAuthentication,
  BoardDetailsController.deleteBoardMembersByMemberId
);

export default router;
