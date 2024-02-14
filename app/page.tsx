// components
import TweetPanel from "@/components/TweetPanel/TweetPanel";
import WelcomePanel from "@/components/WelcomePanel/WelcomePanel";

export default function Home() {
  return (
    <main className="w-full min-h-screen border border-gray-600">
      <h1 className="route__title ">Home</h1>
      {/* <TweetPanel /> */}
      <WelcomePanel />
    </main>
  );
}
