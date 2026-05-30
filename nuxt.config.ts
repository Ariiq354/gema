// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["nuxt-security", "@nuxt/image", "@nuxt/ui", "@nuxt/eslint"],

  css: ["~/assets/css/main.css"],

  ui: {
    colorMode: false,
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  eslint: {
    config: {
      standalone: false,
    },
  },
});
