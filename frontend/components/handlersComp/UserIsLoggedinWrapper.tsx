"use client";

import { useUserIsLoggedin } from "@/hooks/useCheckIsLoggedin";

const UserIsLoggedinHandler = ({ children }: { children: React.ReactNode }) => {
  useUserIsLoggedin();
  return <>{children}</>;
};

export default UserIsLoggedinHandler;
