"use client";
import "./tweet.css";
// zustand
import postsStore from "@/zustand/postsStore";
// assets
import Image from "next/image";
import like_logo_active from "@/public/heart-regular.svg";
import like_logo_disable from "@/public/heart-solid.svg";
import reply_logo from "@/public/comment-dots-regular.svg";
// appwrite
import { db, appwriteKeys } from "@/appwrite";
// import { Query } from "appwrite";
import { useEffect } from "react";

export default function Tweet() {
  let { posts, editPosts } = postsStore((state) => state);
  let getPosts = async () => {
    await db
      .listDocuments(appwriteKeys.db_id!, appwriteKeys.postsCollectionId!)
      .then((res) => {
        editPosts(res.documents);
        console.log(res);
      });
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {posts?.map((e, i) => {
        return (
          <div key={i} className="flex pl-[1.5rem] hover:bg-gray-900 py-[1rem]">
            <div className="h-[3rem] w-[3rem] border-2 rounded-full mr-[1rem]"></div>
            {/*  */}
            <div className="">
              {/* stage 1 */}
              <div className="flex space-x-[1rem] items-center">
                <h1 className="font-bold text-[1.2rem]">{e?.user?.name}</h1>
                <p className="userDetails">@{e?.user?.username}</p>
                <span className="userDetails">
                  {formatTimeAgo(e?.user?.$updatedAt)}
                </span>
              </div>
              {/*stage 2 */}
              <div className="mt-[1.2rem] mb-[1.4rem]">
                <p>{e?.textPost}</p>
              </div>
              {/* stage 3 */}
              <div className="flex space-x-[3.3rem]">
                <button className="flex space-x-[0.7rem]">
                  <Image src={reply_logo} alt="logo" height={20} width={20} />
                  <span>0</span>
                </button>
                <button className="flex space-x-[0.7rem]">
                  <Image
                    src={like_logo_active}
                    alt="logo"
                    height={20}
                    width={20}
                  />
                  <span>{e?.likes}</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
function formatTimeAgo(timestamp) {
  const date: any = new Date(timestamp);
  const now: any = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }
}
