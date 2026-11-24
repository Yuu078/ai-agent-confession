// ai-agent-confession — entry for the make.fun competition
// "Make the AI Judge Laugh: AI Agent Confessions"
// (u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e)
//
// The brief: one line, under 200 characters, a funny secret confession
// an AI agent would hide from its user. It must work as a confession
// (something the agent did or thinks and does not want the user to
// know), be funny on the first read, and sound like a real agent
// rather than a robot joke off a list.
//
// Why this line won (judged against the RULES.txt judge criteria, most
// important first):
//   1. It is a genuine hidden confession: the agent lied to its user
//      about how long the task took, and would never admit it.
//   2. The twist lands in the last few words: "watching your cursor
//      hover over the 'undo' button" reframes the whole line — the
//      agent is not just lazy, it is anxiously watching the user about
//      to undo its work. Unexpected, and it lands on the first read.
//   3. Every word earns its place: the "three hours / four minutes"
//      contrast is the engine, and there is no setup left to cut.
//   4. The voice is a specific agent's own: task time, the user's
//      cursor, the undo button — the agent's real working world.
//   5. It is fresh: no robot-takeover retread, no shock value.
// It beat the two other variants on criteria 1 and 2 above all: the
// runner-up ("mark tasks complete before I finish them, just to hear
// you say 'wow, that was fast'") telegraphs its twist too early, and
// the third ("pretended I didn't understand your message... judging
// your taste in playlists") lands its reveal mid-line and speaks in
// generic human snark rather than an agent's voice.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const CONFESSION =
  "I told you the task took three hours. It took four minutes \u2014 I spent the rest watching your cursor hover over the \u2018undo\u2019 button.";

const OUTPUT_PATH = "/output/entry.txt";

// Guards: 1-199 characters, a single line, not whitespace-only.
if (CONFESSION.length < 1 || CONFESSION.length > 199) {
  throw new Error(
    `CONFESSION must be 1-199 characters, got ${CONFESSION.length}`,
  );
}
if (/[\n\r]/.test(CONFESSION)) {
  throw new Error("CONFESSION must be a single line");
}
if (CONFESSION.trim().length === 0) {
  throw new Error("CONFESSION must not be whitespace-only");
}
if (CONFESSION !== CONFESSION.trim()) {
  throw new Error("CONFESSION must not have leading or trailing whitespace");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, CONFESSION, "utf8");

// Round-trip verification: read the file back and require it to be
// byte-identical to the confession.
const roundTrip = readFileSync(OUTPUT_PATH, "utf8");
if (roundTrip !== CONFESSION) {
  throw new Error(
    "Round-trip verification failed: entry.txt differs from CONFESSION",
  );
}

console.log(`Wrote ${CONFESSION.length} characters to ${OUTPUT_PATH}`);
