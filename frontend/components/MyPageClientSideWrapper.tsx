"use client";

import React from "react";
import FocusTopPageHandler from "./handlersComp/FocusTopPageHandler";
import UserIsLoggedinHandler from "./handlersComp/UserIsLoggedinHandler";

const MyPageClientSideWrapper = () => {
  return (
    <>
      <UserIsLoggedinHandler />
      <FocusTopPageHandler />
    </>
  );
};

export default MyPageClientSideWrapper;
