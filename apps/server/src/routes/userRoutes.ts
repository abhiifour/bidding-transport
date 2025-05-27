import { Router } from "express";
import { createStaff, getAllUsers, getStaffDetails, removeStaff, resetStaffPassword } from "../controller/userController";

const userRouter = Router()

userRouter.post("/create", createStaff)
userRouter.post("/reset-password", resetStaffPassword)
userRouter.post("/remove", removeStaff)
userRouter.post("/get-user", getStaffDetails)
userRouter.get("/get-all", getAllUsers)

export default userRouter;


