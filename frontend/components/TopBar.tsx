"use client";

import Link from "next/link";
import { auth, logOut } from "../services/firebase";
import { Avatar } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

const TopBar = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [userName, setUserName] = useState<string | null>("");
  const [userPhotoURL, setUserPhotoURL] = useState<string | null>("");

  useEffect(() => {
    if (loading) return;
    if (user) {
      setUserName(user.displayName || "ゲスト");
      setUserPhotoURL(user.photoURL || "");
    }
  }, [user, loading]);

  const handleLogout = async () => {
    await logOut();
    router.push("/login");
  };

  return (
    <div className="bg-blue-600 p-2 flex items-center justify-between ">
      <Link
        href={userName ? "/questionnaire" : "/"}
        className="flex justify-between ml-2"
      >
        <Image src="/images/logoWhite.png" alt="" width={28} height={18} />
        <h2 className="text-white md:text-xl text-base ml-1 font-extrabold">
          HealthChecker.app
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
                width={24}
                height={24}
              />
            ) : (
              <Avatar variant="circular" className="w-6 h-6" />
            )}
            <span className="text-white">{userName}</span>
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
