"use client";
// components
import HomeContainer from "@/components/Home/Home";
import WelcomePanel from "@/components/WelcomePanel/WelcomePanel";
// appwrite
import { account, appwriteKeys, db } from "@/appwrite";
import { Query } from "appwrite";
import { useLayoutEffect } from "react";
// zustand
import toggleStore from "@/zustand/toggleStore";
import userInfoStore from "@/zustand/userInfoStore";

export default function Home() {
  let { userLoggedIn, toggleUserLoggedIn } = toggleStore((state) => state);
  let { userInformation_f } = userInfoStore((state) => state);
  let initial_getUserData = async () => {
    console.log("check render");
    account
      .get()
      .then(async (res) => {
        toggleUserLoggedIn(true);
        await db
          .listDocuments(appwriteKeys.db_id!, appwriteKeys.usersCollectionId!, [
            Query.equal("email", [res.email]),
          ])
          .then((res) => {
            // console.log(res);
            userInformation_f(res.documents["0"]);
            console.log(res.documents);
          });
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toggleUserLoggedIn(false);
      });
  };

  useLayoutEffect(() => {
    initial_getUserData();
  }, []);
  return (
    <main className="w-full min-h-screen border border-gray-600">
      <h1 className="route__title">Home</h1>
      {userLoggedIn ? <HomeContainer /> : <WelcomePanel />}
    </main>
  );
}
