// Terminal du portfolio. Sans JavaScript, toute la page reste lisible d'un bloc.
(() => {
  const doc = document.documentElement;
  doc.classList.add("js");
  const log = document.getElementById("log");
  const form = document.getElementById("prompt");
  const input = document.getElementById("cmd");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const blocks = Object.fromEntries([...log.querySelectorAll(".block[data-cmd]")].map(b => [b.dataset.cmd, b]));
  const aliases = { projects: "projets", ls: "help", "?": "help", skills: "stack", cv: "contact", about: "whoami" };
  const history = [];
  let hIndex = 0;

  Object.values(blocks).forEach(b => { b.hidden = true; });
  const sleep = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));

  async function typeInto(el, text, speed = 38) {
    if (reduce) { el.textContent = text; return; }
    el.classList.add("typing");
    for (const ch of text) { el.textContent += ch; await sleep(speed); }
    el.classList.remove("typing");
  }

  function line(html) {
    const p = document.createElement("p");
    p.className = "cmd";
    p.innerHTML = html;
    return p;
  }

  async function run(raw, { typed = true } = {}) {
    const name = raw.trim().toLowerCase();
    if (!name) return;
    history.push(name); hIndex = history.length;
    if (name === "clear") {
      [...log.children].forEach(c => { if (c.dataset.cmd) c.hidden = true; else if (c.classList.contains("echo")) c.remove(); });
      document.getElementById("boot").hidden = true;
      return;
    }
    const key = aliases[name] || name;
    const block = blocks[key];
    if (!block) {
      const wrap = document.createElement("section");
      wrap.className = "block echo";
      const cmd = line('<span class="ps1">hayoub@k8s-lab:~$</span> ');
      cmd.append(document.createTextNode(raw.trim()));
      const err = document.createElement("p");
      err.className = "dim";
      err.textContent = `${raw.trim()} : commande inconnue. Tapez help pour voir les commandes disponibles.`;
      wrap.append(cmd, err);
      log.append(wrap);
      wrap.scrollIntoView({ block: "start" });
      return;
    }
    const cmdLine = block.querySelector(".cmd");
    const c = cmdLine.querySelector(".c");
    const original = c.dataset.text || c.textContent;
    c.dataset.text = original;
    log.append(block);
    block.hidden = false;
    if (typed) {
      c.textContent = "";
      [...block.children].forEach(x => { if (x !== cmdLine) x.hidden = true; });
      block.scrollIntoView({ block: "start" });
      await typeInto(c, original, 28);
      await sleep(120);
      [...block.children].forEach(x => { x.hidden = false; x.classList.add("reveal"); });
    }
    block.scrollIntoView({ block: "start" });
  }

  document.querySelector(".cv-quick").addEventListener("click", e => { e.preventDefault(); run("contact"); });
  form.addEventListener("submit", e => { e.preventDefault(); const v = input.value; input.value = ""; run(v); });
  form.addEventListener("click", e => {
    const b = e.target.closest("button[data-run]");
    if (b) { run(b.dataset.run); input.focus({ preventScroll: true }); }
  });
  input.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && hIndex > 0) { hIndex--; input.value = history[hIndex]; e.preventDefault(); }
    if (e.key === "ArrowDown") { hIndex = Math.min(history.length, hIndex + 1); input.value = history[hIndex] || ""; e.preventDefault(); }
  });

  // Séquence d'ouverture : la seule animation non sollicitée du site.
  (async () => {
    const who = blocks.whoami;
    const cmdLine = who.querySelector(".cmd");
    const c = cmdLine.querySelector(".c");
    const text = c.textContent;
    c.dataset.text = text;
    c.textContent = "";
    who.hidden = false;
    [...who.children].forEach(x => { if (x !== cmdLine) x.hidden = true; });
    await sleep(500);
    await typeInto(c, text, 70);
    await sleep(200);
    for (const x of who.children) { if (x !== cmdLine) { x.hidden = false; x.classList.add("reveal"); await sleep(140); } }
    const wanted = decodeURIComponent(location.hash.slice(1));
    if (wanted) await run(wanted);
    if (matchMedia("(pointer: fine)").matches) input.focus({ preventScroll: true });
  })();
})();
