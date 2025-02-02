import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogInWithGoogleButton from "@/components/buttons/LogInWithGoogleButton";
import { signInWithPopup } from "firebase/auth";
import { logOut } from "@/services/firebase";

const user = userEvent.setup();

jest.mock("firebase/auth");
jest.mock("../../../services/firebase");

describe("LogInWithGoogleButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("renders the button with correct text for login", () => {
    render(<LogInWithGoogleButton register={false} />);
    expect(screen.getByText("Googleでログイン")).toBeInTheDocument();
  });

  it("renders the button with correct text for registration", () => {
    render(<LogInWithGoogleButton register={true} />);
    expect(screen.getByText("Googleで登録")).toBeInTheDocument();
  });

  it("calls signInWithPopup when clicked", async () => {
    (signInWithPopup as jest.Mock).mockResolvedValue({});
    render(<LogInWithGoogleButton register={true} />);
    await user.click(screen.getByText("Googleで登録"));
    expect(screen.getByText("Googleで登録")).toBeInTheDocument();
    expect(signInWithPopup).toHaveBeenCalled();
  });

  it("calls logOut when failed to login", async () => {
    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
    (signInWithPopup as jest.Mock).mockRejectedValue(new Error("Login failed"));
    (logOut as jest.Mock).mockResolvedValue({});

    render(<LogInWithGoogleButton register={true} />);
    await user.click(screen.getByText("Googleで登録"));
    expect(logOut).toHaveBeenCalled();
    expect(mockAlert).toHaveBeenCalledWith("Error logging in: Login failed");
  });
});
