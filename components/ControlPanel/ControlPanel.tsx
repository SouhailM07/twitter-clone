"use client";
import "./controlpanel.css";
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
  let navLinks: navLinks[] = [
    { img: home_logo, label: "Home", link: "", navFunction: "" },
    {
      img: notification_logo,
      label: "Notifications",
      link: "",
      navFunction: "",
    },
    { img: profile_logo, label: "Profile", link: "", navFunction: "" },
    {
      img: logout_logo,
      label: "Logout",
      link: "",
      navFunction: () => {
        toggleUserLoggedIn(false);
        logout();
      },
    },
  ];
  return (
    <>
      <aside id="ControlPanel">
        <Image src={twitter_logo} alt="logo" height={32} width={32} />
        <ul className="space-y-[2rem] text-[1.2rem]">
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
      <li>
        <Image src={img} alt="logo" height={25} width={25} />
        <p onClick={() => navFunction()}>{label}</p>
      </li>
    </>
  );
};
