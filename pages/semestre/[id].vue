<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import PocketBase, { type RecordModel } from "pocketbase";

const pb = new PocketBase("https://yubi.alwaysdata.net/");
const route = useRoute();

const item = ref<ExpandedItem | null>(null);
const colName = (route.query.col as string) || "Enseignements";

interface ExpandedItem extends RecordModel {
  fiche?: string; // Champ ajouté pour correspondre à ta base de données
  expand?: {
    competences?: RecordModel[];
    AC?: RecordModel[];
    ressources?: RecordModel[];
    semestre?: RecordModel;
  };
}

onMounted(async () => {
  const id = route.params.id as string;
  const expandFields =
    colName === "AC" ? "semestre" : "competences,AC,ressources,semestre";

  try {
    try {
      item.value = await pb
        .collection(colName)
        .getOne(id, { expand: expandFields });
    } catch {
      item.value = await pb
        .collection(colName)
        .getFirstListItem(`code="${id}"`, { expand: expandFields });
    }
  } catch (error) {
    console.error("Erreur chargement :", error);
  }
});
</script>

<template>
  <div v-if="item" class="detail-page">
    <nav class="top-nav">
      <NuxtLink to="/filtre" class="back-link">
        <span class="arrow-icon">←</span> Retour au programme
      </NuxtLink>
    </nav>

    <header class="detail-header">
      <div class="header-meta">
        <span class="label">{{ item.type || "Apprentissage Critique" }}</span>

        <span v-if="item.expand?.semestre" class="semester-badge">
          {{ item.expand.semestre.name }}
        </span>
      </div>

      <h1>{{ item.code ? item.code + " :" : "" }} {{ item.name }}</h1>

      <div class="description content-html" v-html="item.description"></div>

      <div v-if="item.fiche" class="fiche-container">
        <a :href="item.fiche" target="_blank" class="fiche-button">
          <span class="icon">📄</span>
          Consulter la fiche ressource
          <span class="external-arrow">↗</span>
        </a>
      </div>
    </header>

    <div class="info-grid">
      <div v-if="colName === 'AC'" class="ac-details">
        <div class="stats-row">
          <div class="stat-card">
            <label>Niveau</label>
            <p>Niv. {{ item.niveau }}</p>
          </div>

          <div v-if="item.expand?.semestre" class="stat-card semester-card">
            <label>Période</label>
            <p>{{ item.expand.semestre.name }}</p>
          </div>
        </div>
      </div>

      <div v-else class="ens-details">
        <div class="stats-row">
          <div class="stat-card">
            <label>Heures PPN</label>
            <p>{{ item.nb_heures_PPN }}h</p>
          </div>
          <div class="stat-card">
            <label>Hebdo</label>
            <p>{{ item.nb_heures_semaine }}h</p>
          </div>

          <div v-if="item.expand?.semestre" class="stat-card semester-card">
            <label>Semestre</label>
            <p>{{ item.expand.semestre.name }}</p>
          </div>
        </div>

        <div class="relations-grid">
          <section class="rel-col">
            <h2>Compétences visées</h2>
            <div class="badges">
              <NuxtLink
                v-for="c in ([] as RecordModel[]).concat(item.expand?.competences || [])"
                :key="c.id"
                :to="`/competence/${c.id}`"
                class="competence-badge hoverable-badge"
              >
                {{ c.name }} <span>→</span>
              </NuxtLink>

              <div v-if="!item.expand?.competences" class="empty-state">
                Aucune compétence liée.
              </div>
            </div>
          </section>

          <section class="rel-col">
            <div v-if="item.type === 'SAE'">
              <h2>Ressources mobilisées</h2>
              <div class="links-list">
                <NuxtLink
                  v-for="res in ([] as RecordModel[]).concat(item.expand?.ressources || [])"
                  :key="res.id"
                  :to="`/filtre/${res.code || res.id}?col=Enseignements`"
                  class="card-link res-border"
                >
                  <strong>{{ res.code }}</strong>
                  <p>{{ res.name }}</p>
                </NuxtLink>
              </div>
            </div>

            <div v-else>
              <h2>Apprentissages Critiques</h2>
              <div class="links-list">
                <NuxtLink
                  v-for="ac in ([] as RecordModel[]).concat(item.expand?.AC || [])"
                  :key="ac.id"
                  :to="`/filtre/${ac.code || ac.id}?col=AC`"
                  class="card-link ac-border"
                >
                  <strong>{{ ac.code }}</strong>
                  <p>{{ ac.name }}</p>
                </NuxtLink>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="loading">
    <p>Chargement des données...</p>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap");

