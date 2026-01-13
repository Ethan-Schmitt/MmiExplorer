<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PocketBase, { type RecordModel } from 'pocketbase';

// Initialisation de PocketBase
const pb = new PocketBase("http://127.0.0.1:8090");
const route = useRoute();

// Variables réactives
const ue = ref<RecordModel | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  // On récupère "UE1", "UE2", etc. depuis l'URL
  const id = route.params.id as string; 

  try {
    // ---------------------------------------------------------
    // C'EST ICI QUE LA MODIFICATION A LIEU :
    // 1. On cible la collection 'Competence' (avec majuscule comme dans votre PB)
    // 2. On filtre par le champ 'code' (assurez-vous d'avoir créé ce champ dans PB !)
    // ---------------------------------------------------------
    const records = await pb.collection('Competence').getList(1, 1, {
      filter: `code = "${id}"`, 
    });
    
    if (records.items.length > 0) {
      ue.value = records.items[0];
    } else {
      error.value = `La compétence "${id}" est introuvable. Avez-vous bien rempli le champ 'code' dans PocketBase ?`;
    }

  } catch (err: any) {
    console.error("Erreur détaillée :", err);
    // Gestion des erreurs spécifiques
    if (err.status === 404) {
        error.value = "La collection 'Competence' est introuvable.";
    } else if (err.status === 400) {
        error.value = "Erreur de filtre : Le champ 'code' existe-t-il dans PocketBase ?";
    } else {
        error.value = "Impossible de charger les données.";
    }
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

      <div v-else-if="error" class="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
        <h2 class="text-2xl font-bold text-red-500 mb-2">Oups !</h2>
        <p class="text-gray-600 font-medium">{{ error }}</p>
        <p class="text-xs text-gray-400 mt-4">Vérifiez la console (F12) pour plus de détails.</p>
      </div>

      <div v-else-if="ue" class="animate-fade-in-up">
        
        <header class="mb-16 text-center md:text-left">
          <div class="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
            <span class="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-widest border border-orange-200">
              Compétence {{ ue.code }}
            </span>
          </div>

          <h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-zinc-900">
            {{ ue.name }}
          </h1>
          <div class="h-2 w-24 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full md:mx-0 mx-auto"></div>
        </header>

        <div class="max-w-4xl space-y-12">
          
          <div class="bg-white/60 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/50 shadow-xl shadow-orange-100/50">
            <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
              <span class="text-3xl">💡</span> Savoir-faire & Objectifs
            </h2>
            
            <div class="description-content text-lg text-gray-600 leading-relaxed" v-html="ue.description"></div>
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

/* Puce personnalisée (Orange pour matcher les compétences) */
.description-content :deep(li)::before {
  content: "→";
  position: absolute;
  left: 0;
  top: 0;
  color: #f97316; /* Orange-500 */
  font-weight: 900;
  font-size: 1.2em;
}
</style>