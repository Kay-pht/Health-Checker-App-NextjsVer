import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogInWithGoogleButton from "@/components/buttons/LogInWithGoogleButton";
import { signInWithGoogle } from "@/services/auth";

const user = userEvent.setup();

jest.mock("../../../services/auth.ts");
jest.mock("../../../services/firebase.ts");

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
    (signInWithGoogle as jest.Mock).mockResolvedValue({});
    render(<LogInWithGoogleButton register={true} />);
    await user.click(screen.getByText("Googleで登録"));
    expect(screen.getByText("Googleで登録")).toBeInTheDocument();
    expect(signInWithGoogle).toHaveBeenCalled();
  });

  it("calls logOut when failed to login", async () => {
    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
    (signInWithGoogle as jest.Mock).mockRejectedValue(
      new Error("Login failed")
    );

    render(<LogInWithGoogleButton register={true} />);
    await user.click(screen.getByText("Googleで登録"));
    expect(mockAlert).toHaveBeenCalledWith(
      "Error logging in: Error: Login failed"
    );
  });
});
