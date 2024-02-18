"use client";
import "./tweet.css";
// zustand
import userInfoStore from "@/zustand/userInfoStore";
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

/*===============================================================================================*/
// main component section
/*===============================================================================================*/

export default function Tweet({ post, userId }) {
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
      <li className="flex px-[1.5rem] hover:bg-gray-900 py-[1rem] border border-gray-500">
        <div className="h-[3rem] min-w-[3rem] border-2 rounded-full mr-[1rem]"></div>
        {/*  */}
        <div className="w-full">
          {/* stage 1 */}
          <div className="flex justify-between">
            <div className="flex space-x-[1rem] items-center w-full">
              <h1 className="font-bold text-[1.2rem]">{post?.user?.name}</h1>
              <p className="userDetails">@{post?.user?.username}</p>
              <span className="userDetails">
                {formatTimeAgo(post?.user?.$updatedAt)}
              </span>
            </div>
            {post?.user.$id == userInformation.$id && (
              <Image
                onClick={() => alert("hello")}
                role="button"
                alt="logo"
                aria-label="open the edit post tab"
                src={edit_logo}
                height={10}
                width={10}
                className="h-[1.7rem] min-w-[1.7rem] rounded-full border-2 border-gray-600"
              />
            )}
          </div>
          {/*stage 2 */}
          <div className="mt-[1.2rem] mb-[1.4rem]">
            <p>{post?.textPost}</p>
          </div>
          {/* stage 3 */}
          <div className="flex space-x-[3.3rem]">
            <button className="flex space-x-[0.7rem]">
              <Image src={reply_logo} alt="logo" height={20} width={20} />
              <span>0</span>
            </button>
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
      </li>
    </>
  );
}
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
