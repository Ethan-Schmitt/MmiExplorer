<script setup>
import { ref } from "vue";
import { Monitor, Palette, Globe, Megaphone, Lightbulb } from "lucide-vue-next";

// Données des compétences (UE) avec ID pour le lien dynamique
const competences = [
  {
    id: "UE1", // Correspondra à l'ID ou au Code dans votre base PocketBase
    title: "Comprendre",
    desc: "Les écosystèmes et les utilisateurs",
    icon: Monitor,
    color: "#f43f5e",
  },
  {
    id: "UE2",
    title: "Concevoir",
    desc: "Une réponse stratégique et ergonomique",
    icon: Lightbulb,
    color: "#f59e0b",
  },
  {
    id: "UE3",
    title: "Exprimer",
    desc: "Un message multimédia créatif",
    icon: Palette,
    color: "#ec4899",
  },
  {
    id: "UE4",
    title: "Développer",
    desc: "Pour le web et les mobiles",
    icon: Globe,
    color: "#10b981",
  },
  {
    id: "UE5",
    title: "Entreprendre",
    desc: "Dans le secteur du numérique",
    icon: Megaphone,
    color: "#3b82f6",
  },
];

// Données des semestres
const semestres = [
  {
    id: 1,
    title: "Semestre 1",
    label: "Année 1",
    text: "Fondamentaux du multimédia et du web.",
    tags: ["HTML/CSS", "Design", "Audiovisuel"],
  },
  {
    id: 2,
    title: "Semestre 2",
    label: "Année 1",
    text: "Approfondissement et premiers projets concrets.",
    tags: ["JavaScript", "UX UI", "Com"],
  },
  {
    id: 3,
    title: "Semestre 3",
    label: "Année 2",
    text: "Spécialisation et méthodologies agiles.",
    tags: ["Frameworks", "Motion", "SEO"],
  },
  {
    id: 4,
    title: "Semestre 4",
    label: "Année 2",
    text: "Expertise métier et projets transversaux.",
    tags: ["Alternance", "Fullstack"],
  },
  {
    id: 5,
    title: "Semestre 5",
    label: "Année 3",
    text: "Stage long et perfectionnement professionnel.",
    tags: ["Stage", "Expertise"],
  },
  {
    id: 6,
    title: "Semestre 6",
    label: "Année 3",
    text: "Projet de fin d’études et insertion.",
    tags: ["PFE", "Portfolio"],
  },
];
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50 text-[#1a1a1a] font-sans selection:bg-purple-100 overflow-x-hidden relative"
  >
    <div
      class="fixed inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
    ></div>

    <div class="fixed inset-0 pointer-events-none z-0">
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.8, x: 100 }"
        :enter="{
          opacity: 0.4,
          scale: 1.2,
          x: 0,
          transition: {
            duration: 5000,
            repeat: Infinity,
            repeatType: 'reverse',
          },
        }"
        class="absolute -top-20 -right-20 w-[600px] h-[600px] bg-purple-200 rounded-full blur-[120px]"
      ></div>
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.8, y: 100 }"
        :enter="{
          opacity: 0.3,
          scale: 1.1,
          y: 0,
          transition: {
            duration: 7000,
            repeat: Infinity,
            repeatType: 'reverse',
          },
        }"
        class="absolute top-1/4 -left-20 w-[700px] h-[700px] bg-orange-100 rounded-full blur-[150px]"
      ></div>
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{
          opacity: 0.2,
          transition: {
            duration: 4000,
            repeat: Infinity,
            repeatType: 'reverse',
          },
        }"
        class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px]"
      ></div>
    </div>

    <section
      class="relative z-10 pt-24 pb-32 px-8 max-w-7xl mx-auto text-center md:text-left"
    >
      <h1
        v-motion-slide-visible-bottom
        class="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tighter mb-10"
      >
        EXPLORER LE <br />
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"
        >
          PROGRAMME MMI
        </span>
      </h1>
      <p
        v-motion-fade
        class="max-w-xl text-lg text-gray-500 font-medium leading-relaxed mb-8"
      >
        Devenez un expert du numérique. Trois ans pour maîtriser le design, le
        développement et la stratégie de communication.
      </p>
      <div class="flex flex-wrap justify-center md:justify-start gap-4">
        <a href="/graph">
          <button
            class="bg-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-purple-200 hover:-translate-y-1 transition-all duration-300"
          >
            Découvrir avec le graphique
          </button>
        </a>
        <a href="/filtre">
          <button
            class="bg-white/80 backdrop-blur-md border border-white/50 px-8 py-4 rounded-2xl font-bold hover:bg-white transition-all shadow-sm"
          >
            Voir l'intégralité du programme
          </button>
        </a>
      </div>
    </section>

    <section class="relative z-10 py-20 px-8 max-w-7xl mx-auto">
      <div
        class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
      >
        <h2
          class="text-4xl md:text-5xl font-black tracking-tighter italic uppercase"
        >
          Les 5 Compétences
        </h2>
        <p
          class="max-w-xs text-sm text-gray-400 font-bold uppercase tracking-widest"
        >
          Le socle de votre futur métier
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <NuxtLink
          v-for="(c, i) in competences"
          :key="i"
          :to="`/competence/${c.id}`"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: i * 100 } }"
          class="group bg-white/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/50 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-100 transition-all duration-500 cursor-pointer block"
        >
          <div
            :style="{ backgroundColor: c.color }"
            class="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-20 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-lg"
          >
            <component :is="c.icon" class="w-6 h-6" />
          </div>
          <h3 class="text-xl font-black mb-2">{{ c.title }}</h3>
          <p class="text-sm text-gray-500 leading-snug">{{ c.desc }}</p>
        </NuxtLink>
      </div>
    </section>

    <section
      class="relative z-10 py-20 bg-zinc-950 text-white rounded-[3rem] mx-4 md:mx-8 px-8 shadow-2xl"
    >
      <div class="max-w-5xl mx-auto">
        <h2
          class="text-4xl md:text-6xl font-black tracking-tighter mb-20 text-center"
        >
          Le parcours en 6 semestres
        </h2>

        <div class="space-y-4">
          <NuxtLink
            v-for="(s, i) in semestres"
            :key="i"
            :to="`/semestre/${s.id}`"
            v-motion-slide-visible-left
            class="group bg-zinc-900/40 hover:bg-zinc-800/60 p-6 md:p-10 rounded-[2rem] border border-white/5 flex flex-col md:flex-row items-center gap-8 transition-all duration-300 block cursor-pointer"
          >
            <div
              class="text-5xl font-black opacity-20 group-hover:opacity-100 group-hover:text-purple-500 transition-all duration-500"
            >
              0{{ s.id }}
            </div>
            <div class="flex-grow text-center md:text-left">
              <span
                class="text-xs font-black uppercase tracking-[0.2em] text-purple-400 mb-2 block"
                >{{ s.label }}</span
              >
              <h3 class="text-2xl font-bold mb-3">{{ s.title }}</h3>
              <p class="text-zinc-400 text-sm max-w-md">{{ s.text }}</p>
            </div>
            <div class="flex flex-wrap gap-2 justify-center">
              <span
                v-for="tag in s.tags"
                :key="tag"
                class="px-4 py-1.5 rounded-full bg-white/5 text-[10px] font-bold uppercase border border-white/10 italic hover:border-purple-500/50 transition-colors"
              >
                #{{ tag }}
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,800;1,800&display=swap");

body {
  font-family: "Plus Jakarta Sans", sans-serif;
  background-color: #fcfcfd;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
