<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PocketBase, { type RecordModel } from 'pocketbase';

const pb = new PocketBase("https://yubi.alwaysdata.net/");
const route = useRoute();

const semestre = ref<RecordModel | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  const id = route.params.id as string;

  try {
    // Recherche du semestre par son nom (ex: "Semestre 1")
    const records = await pb.collection('Semestre').getList(1, 1, {
      filter: `name ~ "${id}"`, 
    });
    
    if (records.items.length > 0) {
      semestre.value = records.items[0];
    } else {
      error.value = "Semestre introuvable.";
    }

  } catch (err) {
    console.error("Erreur chargement semestre :", err);
    error.value = "Impossible de charger les données.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50 text-[#1a1a1a] font-sans selection:bg-purple-100 overflow-x-hidden relative">
    
    <div class="fixed inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

    <div class="relative z-10 max-w-5xl mx-auto px-8 py-20">
      
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-purple-600 transition-colors mb-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour à l'accueil
      </NuxtLink>

      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
      </div>

      <div v-else-if="error" class="text-center py-20">
        <h2 class="text-2xl font-bold text-red-500 mb-2">Oups !</h2>
        <p class="text-gray-500">{{ error }}</p>
      </div>

      <div v-else-if="semestre" class="animate-fade-in-up">
        
        <header class="mb-16 text-center md:text-left">
          <span class="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-black uppercase tracking-widest mb-6 border border-purple-200">
            Programme Universitaire
          </span>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-zinc-900">
            {{ semestre.name }}
          </h1>
          <div class="h-2 w-24 bg-gradient-to-r from-purple-600 to-orange-400 rounded-full md:mx-0 mx-auto"></div>
        </header>

        <div class="max-w-4xl">
          <div class="bg-white/60 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/50 shadow-xl shadow-purple-100/50">
            <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
              <span class="text-3xl">🎯</span> Objectifs & Programme
            </h2>
            
            <div class="description-content text-lg text-gray-600 leading-relaxed" v-html="semestre.description"></div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
/* Animation d'entrée */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Styles pour le contenu Rich Text (v-html) */
.description-content :deep(p) {
  margin-bottom: 1.5rem;
}

.description-content :deep(strong) {
  color: #1a1a1a;
  font-weight: 800;
}

.description-content :deep(ul) {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  display: grid;
  gap: 1rem;
}

.description-content :deep(li) {
  position: relative;
  padding-left: 2rem;
  font-weight: 500;
  color: #334155;
}

.description-content :deep(li)::before {
  content: "→";
  position: absolute;
  left: 0;
  top: 0;
  color: #9333ea; /* Purple-600 */
  font-weight: 900;
  font-size: 1.2em;
}
</style>