import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client();

export const appwriteKeys = {
  endPointId: process.env.NEXT_PUBLIC_ENDPOINT_ID,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
};

client.setEndpoint(appwriteKeys.endPointId).setProject(appwriteKeys.projectId);

export const account = new Account(client);
export const db = new Databases(client);
export const storage = new Storage(client);
