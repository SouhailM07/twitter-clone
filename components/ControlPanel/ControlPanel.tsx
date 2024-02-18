"use client";
import "./controlpanel.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
// ? types
import { navLinks } from "@/types";
// assets
import twitter_logo from "@/public/x-twitter.svg";
import home_logo from "@/public/house-solid.svg";
import notification_logo from "@/public/bell-solid.svg";
import profile_logo from "@/public/user-solid.svg";
import logout_logo from "@/public/right-from-bracket-solid.svg";
// appwrite
import { logout } from "@/lib/api";
// zustand
import toggleStore from "@/zustand/toggleStore";

export default function ControlPanel() {
  let { toggleUserLoggedIn } = toggleStore((state) => state);
  let router = useRouter();
  let profileFunction = () => {
    if (toggleUserLoggedIn) router.push("/profile");
  };
  let homeFunction = () => {
    router.push("/");
  };
  let navLinks: navLinks[] = [
    {
      img: home_logo,
      label: "Home",
      link: "",
      navFunction: () => homeFunction(),
    },
    {
      img: notification_logo,
      label: "Notifications",
      link: "",
      navFunction: "",
    },
    {
      img: profile_logo,
      label: "Profile",
      link: "",
      navFunction: () => profileFunction(),
    },
    {
      img: logout_logo,
      label: "Logout",
      link: "",
      navFunction: async () => {
        console.log("logout");
        await toggleUserLoggedIn(false);
        await logout();
      },
    },
  ];
  return (
    <>
      <aside id="ControlPanel">
        <Image src={twitter_logo} alt="logo" height={32} width={32} />
        <ul className="space-y-[1.5rem] text-[1.2rem]">
          {navLinks.map((e, i) => {
            return (
              <NavLink
                key={i}
                img={e.img}
                label={e.label}
                link={e.link}
                navFunction={e.navFunction}
              />
            );
          })}
        </ul>
      </aside>
    </>
  );
}

let NavLink = ({ img, label, link, navFunction }: navLinks) => {
  return (
    <>
      <li
        onClick={() => navFunction()}
        className="hover:bg-gray-600 px-[1rem] h-[3.3rem] flex items-center rounded-full"
      >
        <Image src={img} alt="logo" height={25} width={25} />
        <p>{label}</p>
      </li>
    </>
  );
};
