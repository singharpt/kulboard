import express from "express";
import AuthenticationController from "../controllers/authentication.js";
import middlewareAuthentication from "../middleware/auth.js";

const router = express.Router();

router.post("/register", AuthenticationController.registerUser);
router.post("/login", AuthenticationController.loginUser);
router.post("/checkUserEmail", AuthenticationController.userEmailExists);
router.get(
  "/checkUserLoggedIn",
  middlewareAuthentication,
  AuthenticationController.middleware_user_return
);
router.get(
  "/logoutUser",
  middlewareAuthentication,
  AuthenticationController.logout_user
);
export default router;
