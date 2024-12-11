"use client";
import { useFocusTopComp } from "../../hooks/useFocusPageTop";

const FocusTopCompHandler = (someState: number) => {
  useFocusTopComp(someState);
  return null;
};

export default FocusTopCompHandler;
