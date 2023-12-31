<template>
  <header>
    <img id="header-graphic" src="../public/images/header-bar.png">
  </header>
  <div id="ammokrates-logo">
    <img id="ammokrates-logo" src="../public/images/ammokrates-logo.png" alt="Ammokrates Logo">
  </div>
  <div id="slide-buttons">
    • • •
  </div>
  <div ref="carousel" id='content'>
    <div id='carousel'>
      <div ref="slide" class="release" v-for="release in albumReleases" :key="release">
        <AlbumRelease :release="release" />
      </div>
    </div>
  </div>
</template>

<script>
import AlbumRelease from './components/AlbumRelease.vue'

export default {
  name: 'App',
  data() {
    return {
      albumReleases: [
        'ammokratic-oath',
        'legends',
        'echoes-between-the-stars',
      ],
    }
  },
  components: {
    AlbumRelease,
  },
  mounted() {
    const parentWidth = this.$refs.carousel.offsetWidth;
    console.log(parentWidth);
    const reduction = 2 * 2 * parseFloat(getComputedStyle(document.body).fontSize);
    const adjustedWidth = parentWidth - reduction;
    console.log(adjustedWidth);
    if (this.$refs.slide && this.$refs.slide.length) {
      this.$refs.slide.forEach((slideElement) => {
        slideElement.style.width = `${adjustedWidth}px`;
      });
    }
  },
}
</script>

<style>

body {
  margin: 0;
  height: 100vh;
  width: 100vw;
  background: url('../public/images/bg2.jpg') no-repeat center center/cover black;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

header {
  width: 100%;
}

#header-graphic {
  width: 100%;
}

#slide-buttons {
  position: relative;
  bottom: 1em;
  font-size: 3em;
}

#content {
  background: rgba(0, 0, 0, 0.3);
  border-radius: .5em;
  height: 40em;
  width: 70vw;
  max-width: 80em;
  backdrop-filter: blur(10px);
  padding: 2em;
  position: relative;
  bottom: 3em;
  /* overflow: hidden; */
}

#carousel {
  display: flex;
  position: absolute;
}

#ammokrates-logo {
  position: relative;
  bottom: 2em;
}

.release:not(:last-child) {
  margin-right: 4em;
}

@media screen and (max-width: 1920px) {
  header {
    width: 200%;
  }
}

</style>
