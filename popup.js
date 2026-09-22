import { generate, SETS } from "./gen.js";

const $ = id => document.getElementById(id);
const len = $("len"), num = $("num"), out = $("out"), err = $("err");
const kinds = Object.keys(SETS);
const copy = $("copy");

function refresh() {
  err.textContent = "";
  try {
    out.value = generate(+len.value, kinds.filter(k => $(k).checked));
  } catch (e) {
    out.value = "";
    err.textContent = e.message;
  }
}

// Slider and number box are two views of one value.
len.oninput = () => { num.value = len.value; refresh(); };
num.oninput = () => {
  if (num.value === "") return;                 // let them clear it mid-typing
  len.value = num.value = Math.min(+len.max, Math.max(+len.min, +num.value));
  refresh();
};
num.onblur = () => { num.value = len.value; };  // snap back if left empty/invalid

copy.onclick = async () => {
  if (!out.value) return;
  await navigator.clipboard.writeText(out.value);
  copy.style.color = "#6ea8fe";
  setTimeout(() => (copy.style.color = ""), 800);
};

$("regen").onclick = refresh;
kinds.forEach(k => ($(k).onchange = refresh));
refresh();
