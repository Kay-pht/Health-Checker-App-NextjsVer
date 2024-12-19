"use client";

import { useUserIsLoggedin } from "@/hooks/useCheckIsLoggedin";

const UserIsLoggedinHandler = ({ path }: { path: string }) => {
  useUserIsLoggedin(path);
  return null;
};

export default UserIsLoggedinHandler;
