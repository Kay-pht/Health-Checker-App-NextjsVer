import { render } from "@testing-library/react";
import ResultPage from "./page";

describe("ResultPage", () => {
  it("should render without crashing", () => {
    render(<ResultPage />);
  });
});
