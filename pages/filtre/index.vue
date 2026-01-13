<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import PocketBase, { type RecordModel } from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

const enseignements = ref<RecordModel[]>([]);
const apprentissages = ref<RecordModel[]>([]);
const semestres = ref<RecordModel[]>([]);
const competences = ref<RecordModel[]>([]);

const selectedSemester = ref("");
const selectedCompetence = ref("");
const searchQuery = ref("");

onMounted(async () => {
  try {
    const [resEns, resAC, resSem, resUE] = await Promise.all([
      pb.collection("Enseignements").getFullList(),
      pb.collection("AC").getFullList(),
      pb.collection("Semestre").getFullList(),
      pb.collection("Competence").getFullList(),
    ]);

    enseignements.value = resEns;
    apprentissages.value = resAC;
    semestres.value = resSem;
    competences.value = resUE;
  } catch (error) {
    console.error("Erreur PocketBase :", error);
  }
});

const filterLogic = (item: RecordModel) => {
  const query = searchQuery.value.toLowerCase();
  const matchesSearch =
    item.name.toLowerCase().includes(query) ||
    (item.code && item.code.toLowerCase().includes(query));

  const matchesSem =
    selectedSemester.value === "" || item.semestre === selectedSemester.value;

  const matchesComp =
    selectedCompetence.value === "" ||
    (item.competences && item.competences.includes(selectedCompetence.value));

  return matchesSearch && matchesSem && matchesComp;
};

const filteredRessources = computed(() =>
  enseignements.value.filter((e) => e.type === "Ressource" && filterLogic(e))
);

const filteredSAE = computed(() =>
  enseignements.value.filter(
    (e) => (e.type === "SAE" || e.type === "Stage") && filterLogic(e)
  )
);

const filteredAC = computed(() =>
  apprentissages.value.filter((ac) => filterLogic(ac))
);
</script>

<template>
  <div class="page-container">
    <!-- Background -->
    <div class="background-blobs">
      <div class="blob pink"></div>
      <div class="blob blue"></div>
      <div class="blob yellow"></div>
    </div>

    <div class="main-content">
      <!-- Header -->
      <header class="glass-container">
        <h1>Filtrer l'intégralité du programme</h1>
        <p class="subtitle">
          Utilisez les filtres ci-dessous pour explorer les Ressources, SAE et
          Apprentissages Critiques.
        </p>

        <div class="search-wrapper">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher par nom ou code (ex : Anglais, S1.01...)"
            class="search-input"
          />
        </div>

        <div class="filter-controls">
          <select v-model="selectedCompetence" class="custom-select">
            <option value="">Toutes les compétences</option>
            <option v-for="c in competences" :key="c.id" :value="c.id">
              {{ c.name }}
            </option>
          </select>
        </div>
      </header>

      <!-- Colonnes -->
      <div class="columns-grid">
        <!-- Ressources -->
        <section class="results-col">
          <div class="col-info">
            <h3>Ressources</h3>
            <span class="badge-count">{{ filteredRessources.length }}</span>
          </div>

          <div class="scroll-container">
            <NuxtLink
              v-for="item in filteredRessources"
              :key="item.id"
              :to="{
                path: `/filtre/${item.id}`,
                query: { col: 'Enseignements' },
              }"
              class="card-base card-ressource"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </section>

        <!-- SAE -->
        <section class="results-col">
          <div class="col-info">
            <h3>SAE</h3>
            <span class="badge-count">{{ filteredSAE.length }}</span>
          </div>

          <div class="scroll-container">
            <NuxtLink
              v-for="item in filteredSAE"
              :key="item.id"
              :to="{
                path: `/filtre/${item.id}`,
                query: { col: 'Enseignements' },
              }"
              class="card-base card-sae"
            >
              <strong>{{ item.code }}</strong>
              <p>{{ item.name }}</p>
            </NuxtLink>
          </div>
        </section>

        <!-- AC -->
        <section class="results-col">
          <div class="col-info">
            <h3>Apprentissages critiques</h3>
            <span class="badge-count">{{ filteredAC.length }}</span>
          </div>

          <div class="scroll-container">
            <NuxtLink
              v-for="ac in filteredAC"
              :key="ac.id"
              :to="{ path: `/filtre/${ac.id}`, query: { col: 'AC' } }"
              class="card-base card-ac"
            >
              <strong>{{ ac.code }}</strong>
              <p>{{ ac.name }}</p>
            </NuxtLink>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ==========================================================================
   1. VARIABLES & FOND GLOBAL
   ========================================================================== */
