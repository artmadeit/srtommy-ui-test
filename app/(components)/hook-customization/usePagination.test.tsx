import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { withOutSorting } from "../helpers/withOutSorting";
import { usePagination } from "./usePagination";

describe("usePagination", () => {
  it("starts on the first page with 25 rows", () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.paginationModel).toEqual({ pageSize: 25, page: 0 });
  });

  it("updates the model", () => {
    const { result } = renderHook(() => usePagination());

    act(() => result.current.setPaginationModel({ pageSize: 50, page: 2 }));

    expect(result.current.paginationModel).toEqual({ pageSize: 50, page: 2 });
  });
});

describe("withOutSorting", () => {
  it("disables sorting on the column", () => {
    expect(withOutSorting({ field: "name" })).toEqual({
      field: "name",
      sortable: false,
    });
  });
});
