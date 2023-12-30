<template>
  <header>
    <img id="header-graphic" src="../public/images/header-bar.png">
  </header>
  <div id="ammokrates-logo">
    <img id="ammokrates-logo" src="../public/images/ammokrates-logo.png" alt="Ammokrates Logo">
  </div>
  <Content>
    <AlbumRelease />
  </Content>
</template>

<script>
import AlbumRelease from './components/AlbumRelease.vue'

export default {
  name: 'App',
  components: {
    AlbumRelease
  }
}
</script>

<style>

body {
  margin: 0;
  height: 100vh;
  width: 100vw;
  background: url('../public/images/bg.jpg') no-repeat center center/cover black;
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

content {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 1em;
  height: 40em;
  width: 70vw;
  max-width: 80em;
  display: flex;
  backdrop-filter: blur(10px);
}

#ammokrates-logo {
  position: relative;
  bottom: 1.5em;
}

@media screen and (max-width: 1920px) {
  header {
    width: 200%;
  }
}

</style>
