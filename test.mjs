import assert from "node:assert";
import { generate, SETS } from "./gen.js";

const kinds = Object.keys(SETS);
for (let i = 0; i < 500; i++) {
  const p = generate(8, kinds);
  assert.equal(p.length, 8);
  for (const k of kinds) assert.ok([...p].some(c => SETS[k].includes(c)), `missing ${k}: ${p}`);
}
assert.equal(generate(30, ["digits"], true).replace(/[2-9]/g, ""), "");     // look-alikes gone when asked
assert.doesNotMatch(generate(200, kinds, true), /[lIO01]/);
assert.match(generate(200, ["digits"]), /[01]/);                            // ...present by default
assert.throws(() => generate(16, []));
assert.throws(() => generate(3, kinds));          // too short to hold all four sets

// rejection sampling shouldn't skew the pool: 10 digits, 40k draws, expect ~4k each
const counts = {};
for (let i = 0; i < 40000; i++) {
  const c = generate(1, ["digits"]);
  counts[c] = (counts[c] || 0) + 1;
}
for (const c of Object.values(counts)) assert.ok(Math.abs(c - 40000 / 10) < 700, JSON.stringify(counts));

console.log("ok");
