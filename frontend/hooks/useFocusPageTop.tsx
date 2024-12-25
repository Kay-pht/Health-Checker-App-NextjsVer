import { useEffect } from "react";
import { usePathname } from "next/navigation";

// URLパス変更が発生しないコンポーネント変更時にスクロール位置をトップに戻すロジック
export const useFocusTopComp = (someState: number) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [someState]);
};

//  URLパス変更が発生する場合にスクロール位置をトップに戻すロジック

export const useFocusTopPage = () => {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};
