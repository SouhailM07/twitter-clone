"use client";
// components
import TweetPanel from "@/components/TweetPanel/TweetPanel";
import WelcomePanel from "@/components/WelcomePanel/WelcomePanel";
// appwrite
import { account } from "@/appwrite";
import { useEffect } from "react";
// zustand
import toggleStore from "@/zustand/toggleStore";
export default function Home() {
  let { userLoggedIn, toggleUserLoggedIn } = toggleStore((state) => state);
  useEffect(() => {
    console.log("check render");
    let userInfo = account
      .get()
      .then(() => toggleUserLoggedIn(true))
      .catch((err) => {
        console.log(err);
        toggleUserLoggedIn(false);
      });
  }, []);
  return (
    <main className="w-full min-h-screen border border-gray-600">
      <h1 className="route__title">Home</h1>
      {userLoggedIn ? <TweetPanel /> : <WelcomePanel />}
    </main>
  );
}
