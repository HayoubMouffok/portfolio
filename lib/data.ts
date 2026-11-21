// Contenu du portfolio : tout le texte est ici, les composants ne font que l'afficher.

export const profile = {
  firstName: "Hayoub",
  lastName: "Mouffok",
  title: "Ingénieur DevOps, systèmes, réseaux et cybersécurité",
  tagline: "J'automatise les infrastructures, je les fais tourner et je les protège, du routage jusqu'au cluster.",
  intro:
    "3 ans et demi d'expérience en entreprise, un Master Réseaux et Objets Connectés au CNAM, et des projets où chaque résultat est mesuré. Basé en Île-de-France, disponible immédiatement.",
  email: "hayoub.mouffok@gmail.com",
  linkedin: "https://www.linkedin.com/in/hayoub-mouffok-47256b214",
  github: "https://github.com/HayoubMouffok",
  location: "Île-de-France",
  site: "https://hayoub-mouffok.netlify.app",
};

export const about = {
  paragraphs: [
    "J'ai commencé par le réseau : DUT Réseaux et Télécommunications, formation Cisco CCNA, puis une licence en administration et sécurité des systèmes. Chez Redpill, en alternance pendant deux ans et demi, j'ai administré la production Linux et AWS, mis en place les pipelines CI/CD et déployé en deux semaines un VPN pour 80 personnes, sans coupure.",
    "Au CNAM, j'ai consacré mon mémoire de Master à la sécurité de Kubernetes : détecter une attaque dans un conteneur et la bloquer automatiquement. Je l'ai depuis prolongé en un projet open source mesuré sur des attaques rejouées.",
    "Aujourd'hui, je cherche une équipe où réseau, systèmes, sécurité et automatisation se rencontrent. C'est là que je suis le plus utile : je comprends le paquet qui passe, le serveur qui le reçoit et le pipeline qui le déploie.",
  ],
  facts: [
    { value: "3 ans et demi", label: "d'expérience en entreprise" },
    { value: "Bac+5", label: "Master Réseaux et Objets Connectés, CNAM" },
    { value: "30 ms", label: "pour bloquer une attaque dans Kubernetes" },
    { value: "80", label: "personnes sur un VPN déployé sans coupure" },
  ],
};

export type SkillGroup = { id: string; name: string; icon: "network" | "server" | "shield" | "workflow"; summary: string; tools: string[] };

export const skills: SkillGroup[] = [
  { id: "devops", name: "DevOps et cloud", icon: "workflow", summary: "Pipelines, infrastructure as code et clusters.",
    tools: ["Kubernetes", "Docker", "Helm", "Argo CD", "Terraform", "Ansible", "GitLab CI", "Jenkins", "GitHub Actions", "AWS"] },
  { id: "reseau", name: "Réseaux", icon: "network", summary: "Du VLAN au datacenter EVPN.",
    tools: ["TCP/IP", "VLAN", "BGP", "OSPF", "EVPN-VXLAN", "OpenVPN", "Téléphonie IP", "NetBox"] },
  { id: "systemes", name: "Systèmes", icon: "server", summary: "Serveurs Linux et Windows en production.",
    tools: ["Linux Debian/Ubuntu", "Windows Server", "Active Directory", "Azure AD", "VMware", "Bash", "PowerShell", "Python"] },
  { id: "securite", name: "Cybersécurité", icon: "shield", summary: "Détecter, contenir, prouver.",
    tools: ["Falco", "KubeArmor", "Kyverno", "Trivy", "HashiCorp Vault", "Zero Trust", "Segmentation réseau", "MITRE ATT&CK"] },
];

export const observability = ["Prometheus", "Grafana", "ELK", "Zabbix", "Nagios"];

export type Project = {
  slug: string; name: string; kicker: string; description: string; result: string;
  stack: string[]; repo: string; preview: "fabric" | "k8s" | "gitops"; domain: string;
};

