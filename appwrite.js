import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client();

export const appwriteKeys = {
  endPointId: process.env.NEXT_PUBLIC_ENDPOINT_ID,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  db_id: process.env.NEXT_PUBLIC_DB_ID,
  usersCollectionId: process.env.NEXT_PUBLIC_USERS_COLLECTION,
};

client.setEndpoint(appwriteKeys.endPointId).setProject(appwriteKeys.projectId);

export const account = new Account(client);
export const db = new Databases(client);
export const storage = new Storage(client);
