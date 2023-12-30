<template>
  <header>
    Header
  </header>
  <div id="ammokrates-logo">
    AMMOLOGO
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
