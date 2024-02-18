"use client";
import "./home.css";
// zustand
import postsStore from "@/zustand/postsStore";
// appwrite
import { db, appwriteKeys } from "@/appwrite";
// import { Query } from "appwrite";
import { useEffect } from "react";
// components
import TweetPanel from "@/components/TweetPanel/TweetPanel";
import Tweet from "@/components/Tweet/Tweet";

/*===============================================================================================*/
// main component section
/*===============================================================================================*/
export default function HomeContainer() {
  let { posts, editPosts } = postsStore((state) => state);
  let getPosts = async () => {
    await db
      .listDocuments(appwriteKeys.db_id!, appwriteKeys.postsCollectionId!)
      .then((res) => {
        editPosts(res.documents);
        // console.log(res);
      });
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <TweetPanel />
      <ul>
        {posts.map((e, i) => {
          return <Tweet post={e} key={i} userId={e} />;
        })}
      </ul>
    </>
  );
}
