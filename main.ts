// One-Liner Marathon entry: a secret that travels through the kitchen.
// The joke is a chain of confidants — each appliance passes the secret on,
// and the punchline lands on the last, smallest one in the chain.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";

const confidants = ["smart speaker", "fridge", "TV"];

const opener = `I told my ${confidants[0]} a secret.`;
const chain = confidants
  .slice(1)
  .map((who, i) => {
    const from = i === 0 ? "It" : `The ${confidants[i]}`;
    return `${from} told the ${who}.`;
  })
  .join(" ");
const closer =
  "Now my toaster knows, and it has started burning my bread on purpose.";

const line = [opener, chain, closer].join(" ");

if (line.length < 1 || line.length > 280 || line.trim() !== line) {
  throw new Error(`entry must be a single line of 1-280 chars, got ${line.length}`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
console.log(`wrote entry.txt (${line.length} chars)`);
