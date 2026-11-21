# Portfolio — Hayoub Mouffok

Ingénieur DevOps, systèmes, réseaux et cybersécurité. En ligne : https://hayoub-mouffok.netlify.app

- **Stack** : Next.js (export statique), TypeScript, Tailwind CSS, Framer Motion, Lucide.
- **Sections** : accueil avec réseau interactif, à propos, compétences, projets, parcours, contact (Netlify Forms).
- **Thèmes** : sombre (par défaut) et clair.
- **CI** : types, build et liens vérifiés par GitHub Actions ; déploiement automatique par Netlify.
- La première version, en terminal interactif, reste disponible sous [`/terminal`](https://hayoub-mouffok.netlify.app/terminal/).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # site statique dans out/
```

Pour ajouter une photo : la placer dans `public/photo.jpg`, puis renseigner `PHOTO` dans `components/About.tsx`.
