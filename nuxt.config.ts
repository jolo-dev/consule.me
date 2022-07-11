import { defineNuxtConfig } from 'nuxt'


// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  alias: {
    jquery: 'gridstack/dist/jq/jquery.js',
    'jquery-ui': 'gridstack/dist/jq/jquery-ui.js',
    'jquery.ui': 'gridstack/dist/jq/jquery-ui.js',
    'jquery.ui.touch-punch': 'gridstack/dist/jq/jquery.ui.touch-punch.js'
  },
  modules: ['@unocss/nuxt'],
  css: [
    '@/assets/styles/index.scss'
  ],
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: {
      scale: 1.2
    }, // enabled `@unocss/preset-icons`
    attributify: true, // enabled `@unocss/preset-attributify`,
    webFonts: {
      provider: 'google', // default provider
      fonts: {
        // these will extend the default theme
        sans: 'Josefin Sans',
        mono: ['Fira Code', 'Fira Mono:400,700'],
      }
    },
    // core options
    shortcuts: [],
    rules: [['body', {'font-family': 'Josefin Sans'}]]
  },
  runtimeConfig: {
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      googleRedirectUri: process.env.GOOGLE_REDIRECT_URI,
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
      stepZenApiKey: process.env.STEP_ZEN_API_KEY,
      stepzenGraphql: process.env.STEPZEN_GRAPHQL,
      githubClientId: process.env.GITHUB_CLIENT_ID,
      githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
      githubRedirectUri: process.env.GITHUB_REDIRECT_URI,
    },
  },
  components: {
    global: true,
    dirs: ['~/components'],
  },
  typescript: {
    shim: false
  },
  vite: {
    server: {
      proxy: {
          '/github-auth': {
          target: "https://github.com/login/oauth/access_token",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/github-auth/, ""),
        }
      }
    }
  }
})

