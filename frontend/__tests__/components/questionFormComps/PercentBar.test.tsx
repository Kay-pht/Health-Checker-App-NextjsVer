import PercentBar from "@/components/questionFormComps/PercentBar";
import { render, screen } from "@testing-library/react";

describe("PercentBar", () => {
  it("should render the percentage correctly", () => {
    render(<PercentBar percent={50} />);
    const percentageElement = screen.getByText("50%");
    expect(percentageElement).toBeInTheDocument();
  });

  // TODO: test UI bar percentage
  it("should render the bar correctly", () => {
    render(<PercentBar percent={50} />);
    const barElement = screen.getByRole("progressbar");
    expect(barElement).toBeInTheDocument();
    expect(barElement.style.width).toBe("50%");
  });
});
