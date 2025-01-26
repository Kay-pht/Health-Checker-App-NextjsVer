import { render, screen } from "@testing-library/react";
import LogInWithGoogleButton from "./LogInWithGoogleButton"; // パスは適宜変更してください
// import { signInWithPopup } from "firebase/auth";

describe("LogInWithGoogleButton", () => {
  it("renders correctly", () => {
    render(<LogInWithGoogleButton register={false} />);
    expect(screen.getByText("Googleでログイン")).toBeInTheDocument();
  });
  it("renders correctly", () => {
    render(<LogInWithGoogleButton register={true} />);
    expect(screen.getByText("Googleで登録")).toBeInTheDocument();
  });
});
