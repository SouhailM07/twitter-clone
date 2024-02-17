import "./home.css";
// components
import TweetPanel from "@/components/TweetPanel/TweetPanel";
import Tweet from "../Tweet/Tweet";
export default function HomeContainer() {
  return (
    <>
      <TweetPanel />
      <Tweet />
    </>
  );
}
