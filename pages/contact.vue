<template>

  <div class="page">

    <!-- Section Hero -->

    <section class="hero-section">

      <div class="hero-content">

        <h2 class="hero-title">MMI</h2>

        <h1 class="hero-subtitle">Découvrez le programme international MMI</h1>

        <p class="hero-text">

          Un parcours innovant, mêlant design, web, audiovisuel et

          communication, ouvert sur le monde.

        </p>

        <button class="hero-btn">Explorer le programme</button>

      </div>

    </section>



    <!-- Section Aperçu rapide -->

    <section class="overview">

      <h2 class="overview-title">APERÇU RAPIDE DU PROGRAMME</h2>

      <div class="overview-content">

        <!-- Menu gauche -->

        <div class="overview-menu">

          <p class="overview-menu-title">Aperçu du cursus</p>

          <ul>

            <li

              :class="{ active: selectedYear === 1 }"

              @click="selectedYear = 1"

            >

              Année 1

            </li>

            <li

              :class="{ active: selectedYear === 2 }"

              @click="selectedYear = 2"

            >

              Année 2

            </li>

            <li

              :class="{ active: selectedYear === 3 }"

              @click="selectedYear = 3"

            >

              Année 3

            </li>

            <li

              :class="{ active: selectedYear === 4 }"

              @click="selectedYear = 4"

            >

              Parcours international

            </li>

          </ul>

        </div>



        <!-- Slider images -->

        <div class="overview-slider">

          <div

            class="slider-track"

            :style="{ transform: `translateX(-${(currentSlide - 1) * 100}%)` }"

          >

            <div

              class="slide"

              v-for="(img, i) in images[selectedYear]"

              :key="i"

            >

              <img :src="img" alt="aperçu programme" />

            </div>

          </div>



          <!-- Navigation -->

          <div class="slider-nav">

            <button @click="prevSlide">&#8592;</button>

            <button @click="nextSlide">&#8594;</button>

          </div>

        </div>

      </div>

    </section>

        <section class="mmi-section">

      <div class="mmi-content">

        <h2>Le BUT MMI</h2>

        <button class="mmi-btn">Explorer le programme</button>

      </div>

    </section>

  </div>

</template>



<script>

export default {

  data() {

    return {

      selectedYear: 2, // année active par défaut

      currentSlide: 1,

      images: {

        1: ["/fondaccueil.webp", "/nature.jpg", "/fondaccueil.webp"],

        2: ["/fondaccueil.webp", "/fondaccueil.webp", "/fondaccueil.webp"],

        3: ["/fondaccueil.webp", "/fondaccueil.webp", "/fondaccueil.webp"],

        4: ["/fondaccueil.webp", "/fondaccueil.webp", "/fondaccueil.webp"],

      },

    };

  },

  methods: {

    nextSlide() {

      if (this.currentSlide < this.images[this.selectedYear].length) {

        this.currentSlide++;

      }

    },

    prevSlide() {

      if (this.currentSlide > 1) {

        this.currentSlide--;

      }

    },

  },

  watch: {

    selectedYear() {

      this.currentSlide = 1; // reset au premier slide quand on change d'année

    },

  },

};

</script>



<style scoped>

/* HERO */

.page {

  overflow-x: hidden;

  font-family: "Epilogue", sans-serif;

}



.hero-section {

  background-image: url("/fondaccueil.webp");

  background-size: cover;

  background-position: center;

  background-repeat: no-repeat;

  min-height: 100vh;

  width: 100%;

  margin: 0;

  padding: 0 0 0 8%;

  display: flex;

  align-items: center;

  position: relative;

}



.hero-section::before {

  content: "";

  position: absolute;

  top: 0;

  left: 0;

  right: 0;

  bottom: 0;

  background-color: rgba(0, 0, 0, 0.4);

  z-index: 1;

}



.hero-content {

  max-width: 600px;

  color: white;

  position: relative;

  z-index: 2;

}



.hero-title {

  font-size: 2rem;

  font-weight: 700;

}



.hero-subtitle {

  font-size: 1.8rem;

  font-weight: 600;

  margin: 1rem 0;

}



.hero-btn {

  background-color: #eb5e28;

  color: white;

  border: none;

  padding: 0.9rem 1.8rem;

  margin-top: 30px;

  font-weight: 600;

  cursor: pointer;

}



.hero-btn:hover {

  background-color: #cf4f1f;

}



/* OVERVIEW */

.overview {

  padding: 4rem 8%;

}



.overview-title {

  text-align: center;

  font-size: 2.2rem;

  font-weight: 700;

  margin-bottom: 3rem;

}



.overview-content {

  display: flex;

  gap: 3rem;

  align-items: flex-start;

}



.overview-menu {

  flex: 1;

}



.overview-menu-title {

  font-weight: 700;

  font-size: 1.3rem;

  margin-bottom: 1rem;

  border-bottom: 2px solid #000;

  display: inline-block;

  padding-bottom: 0.2rem;

}



.overview-menu ul {

  list-style: none;

  padding: 0;

}



.overview-menu li {

  margin: 0.8rem 0;

  font-size: 1.1rem;

  cursor: pointer;

  transition: color 0.3s;

}



.overview-menu li.active {

  color: #eb5e28;

  font-weight: 600;

  border-bottom: 2px solid #eb5e28;

  display: inline-block;

}



.overview-slider {

  flex: 3;

  position: relative;

  overflow: hidden;

}



.slider-track {

  display: flex;

  transition: transform 0.5s ease;

}



.slide {

  min-width: 100%;

  display: flex;

  justify-content: center;

}



.slide img {

  width: 400px;

  height: 280px;

  object-fit: cover;

  border-radius: 8px;

  background: #f5f5f5;

}



.slider-nav {

  text-align: center;

  margin-top: 1rem;

}



.slider-nav button {

  background: white;

  border: 1px solid #000;

  border-radius: 50%;

  width: 36px;

  height: 36px;

  margin: 0 0.5rem;

  cursor: pointer;

}

.mmi-section {

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 5rem 10%;

  margin-top: -200px;

  font-family: "Epilogue", sans-serif;

}



.mmi-content {

  max-width: 500px;

}



.mmi-content h2 {

  font-size: 2rem;

  font-weight: 700;

  margin-bottom: 1rem;

  position: relative;

}



.mmi-content h2::after {

  content: "";

  display: block;

  width: 50px;

  height: 3px;

  background: #f2c94c; /* jaune */

  margin-top: 0.5rem;

}



.mmi-content p {

  font-size: 1rem;

  margin: 1.5rem 0;

  line-height: 1.6;

}



.mmi-btn {

  background: transparent;

  border: 1px solid black;

  padding: 0.75rem 1.5rem;

  font-weight: 500;

  cursor: pointer;

  transition: all 0.3s ease;

}



.mmi-btn:hover {

  background: black;

  color: white;

}

</style>