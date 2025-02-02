import LandingPage from "@/app/page";
import { render } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe("LandingPage", () => {
  it("should render without crashing", () => {
    const { container } = render(<LandingPage />);
    expect(container).toMatchSnapshot();
  });
});
