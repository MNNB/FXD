# Deployment Plan

This plan outlines the steps to deploy your Astro project to Netlify via a GitHub repository.

## Phase 1: Project Setup

1. **Update `astro.config.mjs`:** Add the `outDir` property to your `astro.config.mjs` file. This tells Astro where to build your project's static files.  If your `astro.config.mjs` file looks like this:

```javascript
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  integrations: [icon()],
});

```

Change it to this:

```javascript
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  outDir: 'dist',
  integrations: [icon()],
});

```

2. **Create `netlify.toml`:** Create a `netlify.toml` file in the root of your project. This file configures Netlify's build process. Add the following content:

```toml
[build]
  command = "npm run build" # Or yarn build, pnpm build, etc. - adjust as needed
  publish = "dist" # This should match the outDir in astro.config.mjs

```

## Phase 2: GitHub Integration

1. **Create a GitHub Repository:** If you haven't already, create a GitHub repository for your project.

2. **Push your Code:** Push your project's code to the GitHub repository.  Make sure to commit the changes to `astro.config.mjs` and the newly created `netlify.toml` file.

## Phase 3: Netlify Deployment

1. **Connect to GitHub:** In the Netlify dashboard, create a new project and connect it to your GitHub repository.

2. **Configure Netlify:** Netlify should automatically detect your `netlify.toml` file and configure the build process accordingly.  Verify that the build command and publish directory are correct.

3. **Deploy:** Trigger a deployment in Netlify.

## Phase 4: Continuous Deployment

1. **Enable Automatic Deploys:** In your Netlify project settings, enable automatic deploys. This will automatically deploy your site whenever you push changes to your GitHub repository.

## Verification

After deploying, visit your Netlify site URL to verify that the deployment was successful.