.page-container {
  min-height: 100vh;
  /* Dégradé léger bleu et jaune pour correspondre à ton autre page */
  background: linear-gradient(135deg, #e0f2fe 0%, #fff9db 100%);
  font-family: "Inter", -apple-system, sans-serif;
  color: #1a1a1a;
  position: relative;
  overflow-x: hidden;
  padding: 40px 20px;
}

/* Blobs de fond optionnels pour donner du relief */
.background-blobs {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.blob {
  position: absolute;
  filter: blur(100px);
  opacity: 0.3;
  border-radius: 50%;
}
.blob.pink {
  width: 400px;
  height: 400px;
  background: #ffdee9;
  top: -100px;
  left: -100px;
}
.blob.blue {
  width: 300px;
  height: 300px;
  background: #3b82f6;
  bottom: 10%;
  right: -50px;
}

/* ==========================================================================
   2. CONTENEUR PRINCIPAL (Hero Card)
   ========================================================================== */
.main-content {
  position: relative;
  z-index: 1;
  max-width: 1300px;
  margin: 0 auto;
}

.glass-container {
  width: 100%;
  border-radius: 30px;
  /* Alignement à gauche de tout le contenu interne */
  text-align: left;
  margin-bottom: 50px;
}

h1 {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 10px;
  letter-spacing: -1.5px;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 35px;
  max-width: 700px;
}

/* Barre de recherche calée à gauche */
.search-wrapper {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
}

.search-input {
  width: 100%;
  max-width: 600px;
  padding: 16px 25px;
  border-radius: 15px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #cbd5e1;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Filtres calés à gauche sous la barre de recherche */
.filter-controls {
  display: flex;
  gap: 15px;
  justify-content: flex-start;
}

.custom-select {
  padding: 10px 18px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: white;
  font-size: 0.9rem;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  min-width: 200px;
}

/* ==========================================================================
   3. GRILLE DE RÉSULTATS (Colonnes)
   ========================================================================== */
.columns-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.col-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.col-info h3 {
  font-size: 1.25rem;
  font-weight: 700;
}

.badge-count {
  background: #e0f2fe;
  color: #3b82f6;
  padding: 2px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 800;
}

.scroll-container {
  max-height: 650px;
  overflow-y: auto;
  padding-right: 10px;
}

/* Scrollbar personnalisée */
.scroll-container::-webkit-scrollbar {
  width: 5px;
}
.scroll-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

/* ==========================================================================
   4. CARTES (Ressources, SAE, AC)
   ========================================================================== */
.card-base {
  display: block;
  text-decoration: none;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 15px;
  transition: transform 0.2s ease;
}

.card-base:hover {
  transform: translateY(-3px);
}

/* Ressources : Blanc simple */
.card-ressource {
  background: white;
  color: #1e293b;
  font-weight: 600;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
}

/* SAE : Rose/Saumon */
.card-sae {
  background: #ff9a9a;
  color: white;
}
.card-sae strong {
  font-size: 0.85rem;
  opacity: 0.9;
}
.card-sae p {
  margin-top: 5px;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.3;
}

/* AC : Blanc avec bordure bleue */
.card-ac {
  background: white;
  color: #1e293b;
  border-left: 6px solid #3b82f6;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
}
.card-ac strong {
  display: block;
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 4px;
}
.card-ac p {
  margin: 0;
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

/* ==========================================================================
   5. RESPONSIVE
   ========================================================================== */
@media (max-width: 1024px) {
  .columns-grid {
    grid-template-columns: 1fr;
  }
  .glass-container {
    padding: 30px;
  }
  h1 {
    font-size: 2.2rem;
  }
}
</style>
