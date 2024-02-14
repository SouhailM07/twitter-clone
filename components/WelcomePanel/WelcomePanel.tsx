"use client";
import "./welcomepanel.css";
// zustand
import toggleStore from "@/zustand/toggleStore";
// components
import LoginPanel from "@/components/LoginPanel/LoginPanel";
import SignInPanel from "../SignInPanel/SignInPanel";

export default function WelcomePanel() {
  let { toggleLogin_f, toggleLogin, toggleSignIn, toggleSignIn_f } =
    toggleStore((state) => state);
  let handleLogin = () => toggleLogin_f(true);
  let handleSignIn = () => toggleSignIn_f(true);
  return (
    <>
      <article className="text-center ">
        <h1 className="text-[2rem] my-[1rem]">Welcome to Twitter</h1>
        <section className="font-medium space-x-[1rem]">
          <button
            onClick={handleLogin}
            className="bg-btnColor__disable px-[1.5rem] py-[0.8rem] rounded-full hover:bg-btnColor__active"
          >
            Login
          </button>
          <button
            onClick={handleSignIn}
            className="text-black bg-gray-200 rounded-full px-[1.5rem] py-[0.8rem] hover:bg-white"
          >
            SignIn
          </button>
        </section>
      </article>
      {toggleLogin && <LoginPanel />}
      {toggleSignIn && <SignInPanel />}
    </>
  );
}
