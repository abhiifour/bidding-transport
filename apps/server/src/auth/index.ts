// admin.js
import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json"; // download from Firebase Console

// Explicitly type serviceAccount as ServiceAccount
export const superAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

// Create user and set role (admin or staff)
// export async function createUser(email: string, password : string, role = "staff") {
//   const user = await admin.auth().createUser({
//     email,
//     password,
//   });

 

//   await admin.auth().setCustomUserClaims(user.uid, { role });

//   console.log(`Created ${role} user:`, email);
// }

export async function getUser(){
     const user = await admin.auth().getUser("sQ2Oyl8fZHau49nfQYGB77ZCBFx2")
     console.log("User fetched successfully", user.customClaims?.role);
}


export async function createAdmin(email: string, password : string, role = "admin") {
  const user = await admin.auth().createUser({
    email,
    password,
  });

 

  await admin.auth().setCustomUserClaims(user.uid, { role });

  console.log(`Created ${role} user:`, email);
}