import { describe, expect, it } from "vitest";
import { humanizeBranch, parseTicketKey } from "../src/index.ts";

describe("parseTicketKey", () => {
  it.each([
    ["feat/abc-123-login", "ABC-123"],
    ["hotfix/PAY-9", "PAY-9"],
    ["[ENG-42] Fix flaky test", "ENG-42"],
    ["eng-7", "ENG-7"],
  ])("%s → %s", (input, key) => {
    expect(parseTicketKey(input)).toBe(key);
  });

  it.each(["fix-123-crash", "release-2026", "feature/v-2", "main", "update-deps"])(
    "%s has no ticket key",
    (input) => {
      expect(parseTicketKey(input)).toBeNull();
    },
  );
});

describe("humanizeBranch", () => {
  it.each([
    ["feat/abc-123-login", "Login"],
    ["fix/flaky_checkout-test", "Flaky checkout test"],
    ["alice/add-github-sign-in", "Add github sign in"],
    ["ENG-7", "ENG-7"],
  ])("%s → %s", (input, title) => {
    expect(humanizeBranch(input)).toBe(title);
  });
});
