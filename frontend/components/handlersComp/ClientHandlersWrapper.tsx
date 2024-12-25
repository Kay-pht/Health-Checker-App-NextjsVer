"use client";

import { useFocusTopPage } from "@/hooks/useFocusPageTop";
import { useUserIsLoggedin } from "@/hooks/useCheckIsLoggedin";

const ClientHandlersWrapper = ({ children }: { children: React.ReactNode }) => {
  useFocusTopPage();
  useUserIsLoggedin();
  return <>{children}</>;
};

export default ClientHandlersWrapper;
