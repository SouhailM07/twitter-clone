import "./welcomepanel.css";

export default function WelcomePanel() {
  return (
    <div className="text-center ">
      <h1 className="text-[2rem] my-[1rem]">Welcome to Twitter</h1>
      <div className="font-medium space-x-[1rem]">
        <button className="bg-btnColor__disable px-[1.5rem] py-[0.8rem] rounded-full hover:bg-btnColor__active">
          Login
        </button>
        <button className="text-black bg-gray-200 rounded-full px-[1.5rem] py-[0.8rem] hover:bg-white">
          SignIn
        </button>
      </div>
    </div>
  );
}
