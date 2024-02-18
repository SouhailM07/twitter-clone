"use client";
// hook
import { useState } from "react";
// zustand
// shadcn-ui
import { useToast } from "@/components/ui/use-toast";
// assets
import default_avatar from "@/public/newUserImage.png";
import { useRouter } from "next/navigation";
// zustand
import userInfoStore from "@/zustand/userInfoStore";
import repliesStore from "@/zustand/repliesStore";
// appwrite
import { appwriteKeys, db } from "@/appwrite";
import { ID } from "appwrite";
// assets
import Image from "next/image";
import like_logo_disable from "@/public/heart-regular.svg";
import like_logo_active from "@/public/heart-solid.svg";
import reply_logo from "@/public/comment-dots-regular.svg";
import postsStore from "@/zustand/postsStore";
import edit_logo from "@/public/ellipsis-vertical-solid.svg";
import arrow_logo from "@/public/arrow-left-solid.svg";

/*===============================================================================================*/
// main component section
/*===============================================================================================*/

export default function Replies() {
  let { selectedReply, replyUserId } = repliesStore((state) => state);
  const router = useRouter();
  //   handlers
  let handleBackArrow = () => router.push("/");
  return (
    <main className="w-full min-h-screen border border-gray-600">
      <div className="flex items-center border-b border-gray-600">
        <Image
          className="mx-[1rem]"
          src={arrow_logo}
          alt="logo"
          height={15}
          width={15}
          role="button"
          aria-label="btn to go back to home"
          onClick={handleBackArrow}
        />
        <h1 className="route__title border-none">Reply</h1>
      </div>
      <article>
        <Tweet post={selectedReply} userId={replyUserId} />
        <TweetPanel />
        <section>{/* replies */}</section>
      </article>
    </main>
  );
}

let Tweet = ({ post, userId }) => {
  let { editPosts } = postsStore((state) => state);
  let { userInformation } = userInfoStore((state) => state);

  // ! check if the user did liked this post before
  let checkedLike = () => {
    let didUserLiked = userId.likes.filter((e) => {
      return e.userId === userInformation.$id;
    });
    if (didUserLiked.length > 0) {
      return true;
    } else if (didUserLiked.length == 0) {
      return false;
    }
  };
  let getPosts = async () => {
    await db
      .listDocuments(appwriteKeys.db_id!, appwriteKeys.postsCollectionId!)
      .then((res) => {
        editPosts(res.documents);
        // console.log(res);
      });
  };

  let handleLike = async () => {
    if (!checkedLike() && post?.user.$id !== userInformation.$id) {
      await db
        .createDocument(
          appwriteKeys.db_id!,
          appwriteKeys.likesCollectionId!,
          ID.unique(),
          {
            post: userId.$id,
            userId: userInformation.$id,
          }
        )
        .then(() => getPosts());
    } else if (checkedLike()) {
      await db
        .getDocument(
          appwriteKeys.db_id!,
          appwriteKeys.postsCollectionId!,
          post?.$id
        )
        .then(async (res) => {
          return res?.likes.filter((e) => {
            return e.userId === userInformation.$id;
          });
        })
        .then(async (res) => {
          await db.deleteDocument(
            appwriteKeys.db_id!,
            appwriteKeys.likesCollectionId!,
            res[0].$id
          );
        })
        .then(() => getPosts());
    }
  };
  return (
    <>
      <section className="flex px-[1.5rem] py-[1rem] border border-gray-500">
        <div className="h-[3rem] min-w-[3rem] border-2 rounded-full mr-[1rem]"></div>
        {/*  */}
        <div className="w-full">
          {/* stage 1 */}
          <div className="flex space-x-[1rem] items-center w-full">
            <h1 className="font-bold text-[1.2rem]">{post?.user?.name}</h1>
            <p className="userDetails">@{post?.user?.username}</p>
            <span className="userDetails">
              {formatTimeAgo(post?.user?.$updatedAt)}
            </span>
          </div>
          {/*stage 2 */}
          <div className="mt-[1.2rem] mb-[1.4rem]">
            <p>{post?.textPost}</p>
          </div>
          {/* stage 3 */}
          <div className="flex space-x-[3.3rem]">
            <div className="flex space-x-[0.7rem]">
              <Image src={reply_logo} alt="logo" height={20} width={20} />
              <span>0</span>
            </div>
            <button className="flex space-x-[0.7rem]">
              <Image
                onClick={handleLike}
                src={checkedLike() ? like_logo_active : like_logo_disable}
                alt="logo"
                height={20}
                width={20}
              />
              <span>{post?.likes.length}</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
function formatTimeAgo(timestamp) {
  const date: any = new Date(timestamp);
  const now: any = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }
}

const TweetPanel = () => {
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
      <section className="p-[1rem] text-[1.3rem] border border-gray-500">
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
            Reply
          </button>
        </div>
      </section>
    </>
  );
};
