# Oryzons

React + TypeScript + Vite — landing (Hero, Services, header glass).

## Déploiement automatique (GitHub → VPS)

À chaque `push` sur `main`, un pipeline se lance :

- **CI** : lint + build + `npm audit --omit=dev`
- **Deploy** : si la CI est OK, build puis envoi de `dist/` sur le VPS via **SSH + rsync**, puis reload Nginx

### Secrets GitHub à ajouter

Dans GitHub → **Settings** → **Secrets and variables** → **Actions** → **New repository secret** :

- `VPS_HOST` : IP ou domaine du VPS (ex: `203.0.113.10`)
- `VPS_PORT` : port SSH (ex: `22`)
- `VPS_USER` : user SSH (ex: `deploy`)
- `VPS_SSH_KEY` : clé privée **ED25519** (contenu du fichier, avec les lignes `-----BEGIN...`)
- `VPS_PATH` : dossier de déploiement (ex: `/var/www/oryzons`)

### Pré-requis VPS (Nginx)

1) Crée le dossier cible et donne les droits au user `deploy` :

```bash
sudo mkdir -p /var/www/oryzons
sudo chown -R deploy:deploy /var/www/oryzons
```

2) Exemple de vhost Nginx (SPA React Router) :

```nginx
server {
  server_name ton-domaine.fr;
  root /var/www/oryzons;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff2?)$ {
    expires 30d;
    add_header Cache-Control "public, max-age=2592000, immutable";
    try_files $uri =404;
  }
}
```

3) Test & reload :

```bash
sudo nginx -t && sudo systemctl reload nginx
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
