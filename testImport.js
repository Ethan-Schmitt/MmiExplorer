import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

// Données des UE avec leurs IDs PocketBase et descriptions
// REMPLACEZ LES VALEURS DE "id" PAR LES VRAIS IDs DE VOTRE BASE POCKETBASE
const uesData = [
  {
    id: "szy17ug4fua81xz", // Remplacez par l'ID réel de l'UE 1 (Comprendre)
    description: `
      <p><strong>Comprendre les écosystèmes, les besoins des utilisateurs et les dispositifs de communication numérique.</strong></p>
      <p>Cette unité d'enseignement vise à développer une culture générale et technique du numérique. L'étudiant apprend à analyser un environnement professionnel, à identifier les cibles et à auditer des dispositifs existants.</p>
      <p><strong>Savoir-faire clés :</strong></p>
      <ul>
        <li>Réaliser une veille informationnelle et technologique.</li>
        <li>Produire des analyses statistiques descriptives.</li>
        <li>Diagnostiquer l'ergonomie et l'expérience utilisateur (UX).</li>
        <li>Analyser des stratégies de communication numérique.</li>
      </ul>
    `,
  },
  {
    id: "iigajcomws2d9ld", // Remplacez par l'ID réel de l'UE 2 (Concevoir)
    description: `
      <p><strong>Concevoir ou co-concevoir une réponse stratégique numérique.</strong></p>
      <p>Cette UE se concentre sur la phase de conception et de stratégie. L'étudiant apprend à élaborer des solutions adaptées aux besoins identifiés, en tenant compte des contraintes techniques et budgétaires.</p>
      <p><strong>Savoir-faire clés :</strong></p>
      <ul>
        <li>Concevoir une interface web statique et interactive.</li>
        <li>Élaborer un concept créatif transmédia.</li>
        <li>Prototyper des dispositifs interactifs complexes.</li>
        <li>Définir une stratégie de référencement (SEO/SEA).</li>
      </ul>
    `,
  },
  {
    id: "nlbvjuwpds4y1uy", // Remplacez par l'ID réel de l'UE 3 (Exprimer)
    description: `
      <p><strong>Exprimer un message avec les médias numériques pour informer et communiquer.</strong></p>
      <p>Cette unité est dédiée à la production de contenus et à la création artistique. Elle couvre l'écriture, le graphisme, l'audiovisuel et le motion design.</p>
      <p><strong>Savoir-faire clés :</strong></p>
      <ul>
        <li>Produire des contenus visuels, écrits et audiovisuels.</li>
        <li>Créer des narrations transmédias et interactives.</li>
        <li>Définir une ligne éditoriale et une charte graphique.</li>
        <li>S'exprimer à l'oral dans un contexte professionnel.</li>
      </ul>
    `,
  },
  {
    id: "wm200e26utyjyk5", // Remplacez par l'ID réel de l'UE 4 (Développer)
    description: `
      <p><strong>Développer pour le web et les médias numériques.</strong></p>
      <p>Cœur technique de la formation, cette UE forme au développement informatique, de l'intégration web jusqu'à l'architecture logicielle complexe.</p>
      <p><strong>Savoir-faire clés :</strong></p>
      <ul>
        <li>Intégrer des pages web (HTML/CSS).</li>
        <li>Développer des applications web dynamiques (Full Stack).</li>
        <li>Déployer des services et sécuriser des applications.</li>
        <li>Industrialiser le développement (DevOps).</li>
      </ul>
    `,
  },
  {
    id: "dfqxt612fm54xik", // Remplacez par l'ID réel de l'UE 5 (Entreprendre)
    description: `
      <p><strong>Entreprendre dans le secteur du numérique.</strong></p>
      <p>Cette UE transversale prépare à l'insertion professionnelle, à la gestion de projet et à l'entrepreneuriat.</p>
      <p><strong>Savoir-faire clés :</strong></p>
      <ul>
        <li>Gérer son identité numérique professionnelle.</li>
        <li>Piloter un projet numérique avec des méthodes agiles.</li>
        <li>Comprendre les modèles économiques et juridiques.</li>
        <li>Manager une équipe et une structure.</li>
      </ul>
    `,
  },
];

(async () => {
  console.log("🚀 Mise à jour des descriptions des UE par ID...");

  // Nom de la collection à mettre à jour (ex: "UE", "Competences"...)
  const collectionName = "UE";

  for (const data of uesData) {
    try {
      // On met à jour directement via l'ID
      await pb.collection(collectionName).update(data.id, {
        description: data.description,
      });
      console.log(`✅ UE mise à jour : ID ${data.id}`);
    } catch (e) {
      console.error(`❌ Erreur sur l'UE ID ${data.id} :`, e.message);
      if (e.status === 404)
        console.error(
          "   Astuce : Vérifiez que l'ID existe bien dans la collection."
        );
    }
  }

  console.log("🏁 Opération terminée !");
})();
