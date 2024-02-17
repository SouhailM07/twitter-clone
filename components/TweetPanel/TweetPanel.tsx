"use client";
import "./tweetpanel.css";
// hook
import { useState } from "react";
// zustand
import userInfoStore from "@/zustand/userInfoStore";
import postsStore from "@/zustand/postsStore";
// appwrite
import { account, db, appwriteKeys } from "@/appwrite";
import { ID } from "appwrite";
// shadcn-ui
import { useToast } from "../ui/use-toast";
// assets
import Image from "next/image";
import default_avatar from "@/public/newUserImage.png";
export default function TweetPanel() {
  let [tweet, setTweet] = useState<string>("");
  let [allowPost, setAllowPost] = useState<boolean>(false);
  let { userInformation } = userInfoStore((state) => state);
  let handleChange = (e) => {
    setTweet(e.target.value);
    if (e.target.value.length) setAllowPost(true);
    else setAllowPost(false);
  };
  let { toast } = useToast();
  let { editPosts } = postsStore((state) => state);
  let handlePost = async () => {
    if (tweet.length > 0) {
      await db
        .createDocument(
          appwriteKeys.db_id!,
          appwriteKeys.postsCollectionId!,
          ID.unique(),
          {
            textPost: tweet,
            user: userInformation?.$id,
          }
        )
        .then(
          async () =>
            await db
              .listDocuments(
                appwriteKeys.db_id!,
                appwriteKeys.postsCollectionId!
              )
              .then((res) => {
                editPosts(res.documents);
                setTweet("");
              })
              .then(() => toast({ description: "your post was sent" }))
              .catch((err) => {
                console.log(err);
                toast({
                  variant: "destructive",
                  description: "something went wrong",
                });
              })
        );
    }
  };
  return (
    <>
      <div className="p-[1rem] text-[1.3rem] ">
        <div className="flex space-x-[2.5rem] h-[5rem] items-start">
          <div className="h-[3rem] min-w-[3rem] border-2 rounded-full ">
            <Image
              src={userInformation?.defaultAvatar ? default_avatar : ""}
              alt="avatar"
              width={100}
              height={100}
              className="h-full w-full rounded-full"
            />
          </div>
          <input
            type="text"
            value={tweet}
            onChange={handleChange}
            className="bg-transparent h-[3rem] text-white w-full "
            placeholder="what is happening ?"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handlePost}
            className={`${
              allowPost ? "bg-btnColor__active" : "bg-btnColor__disable"
            } px-[1.4rem] py-[0.6rem]  rounded-full`}
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
}
