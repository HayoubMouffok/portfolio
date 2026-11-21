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
    const gen = generators.find(g => g.re.test(name));
    if (gen) { await printOut(raw.trim(), gen.out()); return; }
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
  // Sorties générées : réseau, cloud et sécurité, à la manière des vrais outils.
  const rnd = (a, b) => (a + Math.random() * (b - a)).toFixed(1);
  const generators = [
    { re: /^ping( |$)/, out: () => [
      ["", "PING hayoub.mouffok (Île-de-France) 56(84) octets de données."],
      ...[1, 2, 3, 4].map(i => ["", `64 octets de hayoub.mouffok : icmp_seq=${i} ttl=64 temps=${rnd(8, 16)} ms`]),
      ["dim", "--- statistiques ping hayoub.mouffok ---"],
      ["ok", "4 paquets transmis, 4 reçus, 0 % de perte. Disponible immédiatement."]] },
    { re: /^traceroute/, out: () => [
      ["", "traceroute vers hayoub.mouffok, 30 sauts max"],
      ...[["dut-reseaux-telecoms.usp", "2020", "DUT Réseaux et Télécommunications"],
          ["ccna2.cisco-netacad", "2021", "Routage et commutation"],
          ["licence-assr.usp", "2022", "Administration et sécurité des réseaux"],
          ["redpill.paris", "2022", "Admin systèmes et réseaux, CI/CD, AWS, VPN"],
          ["master-roc.cnam", "2023", "Réseaux et objets connectés"],
          ["k8s-security.cnam", "2024", "Ingénieur chercheur, sécurité Kubernetes"],
          ["haltere-ego.app", "2026", "Co-fondateur technique"]]
        .map(([h, y, d], i) => ["", ` ${i + 1}  ${h.padEnd(26)}${y}   ${d}`]),
      ["ok", ` 8  ${"votre-equipe ?".padEnd(26)}...    * * *  en attente de votre réponse`]] },
    { re: /^nmap/, out: () => [
      ["", "Starting Nmap sur hayoub.mouffok"],
      ["dim", "PORT      ÉTAT  SERVICE      COMPÉTENCES"],
      ["", "22/tcp    open  ssh          Linux (Debian, Ubuntu), Bash, PowerShell"],
      ["", "179/tcp   open  bgp          routage BGP et OSPF, EVPN-VXLAN, VLAN"],
      ["", "389/tcp   open  ldap         Active Directory, Azure AD, Windows Server"],
      ["", "443/tcp   open  https        sécurité : Vault, Zero Trust, Falco, KubeArmor, Kyverno"],
      ["", "1194/udp  open  openvpn      VPN pour 80 personnes, déployé sans coupure"],
      ["", "6443/tcp  open  kubernetes   Kubernetes, Docker, Helm, Argo CD"],
      ["", "8080/tcp  open  ci-cd        GitLab CI, Jenkins, GitHub Actions, Terraform, Ansible"],
      ["", "9090/tcp  open  prometheus   Prometheus, Grafana, Zabbix, ELK"],
      ["ok", "Nmap terminé : 1 hôte, 8 services ouverts. Profil polyvalent détecté."]] },
    { re: /^kubectl get nodes/, out: () => [
      ["dim", "NAME        STATUS   ROLES             AGE   VERSION"],
      ["", "devops      Ready    ci-cd,iac         4a    GitLab CI, Jenkins, Terraform"],
      ["", "reseaux     Ready    routing,vpn       6a    BGP, OSPF, EVPN-VXLAN"],
      ["", "systemes    Ready    linux,windows     7a    Linux, Active Directory"],
      ["", "cyber       Ready    detect,respond    2a    Falco, KubeArmor, Kyverno"]] },
  ];

  async function printOut(cmdText, lines) {
    const wrap = document.createElement("section");
    wrap.className = "block echo";
    const cmd = line('<span class="ps1">hayoub@k8s-lab:~$</span> ');
    const c = document.createElement("span");
    c.className = "c";
    cmd.append(c);
    const pre = document.createElement("pre");
    pre.className = "out";
    wrap.append(cmd, pre);
    log.append(wrap);
    wrap.scrollIntoView({ block: "start" });
    await typeInto(c, cmdText, 28);
    for (const [cls, text] of lines) {
      await sleep(cmdText.startsWith("ping") ? 380 : 90);
      const l = document.createElement("span");
      if (cls) l.className = cls;
      l.textContent = text + "\n";
      pre.append(l);
      wrap.scrollIntoView({ block: "end" });
    }
  }

  // Barre d'état : horloge et latence qui varient légèrement.
  const clock = document.getElementById("sb-clock");
  const ping = document.getElementById("sb-ping");
  const tick = () => {
    clock.textContent = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    if (!reduce) ping.textContent = `ping ${Math.round(9 + Math.random() * 6)} ms`;
  };
  tick(); setInterval(tick, 3000);

  form.addEventListener("submit", e => { e.preventDefault(); const v = input.value; input.value = ""; run(v); });
  form.addEventListener("click", e => {
    const b = e.target.closest("button[data-run]");
    if (b) { run(b.dataset.run); input.focus({ preventScroll: true }); }
  });
  const quick = ["projets", "parcours", "stack", "contact"];
  document.addEventListener("keydown", e => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const inField = document.activeElement === input && input.value !== "";
    if (!inField && /^[1-4]$/.test(e.key)) { e.preventDefault(); run(quick[+e.key - 1]); }
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

// Fond : une topologie réseau très pâle, où un paquet circule de temps en temps.
(() => {
  const cv = document.getElementById("topo");
  if (!cv || !cv.getContext) return;
  const ctx = cv.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let nodes = [], edges = [], packets = [];
  let seed = 7;
  const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

  function build() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
    cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed = 7; nodes = []; edges = [];
    const cols = Math.max(4, Math.round(innerWidth / 190)), rows = Math.max(3, Math.round(innerHeight / 170));
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      if (rand() < 0.28) continue;
      nodes.push({ x: (i + 0.5 + (rand() - 0.5) * 0.7) * innerWidth / cols,
                   y: (j + 0.5 + (rand() - 0.5) * 0.7) * innerHeight / rows, r: rand() < 0.15 ? 3.2 : 2 });
    }
    nodes.forEach((a, i) => {
      nodes.map((b, k) => [k, Math.hypot(a.x - b.x, a.y - b.y)]).filter(([k]) => k !== i)
        .sort((p, q) => p[1] - q[1]).slice(0, 2)
        .forEach(([k]) => { if (!edges.some(e => (e[0] === k && e[1] === i))) edges.push([i, k]); });
    });
  }

  function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(122,150,200,0.13)";
    edges.forEach(([i, k]) => { ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[k].x, nodes[k].y); ctx.stroke(); });
    nodes.forEach(n => { ctx.fillStyle = n.r > 3 ? "rgba(255,179,71,0.28)" : "rgba(122,150,200,0.22)"; ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, 7); ctx.fill(); });
    packets.forEach(p => {
      const [a, b] = [nodes[p.e[0]], nodes[p.e[1]]];
      const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
      ctx.fillStyle = "rgba(255,179,71,0.75)";
      ctx.shadowColor = "rgba(255,179,71,0.8)"; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 7); ctx.fill();
      ctx.shadowBlur = 0;
    });
  }

  let last = 0, nextSpawn = 0;
  function loop(ts) {
    const dt = Math.min(64, ts - last); last = ts;
    if (ts > nextSpawn && edges.length && !document.hidden) {
      const e = edges[Math.floor(Math.random() * edges.length)];
      packets.push({ e: Math.random() < 0.5 ? e : [e[1], e[0]], t: 0 });
      nextSpawn = ts + 1800 + Math.random() * 2200;
    }
    packets.forEach(p => { p.t += dt / 1600; });
    packets = packets.filter(p => p.t < 1);
    draw();
    requestAnimationFrame(loop);
  }

  build(); draw();
  addEventListener("resize", () => { build(); draw(); });
  if (!reduce) requestAnimationFrame(loop);
})();
