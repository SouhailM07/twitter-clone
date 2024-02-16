"use client";
//

// import { useEffect } from "react";
// zustand
import userInfoStore from "@/zustand/userInfoStore";
// assets
import Image from "next/image";
import arrow_logo from "@/public/arrow-left-solid.svg";
import calendar_logo from "@/public/calendar-days-solid.svg";

export default function Profile() {
  let userInformation = userInfoStore((state) => state.userInformation);
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
          <div className="h-[7rem] w-[7rem] bg-blue-500 rounded-full"></div>
          <button className="text-black font-bold text-[1.2rem] rounded-full bg-white px-[1rem] py-[0.3rem]">
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
            <p className="userDetails">Joined {userInformation?.$createdAt}</p>
          </div>
          <div className="flex space-x-[2rem] capitalize font-bold text-[1.1rem]">
            <p className="userDetails">following 2</p>
            <p className="userDetails">followers 0</p>
          </div>
        </section>
        {/* this is a section for loading the user tweets */}
      </article>
    </main>
  );
}
