// Rebuilds build-log.json from the real board. Run from the repo root:
//   node src/data/refresh-build-log.mjs
// Needs the ./.fredrin/fredrin wrapper (a Fredrin ticket worktree).
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const run = (...args) =>
  JSON.parse(execFileSync("./.fredrin/fredrin", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }));

const SHORT = {
  "ABOU-D15BF4": "Project context",
  "ABOU-60C368": "Scaffold",
  "ABOU-298E1C": "Hero + time zone",
  "ABOU-96B452": "Shipped stories",
  "ABOU-888EBE": "Build replay",
  "ABOU-28BE62": "Why, Life, Contact",
  "ABOU-AE63D6": "Review line fix",
  "ABOU-A0F720": "Build log refresh",
};

const list = run("tickets", "list", "--all", "--json").data.items;
const out = [];
for (const item of list) {
  const t = run("tickets", "get", item.id).data;
  const pr = t.pullRequests?.[0];
  const status = (at, s) => (at ? [{ status: s, time: at }] : []);
  const moves = [
    ...status(t.createdAt, "backlog"),
    ...status(t.firstRunStartedAt, "running"),
    ...status(pr?.openedAt, "review"),
    ...status(t.completedAt ?? pr?.mergedAt, "done"),
  ].sort((a, b) => a.time.localeCompare(b.time));
  out.push({
    id: t.identifier,
    title: SHORT[t.identifier] ?? t.title,
    pr: pr?.url ?? null,
    moves,
  });
}
out.sort((a, b) => a.moves[0].time.localeCompare(b.moves[0].time));
writeFileSync(new URL("./build-log.json", import.meta.url), JSON.stringify(out, null, 2) + "\n");
console.log(`wrote ${out.length} tickets`);
