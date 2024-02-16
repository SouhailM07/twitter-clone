// appwrite
import { account, db, appwriteKeys } from "@/appwrite";
import { ID, Query } from "appwrite";

export async function createNewUser(user) {
  try {
    // ! check if user exist
    const { total } = await db.listDocuments(
      appwriteKeys.db_id!,
      appwriteKeys.usersCollectionId!,
      [Query.equal("email", [user.email])]
    );
    if (total > 0) {
      return "user exist";
    } else {
      // ! creating user document in db for checking later
      await db.createDocument(
        appwriteKeys.db_id!,
        appwriteKeys.usersCollectionId!,
        ID.unique(),
        {
          name: user.name,
          username: user.username,
          email: user.email,
        }
      );
      // ! creating account
      await account.create(ID.unique(), user.email, user.password, user.name);
      // ! creating session
      await account.createEmailSession(user.email, user.password);
      return "access";
    }
  } catch (error) {
    console.log(error);
  }
}

export async function userLogin(user) {
  try {
    // check if user exist
    const userExist = await db.listDocuments(
      appwriteKeys.db_id!,
      appwriteKeys.usersCollectionId!,
      [Query.equal("email", [user.email])]
    );
    if (userExist.total < 1) {
      return "user does not exist";
    } else {
      let loggedUser: any = await account
        .createEmailSession(user.email, user.password)
        .then(() => {
          return "access";
        });
      return loggedUser;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function logout() {
  await account.deleteSession("current");
}
