// Aperçus des projets, dessinés aux couleurs du thème (sombre comme clair).

export function FabricPreview() {
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label="Topologie spine-leaf : deux spines, deux leafs et un tunnel VXLAN entre deux hôtes">
      <g stroke="var(--muted)" strokeOpacity=".5" strokeWidth="1.2">
        <line x1="120" y1="72" x2="120" y2="150" /><line x1="120" y1="72" x2="280" y2="150" />
        <line x1="280" y1="72" x2="120" y2="150" /><line x1="280" y1="72" x2="280" y2="150" />
        <line x1="120" y1="170" x2="120" y2="206" /><line x1="280" y1="170" x2="280" y2="206" />
      </g>
      <path d="M150 168 C 190 196, 210 196, 250 168" fill="none" stroke="var(--accent-2)" strokeWidth="2" strokeDasharray="5 5">
        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.2s" repeatCount="indefinite" />
      </path>
      {[[120, 60, "spine1"], [280, 60, "spine2"]].map(([x, y, t]) => (
        <g key={t as string}><rect x={(x as number) - 46} y={(y as number) - 14} width="92" height="28" rx="7" fill="var(--surface)" stroke="var(--accent)" />
          <text x={x} y={(y as number) + 5} textAnchor="middle" fontSize="13" fill="var(--text)" fontFamily="var(--font-mono)">{t}</text></g>
      ))}
      {[[120, 160, "leaf1"], [280, 160, "leaf2"]].map(([x, y, t]) => (
        <g key={t as string}><rect x={(x as number) - 46} y={(y as number) - 14} width="92" height="28" rx="7" fill="var(--surface)" stroke="var(--line)" />
          <text x={x} y={(y as number) + 5} textAnchor="middle" fontSize="13" fill="var(--text)" fontFamily="var(--font-mono)">{t}</text></g>
      ))}
      {[[120, 220, "host1"], [280, 220, "host2"]].map(([x, y, t]) => (
        <g key={t as string}><rect x={(x as number) - 34} y={(y as number) - 12} width="68" height="24" rx="6" fill="none" stroke="var(--line)" />
          <text x={x} y={(y as number) + 4} textAnchor="middle" fontSize="11" fill="var(--muted)" fontFamily="var(--font-mono)">{t}</text></g>
      ))}
      <text x="200" y="208" textAnchor="middle" fontSize="11" fill="var(--accent-2)" fontFamily="var(--font-mono)">VXLAN 100</text>
      <text x="200" y="118" textAnchor="middle" fontSize="10" fill="var(--muted)" fontFamily="var(--font-mono)">eBGP · ECMP · EVPN</text>
    </svg>
  );
}

export function GitopsPreview() {
  const apps = ["cert-manager", "ingress-nginx", "Kyverno", "Prometheus", "app durcie"];
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label="Chaîne GitOps : git push, CI, Terraform, Argo CD puis cinq applications synchronisées">
      <g fontFamily="var(--font-mono)" fontSize="12">
        <rect x="20" y="40" width="96" height="30" rx="7" fill="var(--surface)" stroke="var(--line)" /><text x="68" y="60" textAnchor="middle" fill="var(--text)">git push</text>
        <rect x="20" y="150" width="96" height="30" rx="7" fill="var(--surface)" stroke="var(--line)" /><text x="68" y="170" textAnchor="middle" fill="var(--text)">Terraform</text>
        <rect x="140" y="40" width="96" height="30" rx="7" fill="var(--surface)" stroke="var(--line)" /><text x="188" y="60" textAnchor="middle" fill="var(--text)">CI · Trivy</text>
        <rect x="140" y="150" width="96" height="30" rx="7" fill="var(--surface)" stroke="var(--accent)" /><text x="188" y="170" textAnchor="middle" fill="var(--accent)">Argo CD</text>
        <g stroke="var(--muted)" strokeOpacity=".55"><line x1="116" y1="55" x2="140" y2="55" /><line x1="116" y1="165" x2="140" y2="165" /><line x1="188" y1="70" x2="188" y2="150" strokeDasharray="3 4" /></g>
        {apps.map((a, i) => {
          const y = 52 + i * 40;
          return (
            <g key={a}>
              <line x1="236" y1="165" x2="262" y2={y + 13} stroke="var(--muted)" strokeOpacity=".45" />
              <rect x="262" y={y} width="118" height="26" rx="6" fill="none" stroke="var(--line)" />
              <circle cx="276" cy={y + 13} r="3.5" fill="var(--accent-2)" />
              <text x="286" y={y + 17} fill="var(--muted)" fontSize="11">{a}</text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
