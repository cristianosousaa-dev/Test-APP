/** Prefixes that look like ticket keys in branch names but are conventions or units. */
const NOT_TICKET_PREFIXES = new Set([
  "bug",
  "bugfix",
  "build",
  "chore",
  "ci",
  "day",
  "dependabot",
  "deps",
  "docs",
  "feat",
  "feature",
  "fix",
  "hotfix",
  "http",
  "iso",
  "issue",
  "part",
  "perf",
  "phase",
  "refactor",
  "release",
  "renovate",
  "revert",
  "rfc",
  "sha",
  "sprint",
  "step",
  "style",
  "test",
  "tests",
  "tls",
  "utf",
  "version",
  "week",
  "wip",
]);

const UPPER_KEY = /\b([A-Z][A-Z0-9]{1,9})-(\d{1,6})\b/g;
const ANY_CASE_KEY = /(?:^|[/_\s[])([a-z][a-z0-9]{1,9})-(\d{1,6})(?=$|[/_\-\s\]])/gi;

function firstKey(text: string, pattern: RegExp): string | null {
  for (const match of text.matchAll(pattern)) {
    const [, prefix, num] = match;
    if (prefix && num && !NOT_TICKET_PREFIXES.has(prefix.toLowerCase())) {
      return `${prefix.toUpperCase()}-${num}`;
    }
  }
  return null;
}

/** Extracts a Linear/Jira-style key (e.g. `ABC-123`) from a PR title or branch name. */
export function parseTicketKey(text: string): string | null {
  return firstKey(text, UPPER_KEY) ?? firstKey(text, ANY_CASE_KEY);
}

/** Turns `feat/abc-123-add-login` into `Add login`. Falls back to the ticket key. */
export function humanizeBranch(branch: string): string {
  const segment = branch.split("/").filter(Boolean).at(-1) ?? branch;
  const key = parseTicketKey(segment);
  const withoutKey = key
    ? segment.replace(new RegExp(`(^|[-_])${key}(?=$|[-_])`, "i"), "$1")
    : segment;
  const words = withoutKey.split(/[-_]+/).filter(Boolean).join(" ");
  if (!words) return key ?? segment;
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** "@a", "@a and @b", "@a, @b and @c". */
export function mentionList(logins: readonly string[]): string {
  const mentions = logins.map((l) => `@${l}`);
  if (mentions.length <= 1) return mentions.join("");
  return `${mentions.slice(0, -1).join(", ")} and ${mentions.at(-1)}`;
}
