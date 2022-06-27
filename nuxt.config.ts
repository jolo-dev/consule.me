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
      redirectUri: process.env.REDIRECT_URI,
    }
  },
  components: {
    global: true,
    dirs: ['~/components'],
  },
  vite: {
    server: {
      proxy: {
          '/google-auth': {
          target: "https://accounts.google.com/o/oauth2/v2/auth",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/google-auth/, ""),
        }
      }
    }
  }
})