/* --- LAYOUT GLOBAL --- */
.detail-page {
  background: linear-gradient(135deg, #e0f2fe 0%, #fff9db 100%);
  min-height: 100vh;
  padding: 30px 20px;
  font-family: "Inter", sans-serif;
  color: #1a1a1a;
}
@media (min-width: 768px) {
  .detail-page {
    padding: 60px 80px;
  }
}

/* --- NAVIGATION --- */
.top-nav {
  margin-bottom: 40px;
}
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.6);
  padding: 8px 16px;
  border-radius: 30px;
  transition: transform 0.2s ease;
}
.back-link:hover {
  transform: translateX(-5px);
  background: white;
}

/* --- HEADER --- */
.header-meta {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.semester-badge {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 800;
  color: #1e293b;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.semester-card {
  background: #1e293b !important;
}
.semester-card label {
  color: #94a3b8 !important;
}
.semester-card p {
  color: white !important;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-header {
  margin-bottom: 40px;
}
.label {
  color: #64748b;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

h1 {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin: 0 0 20px 0;
  line-height: 1.1;
}
@media (min-width: 768px) {
  h1 {
    font-size: 3.2rem;
    letter-spacing: -1.5px;
  }
}

.description {
  font-size: 1rem;
  color: #334155;
  line-height: 1.6;
  max-width: 900px;
}
@media (min-width: 768px) {
  .description {
    font-size: 1.15rem;
  }
}

/* --- STYLE DU BOUTON FICHE --- */
.fiche-container {
  margin-top: 25px;
}
.fiche-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #2563eb;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}
.fiche-button:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
}
.external-arrow {
  font-size: 0.8rem;
  opacity: 0.8;
}

/* --- CONTENT HTML --- */
.content-html :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.content-html :deep(li) {
  margin-bottom: 0.25rem;
}
.content-html :deep(strong) {
  font-weight: 700;
  color: #1e293b;
}
.content-html :deep(br) {
  display: block;
  content: "";
  margin-top: 0.5rem;
}

/* --- STATS CARDS --- */
.stats-row {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.stat-card {
  background: white;
  padding: 15px 25px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  flex: 1;
  min-width: 130px;
}

.stat-card label {
  font-size: 0.7rem;
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 5px;
  display: block;
}

.stat-card p {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
  color: #1e293b;
}

@media (min-width: 768px) {
  .stats-row {
    justify-content: flex-start;
    gap: 20px;
  }
  .stat-card {
    flex: 0 1 auto;
    min-width: auto;
    padding: 12px 24px;
    border-radius: 12px;
  }
  .stat-card p {
    font-size: 1.25rem;
  }
}

/* --- RELATIONS --- */
.relations-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
}
@media (min-width: 768px) {
  .relations-grid {
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    margin-top: 50px;
  }
}

h2 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1e293b;
}

.links-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.card-link {
  background: white;
  padding: 18px 22px;
  border-radius: 14px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
  display: block;
}
.card-link:hover {
  transform: translateX(5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}
.res-border {
  border-left: 6px solid #3b82f6;
}
.ac-border {
  border-left: 6px solid #facc15;
}

.competence-badge {
  background: white;
  padding: 15px 20px;
  border-radius: 12px;
  border-left: 6px solid #ef4444;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  font-weight: 700;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
}
.hoverable-badge:hover {
  transform: translateX(5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  background-color: #fef2f2;
}
.empty-state {
  font-style: italic;
  color: #64748b;
  font-size: 0.9rem;
}
.loading {
  display: flex;
  justify-content: center;
  padding-top: 100px;
  font-weight: 700;
}
</style>