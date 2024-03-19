import { describe, it, expect } from "vitest";
import { utils, readFile } from "xlsx";
import { mapScoresToUsers, getHighscores } from "../src/helpers";
import scores from "../src/scores";
import users from "../src/users";

const initialExpected = {
  Jane: 988,
  Kim: 974,
  Barry: 742,
};

const xlsxExpected = {
  Steve: 989,
  Jane: 988,
  Anna: 983,
  Kim: 974,
  Pierce: 974,
  Alan: 961,
  Barry: 917,
  Hedvig: 903,
  Glen: 607,
};

describe("Score calculation", () => {
  it("handles scores calculation correctly", () => {
    const mapped = mapScoresToUsers(scores, users);
    const parsed = getHighscores(mapped);
    expect(parsed).toEqual(initialExpected);
  });

  it("handles excel parsing correctly", () => {
    const workbook = readFile("scores.xlsx");
    const sheetName = workbook.SheetNames[0];
    const xlsxData = utils.sheet_to_json(workbook.Sheets[sheetName]);
    const mergedData = [...mapScoresToUsers(scores, users), ...xlsxData];
    const parsed = getHighscores(mergedData);
    expect(parsed).toEqual(xlsxExpected);
  });
});
