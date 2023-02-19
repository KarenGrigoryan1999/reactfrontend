export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "badteacher.ru",
    mode: "server",
    htmlAttrs: {
      lang: "ru",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      { name: "yandex-verification", content: "b55d783ad27cbed8" },
    ],
    link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/_main.scss"],

  styleResources: {
    scss: ["~/assets/scss/_variables.scss", "~/assets/scss/_mixins.scss"],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/plugins/mixins.js" }, { src: "~/plugins/click-outside.directive.js", ssr: false }, { src: "~/plugins/vue-perfect-scrollbar.js", ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/style-resources"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/auth",
    "@nuxtjs/axios",
    [
      "@nuxtjs/yandex-metrika",
      {
        id: "88162898",
        webvisor: true,
        accurateTrackBounce: true,
        trackLinks: false,
        clickmap: true,
      },
    ],
  ],

  auth: {
    resetOnError: true,
    redirect: {
      login: '/?show-login=true'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          user: { url: '/auth/user', method: 'get', propertyName: '' }
        }
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:7070"
        : "http://5.63.157.28:8080",
    rejectUnauthorized: false,
  },

  env: {
    VUE_APP_STORAGE_URL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:7070"
        : "http://5.63.157.28:8080",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient }) {
      config.module.rules.push({
        test: /\.pug$/,
        loader: "pug-bem-plain-loader",
        options: {
          e: "__",
          m: "_",
        },
      })
    },
  },
}
