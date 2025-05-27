
import type { Request, Response } from "express";
import { superAdmin } from "../auth";
import prisma from "../utils/db"

// create a new staff 
export async function createStaff(req: Request, res: Response) : Promise<any> {

  try {
     const {email, password} = req.body;
  const user = await superAdmin.auth().createUser({
    email,
    password,
  });
  
  if(user){
    const newUser = await prisma.user.create({
        data:{
            uid: user.uid,
            email: user?.email || "null" ,
            role: "staff"

        }
    })
  }
  

  await superAdmin.auth().setCustomUserClaims(user.uid, { role : "staff" });

  return res.status(201).send("Staff user created successfully");
  } catch (error) {
    console.error("Error creating staff user:", error);
    return res.status(500).send("Error creating staff user");
  }


}


// reset the password 
export async function resetStaffPassword(req: Request, res: Response): Promise<any> {

  const {email, password} = req.body;
  const user = await superAdmin.auth().getUserByEmail(email);
  if (!user) {
    return res.status(404).send("User not found");
  }

  await superAdmin.auth().updateUser(user.uid, {
    password,
  });

  console.log(`Reset password for staff user:`, email);
}


// remove a staff 
export async function removeStaff(req: Request, res: Response): Promise<any>  {
  try {
    
  const {email} = req.body;
  console.log(email)
  const user = await superAdmin.auth().getUserByEmail(email);
  if (!user) {
    return res.status(404).send("User not found");
  }

  await superAdmin.auth().deleteUser(user.uid);
  await prisma.user.delete({
    where: {
      uid: user.uid,
    },
  });
    return res.status(200).send("Staff user removed successfully");
  } catch (error) {
    console.error("Error removing staff user:", error);
    return res.status(500).send("Error removing staff user");
    
  }

}


//get user details

export async function getStaffDetails(req: Request, res: Response):Promise<any> {
    const {uid} = req.body;
    try {
        const user = await superAdmin.auth().getUser(uid);
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).send("Error fetching user");
    }
}


export async function getAllUsers(req: Request, res: Response):Promise<any> {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).send("Error fetching users");
    }
}