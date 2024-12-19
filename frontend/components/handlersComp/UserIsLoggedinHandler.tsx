"use client";

import { useUserIsLoggedin } from "@/hooks/useCheckIsLoggedin";

const UserIsLoggedinHandler = () => {
  useUserIsLoggedin();
  return null;
};

export default UserIsLoggedinHandler;
