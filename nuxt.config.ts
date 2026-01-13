// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // Ajout des modules nécessaires
  modules: ["@vueuse/motion/nuxt", "@nuxtjs/tailwindcss"],

  // Optionnel : Configuration spécifique pour Motion
  motion: {
    directives: {
      "pop-in": {
        initial: {
          scale: 0,
          opacity: 0,
        },
        enter: {
          scale: 1,
          opacity: 1,
        },
      },
    },
  },
});
