# Shanmuka Patnala - Personal Portfolio

React portfolio for Shanmuka Patnala, built with Vite.

## Local Development

```bash
npm install --prefix client
npm run dev --prefix client
```

## Build

```bash
npm run build --prefix client
```

The production output is generated in `client/dist`.

## Host On GitHub Pages

1. Create a GitHub repository and push this project to the `main` branch.
2. In GitHub, open the repository settings.
3. Go to `Pages`.
4. Set `Source` to `GitHub Actions`.
5. Push to `main`; the workflow in `.github/workflows/deploy.yml` will build and publish `client/dist`.

Project repository buttons are configured in `client/src/App.jsx` with the GitHub username `shanmukpatnala`.
