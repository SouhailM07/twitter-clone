"use client";
//

import { useEffect } from "react";
// components
import EditProfilePanel from "@/components/EditProfilePanel/EditProfilePanel";
// zustand
import userInfoStore from "@/zustand/userInfoStore";
import toggleStore from "@/zustand/toggleStore";
// assets
import Image from "next/image";
import arrow_logo from "@/public/arrow-left-solid.svg";
import calendar_logo from "@/public/calendar-days-solid.svg";
import default_avatar from "@/public/newUserImage.png";

export default function Profile() {
  let userInformation = userInfoStore((state) => state.userInformation);
  let { toggleEditPanel, toggleEditPanel_f } = toggleStore((state) => state);
  // ! styling the date [start]
  const originalDate = userInformation?.$createdAt;
  const dateObj = new Date(originalDate);
  const options: any = { month: "long", year: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  // ! styling the date [end]
  useEffect(() => {
    console.log("check profile route render");
  }, [toggleEditPanel]);
  return (
    <main className="w-full min-h-screen border border-gray-600">
      <div className="flex items-center border-b border-gray-600">
        <Image
          className="mx-[1rem]"
          src={arrow_logo}
          alt="logo"
          height={15}
          width={15}
        />
        <h1 className="route__title border-none">{userInformation?.name}</h1>
      </div>
      <article className="border-2 border-red-500">
        <section className="border-2 border-green-500 h-[15rem]"></section>
        {/*  */}
        <section className="flex justify-between items-end translate-y-[-3.6rem]  pl-[1.5rem] pr-[1rem]">
          <div className="h-[7rem] w-[7rem] border-4  border-black rounded-full">
            <Image
              src={userInformation?.defaultAvatar ? default_avatar : ""}
              alt="avatar"
              width={100}
              height={100}
              className="h-full w-full rounded-full"
            />
          </div>
          <button
            onClick={() => toggleEditPanel_f(true)}
            className="text-black font-bold text-[1.2rem] rounded-full bg-white px-[1rem] py-[0.3rem]"
          >
            Edit
          </button>
        </section>
        {/* user details */}
        <section className="pl-[1rem] space-y-[1rem]">
          <h1 className="text-[1.8rem] font-bold">{userInformation?.name}</h1>
          <p className="userDetails">@{userInformation?.username}</p>
          <p className="font-bold">{userInformation?.description}</p>
          <div className="flex space-x-[1.5rem]">
            <Image src={calendar_logo} alt="logo" height={15} width={15} />
            <p className="userDetails">Joined {formattedDate}</p>
          </div>
          <div className="flex space-x-[2rem] capitalize font-bold text-[1.1rem]">
            <p className="userDetails">following 2</p>
            <p className="userDetails">followers 0</p>
          </div>
        </section>
        {/* this is a section for loading the user tweets */}
      </article>
      {toggleEditPanel && <EditProfilePanel />}
    </main>
  );
}
