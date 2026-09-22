export const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/"
};

const LOOKALIKE = /[lIO01]/g;

// Unbiased pick: reject bytes in the ragged tail of the 0-255 range.
function randIndex(n) {
  const limit = 256 - (256 % n);
  const buf = new Uint8Array(1);
  for (;;) {
    crypto.getRandomValues(buf);
    if (buf[0] < limit) return buf[0] % n;
  }
}

// Returns a password of `length` with at least one char from every chosen set.
export function generate(length, kinds, avoidLookalikes = false) {
  const sets = kinds.map(k => avoidLookalikes ? SETS[k].replace(LOOKALIKE, "") : SETS[k]);
  if (!sets.length) throw new Error("pick at least one character set");
  if (length < sets.length) throw new Error("length too short for the chosen sets");

  const pool = sets.join("");
  const chars = sets.map(s => s[randIndex(s.length)]);
  while (chars.length < length) chars.push(pool[randIndex(pool.length)]);

  for (let i = chars.length - 1; i > 0; i--) {   // Fisher-Yates
    const j = randIndex(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}
