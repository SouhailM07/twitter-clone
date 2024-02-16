"use client";
import "./tweetpanel.css";
// hook
import { useState } from "react";
// zustand
import userInfoStore from "@/zustand/userInfoStore";
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
            onClick={() => console.log(tweet)}
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
