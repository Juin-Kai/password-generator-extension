import assert from "node:assert";
import { generate, SETS } from "./gen.js";

const kinds = Object.keys(SETS);
for (let i = 0; i < 500; i++) {
  const p = generate(8, kinds);
  assert.equal(p.length, 8);
  for (const k of kinds) assert.ok([...p].some(c => SETS[k].includes(c)), `missing ${k}: ${p}`);
}
assert.equal(generate(30, ["digits"]).replace(/[23456789]/g, ""), "");
assert.throws(() => generate(16, []));
assert.throws(() => generate(3, kinds));          // too short to hold all four sets
assert.notEqual(generate(20, kinds), generate(20, kinds));

// rejection sampling shouldn't skew the pool: 8 digits, 40k draws, expect ~5k each
const counts = {};
for (let i = 0; i < 40000; i++) {
  const c = generate(1, ["digits"]);
  counts[c] = (counts[c] || 0) + 1;
}
for (const c of Object.values(counts)) assert.ok(Math.abs(c - 40000 / 8) < 700, JSON.stringify(counts));

console.log("ok");
