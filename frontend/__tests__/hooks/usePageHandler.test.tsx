import usePageHandler from "@/hooks/usePageHandler";
import { renderHook } from "@testing-library/react";
import { act } from "react";

describe("usePageHandler", () => {
  const { result } = renderHook(() => usePageHandler());
  it("should use pageUpHandler correctly", () => {
    expect(result.current.currentPageNum).toBe(1);
    const e = {
      preventDefault: jest.fn(),
    } as unknown as React.MouseEvent<HTMLButtonElement>;
    act(() => {
      result.current.pageUpHandler(e);
    });
    // pageUpHandler(e);
    expect(result.current.currentPageNum).toBe(2);
  });
});
