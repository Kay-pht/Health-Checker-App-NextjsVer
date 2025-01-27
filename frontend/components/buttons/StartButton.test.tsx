import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StartButton from "./StartButton";
import { useRouter } from "next/navigation";

jest.mock("next/navigation");
const user = userEvent.setup();

describe("StartButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("renders the button with correct text", () => {
    render(<StartButton />);
    const element = screen.getByRole("button");
    expect(element).toHaveTextContent("診断スタート");
  });

  it("calls useRouter.push when clicked", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    render(<StartButton />);
    await user.click(screen.getByRole("button"));
    expect(useRouter().push).toHaveBeenCalledWith("/login");
  });
});
