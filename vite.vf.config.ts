import { defineConfig, Plugin, UserConfig } from 'vite';
import path from 'path';
import fs from 'fs';

async function mergeUserConfig(user: UserConfig = {}): Promise<UserConfig> {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Security-Policy': "frame-ancestors 'self' *",
  } as Record<string, string>;

  const reactFixPlugin: Plugin = {
    name: 'vf-react-fix',
    enforce: 'pre',
    transform(code, id) {
      if (!/\.(t|j)sx$/.test(id)) return null;
      let out = code;
      // Basic JSX attribute normalizations for exports using HTML attrs
      out = out.replace(/\bclass=/g, 'className=');
      out = out.replace(/\bfor=/g, 'htmlFor=');
      // Common SVG attrs
      out = out.replace(/clip-rule=/g, 'clipRule=');
      out = out.replace(/fill-rule=/g, 'fillRule=');
      out = out.replace(/stroke-width=/g, 'strokeWidth=');
      out = out.replace(/stroke-linecap=/g, 'strokeLinecap=');
      out = out.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
      out = out.replace(/stroke-miterlimit=/g, 'strokeMiterlimit=');
      out = out.replace(/stop-color=/g, 'stopColor=');
      return out;
    },
  };

  const animaRewritePlugin: Plugin = {
    name: 'vf-anima-rewrite',
    enforce: 'pre',
    transformIndexHtml(html) {
      let out = html.replaceAll('https://c.animaapp.com/', '/anima-assets/');
      try {
        const buildPath = path.resolve(process.cwd(), 'tailwind.build.css');
        if (fs.existsSync(buildPath) && !out.includes('/tailwind.build.css')) {
          out = out.replace('</head>', '\n<link rel="stylesheet" href="/tailwind.build.css" />\n</head>');
        } else {
          const twPath = path.resolve(process.cwd(), 'tailwind.css');
          if (fs.existsSync(twPath) && !out.includes('/tailwind.css')) {
            out = out.replace('</head>', '\n<link rel="stylesheet" href="/tailwind.css" />\n</head>');
          }
        }
      } catch {}
      return out;
    },
    transform(code, id) {
      // Rewrite in TS/JS and also CSS files
      if (/\.(t|j)sx?$/.test(id) || /\.(css|scss|sass|less|styl|stylus)$/.test(id)) {
        return code.replaceAll('https://c.animaapp.com/', '/anima-assets/');
      }
      return code;
    },
  };

  // Try to load React plugin if available
  let reactPlugin = null;
  try {
    const reactMod = await import('@vitejs/plugin-react');
    reactPlugin = reactMod.default();
  } catch {
    try {
      const reactSwcMod = await import('@vitejs/plugin-react-swc');
      reactPlugin = reactSwcMod.default();
    } catch {
      console.warn('[vite.vf] No React plugin found, continuing without it');
    }
  }

  // Build plugins array
  const plugins = [reactFixPlugin, animaRewritePlugin];
  if (reactPlugin) {
    plugins.push(reactPlugin);
  }
  if (user.plugins) {
    plugins.push(...user.plugins);
  }

  return {
    ...user,
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), './src'),
        ...(user.resolve?.alias || {}),
      },
      ...(user.resolve || {}),
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      ...user.server,
      headers: { ...headers, ...(user.server?.headers || {}) },
      proxy: {
        '/anima-assets': {
          target: 'https://c.animaapp.com',
          changeOrigin: true,
          secure: true,
          rewrite: (p: string) => (p.startsWith('/anima-assets') ? p.replace('/anima-assets', '') : p),
        },
        ...(user.server?.proxy || {}),
      },
    },
  };
}

export default defineConfig(async () => {
  let user: UserConfig = {};
  try {
    const userConfigPath = path.resolve(process.cwd(), 'vite.config.ts');
    const userConfig = await import(userConfigPath);
    user = (userConfig?.default || userConfig) as UserConfig;
  } catch {
    // No user config found, use defaults
  }
  return await mergeUserConfig(user);
});