export const projects: Project[] = [
  {
    slug: "k8s-reponse-intrusions",
    name: "Réponse automatique aux intrusions Kubernetes",
    kicker: "Cybersécurité · Kubernetes",
    description:
      "Falco détecte une attaque dans un conteneur, un orchestrateur Python la classe selon MITRE ATT&CK et applique une politique KubeArmor, NetworkPolicy ou Kyverno ciblée sur le seul pod attaqué.",
    result: "6 attaques sur 6 bloquées, 0 faux positif, 30 ms de la détection au blocage.",
    stack: ["k3s", "Falco", "KubeArmor", "Kyverno", "Python", "Prometheus", "Grafana"],
    repo: "https://github.com/HayoubMouffok/k8s-adaptive-security-orchestrator",
    preview: "k8s",
    domain: "securite",
  },
  {
    slug: "reseau-datacenter",
    name: "Réseau datacenter automatisé",
    kicker: "Réseau · Automatisation",
    description:
      "Une fabric spine-leaf BGP et EVPN-VXLAN dont les configurations sont générées depuis NetBox, puis reconstruites et testées automatiquement à chaque modification.",
    result: "Sessions BGP, EVPN, ECMP et ping L2 vérifiés à chaque push.",
    stack: ["FRRouting", "EVPN-VXLAN", "NetBox", "containerlab", "pytest", "Robot Framework"],
    repo: "https://github.com/HayoubMouffok/evpn-vxlan-netdevops",
    preview: "fabric",
    domain: "reseau",
  },
  {
    slug: "k8s-gitops",
    name: "Plateforme Kubernetes GitOps",
    kicker: "DevOps · GitOps",
    description:
      "Terraform installe Argo CD, qui déploie depuis Git l'application, l'accès HTTPS, la supervision et les règles de sécurité. Chaque modification est testée sur un vrai cluster avant d'arriver en production.",
    result: "8 applications synchronisées, HTTPS automatique, images non conformes refusées.",
    stack: ["Terraform", "Argo CD", "Helm", "cert-manager", "Kyverno", "Trivy"],
    repo: "https://github.com/HayoubMouffok/k8s-gitops-platform",
    preview: "gitops",
    domain: "devops",
  },
];

export type Step = { period: string; title: string; place: string; text: string; kind: "pro" | "formation" | "projet" };

export const timeline: Step[] = [
  { period: "2026 — aujourd'hui", title: "Co-fondateur technique", place: "Haltere Ego", kind: "projet",
    text: "Application de suivi de musculation en bêta, conteneurisée et hébergée chez OVH. Je la fais évoluer à partir des retours des bêta-testeurs." },
  { period: "2024 — 2025", title: "Ingénieur chercheur, sécurité Kubernetes", place: "CNAM, Paris", kind: "pro",
    text: "Architecture de sécurité adaptative, de la détection à l'action : une réponse en 0,9 s au lieu d'environ 50 minutes à la main." },
  { period: "2023 — 2025", title: "Master Réseaux et Objets Connectés", place: "CNAM, Paris", kind: "formation",
    text: "Mémoire : orchestration dynamique de politiques de sécurité dans Kubernetes." },
  { period: "2022 — 2024", title: "Administrateur systèmes et réseaux", place: "Redpill, Paris", kind: "pro",
    text: "Production Linux et AWS, CI/CD avec GitLab CI et Jenkins, Ansible et Terraform, VPN pour 80 personnes, gestion des accès et des secrets." },
  { period: "2022 — 2023", title: "Licence pro Administration et sécurité des systèmes et réseaux", place: "Université Sorbonne Paris Nord", kind: "formation",
    text: "Administration système, sécurité des réseaux, services d'infrastructure." },
  { period: "2020", title: "Stage DSI, systèmes et téléphonie IP", place: "Mairie de Saint-Ouen", kind: "pro",
    text: "Active Directory, Azure AD, postes et lignes de téléphonie IP." },
  { period: "2020 — 2022", title: "DUT Réseaux et Télécommunications, CCNA 2", place: "Université Sorbonne Paris Nord", kind: "formation",
    text: "Les fondamentaux : routage, commutation, télécoms." },
];

export const nav = [
  { href: "#a-propos", label: "À propos" },
  { href: "#competences", label: "Compétences" },
  { href: "#projets", label: "Projets" },
  { href: "#parcours", label: "Parcours" },
  { href: "#contact", label: "Contact" },
];
