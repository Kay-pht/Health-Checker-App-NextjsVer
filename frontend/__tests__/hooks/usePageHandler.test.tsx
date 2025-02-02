import usePageHandler from "@/hooks/usePageHandler";
import { renderHook } from "@testing-library/react";
import { act } from "react";

describe("usePageHandler", () => {
  const e = {
    preventDefault: jest.fn(),
  } as unknown as React.MouseEvent<HTMLButtonElement>;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should use pageUpHandler correctly", () => {
    const { result } = renderHook(() => usePageHandler());
    expect(result.current.currentPageNum).toBe(1);
    act(() => {
      result.current.pageUpHandler(e);
    });
    // pageUpHandler(e);
    expect(result.current.currentPageNum).toBe(2);
  });

  it("should use pageDownHandler correctly", () => {
    const { result } = renderHook(() => usePageHandler());
    expect(result.current.currentPageNum).toBe(1);
    act(() => {
      result.current.pageDownHandler(e);
    });
    expect(result.current.currentPageNum).toBe(0);
  });
});
