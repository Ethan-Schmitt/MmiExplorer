<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router"; // 1. On importe le router

const router = useRouter(); // 2. On initialise le router

// Définition des props pour recevoir les données du concept
const props = defineProps({
  concept: {
    type: Object,
    required: true,
    default: () => ({ id: "", title: "", link: "", description: "" }),
  },
});

// Définition de l'événement 'close' pour fermer la carte
const emit = defineEmits(["close"]);

// Fonction pour fermer la carte
const closeCard = () => {
  emit("close");
};

// Fonction pour ouvrir le lien (Navigation SPA ou Redirection)
const openLink = () => {
  if (!props.concept.link) return;

  try {
    // On essaie de créer un objet URL pour analyser le lien
    const url = new URL(props.concept.link);

    // Si le domaine du lien est le même que celui du site actuel (lien interne)
    if (url.origin === window.location.origin) {
      // On utilise le router pour une navigation fluide sans rechargement (SPA)
      // On récupère le chemin (pathname) + les paramètres (?col=...)
      router.push(url.pathname + url.search);
    } else {
      // Si c'est un lien externe, on redirige dans le même onglet (ou window.open si tu changes d'avis)
      window.location.href = props.concept.link;
    }
  } catch (e) {
    // Si l'URL n'est pas absolue (ex: "/filtre/123"), on considère que c'est interne
    router.push(props.concept.link);
  }
};
</script>

<template>
  <div class="modal-overlay" @click.self="closeCard">
    <div class="detail-card">
      <button class="close-button" @click="closeCard">×</button>

      <h2>{{ concept.title || concept.id }}</h2>
      <hr />

      <div class="description" v-html="concept.description"></div>

      <div class="actions">
        <button class="link-button" @click="openLink">
          Accéder à la ressource
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Style pour l'arrière-plan semi-transparent */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Ombre discrète */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Assure que la carte est au-dessus du graphe */
  backdrop-filter: blur(5px); /* Optionnel : effet de flou sur le fond */
}

/* Style de la carte */
.detail-card {
  background: #2c2c2c; /* Couleur de fond sombre et douce */
  color: #f0f0f0; /* Texte clair */
  padding: 30px;
  border-radius: 15px; /* Contours arrondis */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); /* Ombre douce */
  width: 90%;
  max-width: 500px;
  position: relative;
  transition: transform 0.3s ease-out;
  animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Titre */
h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0;
  color: #a8c349; /* Utiliser une couleur de ton graphe pour le titre */
}

/* Séparateur */
hr {
  border: none;
  border-top: 1px solid #444;
  margin: 15px 0;
}

/* Description */
.description {
  margin-bottom: 20px;
  line-height: 1.5;
}

/* Bouton de fermeture */
.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  color: #aaa;
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  transition: color 0.2s;
}

.close-button:hover {
  color: #fff;
}

/* Bouton d'action (lien) */
.actions {
  text-align: right;
}

.link-button {
  background-color: #4a7f9a;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.link-button:hover {
  background-color: #5d97b3;
}
</style>
