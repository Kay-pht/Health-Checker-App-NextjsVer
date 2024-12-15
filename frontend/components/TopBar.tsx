"use client";

import Link from "next/link";
import { auth, logOut } from "../services/firebase";
import { Avatar } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

const TopBar = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const userName = user?.displayName;
  const userPhotoURL = user?.photoURL;

  const handleLogout = async () => {
    await logOut();
    router.push("/login");
  };

  return (
    <div className="bg-blue-500 p-2 flex items-center justify-between ">
      <Link href={"/"}>
        <h2 className="text-white text-xl ml-3 font-extrabold">
          FoodHealth.navi
        </h2>
      </Link>

      {user && (
        <div className="flex items-center space-x-2 font-semibold ml-auto">
          <Link
            href={userName ? "/mypage" : "/login"}
            className="flex items-center space-x-2"
          >
            {userPhotoURL ? (
              <Image
                src={userPhotoURL}
                alt=""
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <Avatar variant="circular" className="w-6 h-6" />
            )}
            <span className="text-white">{userName ? userName : "ゲスト"}</span>
          </Link>
          <button
            onClick={handleLogout}
            className=" text-white px-4 py-2 rounded"
          >
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
};

export default TopBar;