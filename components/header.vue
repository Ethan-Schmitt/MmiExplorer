<template>
  <header class="header">
    <div class="header-left">
      <a href="/" class="logo">MMI EXPLORER</a>

      <nav class="nav">
        <a href="/graph" class="nav-link">Explorer</a>
        <a href="/filtre" class="nav-link">Filtrer</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between; /* Espace entre le bloc gauche et l'icône droite */
  align-items: center;
  padding: 20px 60px; /* Ajuste selon la largeur de ton écran */
  background-color: white;
  width: 100%;
  box-sizing: border-box;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 40px; /* Espace entre le logo et les liens de navigation */
}

.logo {
  font-size: 1.2rem;
  font-weight: 900; /* Très gras comme sur l'image */
  text-decoration: none;
  color: #1a1a1a;
  letter-spacing: -0.5px;
}

.nav {
  display: flex;
  gap: 25px; /* Espace entre Explorer et Filtrer */
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #000;
}

.header-right {
  display: flex;
  align-items: center;
}

.search-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  padding: 5px;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
}

.search-button:hover {
  opacity: 0.7;
}

/* On enlève l'absolute pour que le header prenne sa place naturelle dans le flux */
</style>
