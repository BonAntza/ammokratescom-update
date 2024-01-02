<template>
  <div class="release-wrapper">
    <h2>{{ releaseData.title }}</h2>
    <div class="album-info">
      <img class="info-section" :src="'../images/' + releaseData.imgId + '.jpg'">
      <div class="info-section">
        <div class="songs">
          <div v-for="(song, index) in releaseData.songList" :key="index">
            {{ index + 1 + ". " + song }}
            <span class="link-data" v-if="releaseData.linkData && releaseData.linkData[releaseData.imgId]">
              <a target="_blank" :href="releaseData.linkData[releaseData.imgId]">(Lyric Video <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'arrow-up-right-from-square']" />)</a>
            </span>
          </div>
        </div>
        <div class="release-info">
          Released in {{ releaseData.year }}<br/>
          Music and lyrics written by Ammokrates
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumRelease',
  props: {
    release: Number
  },
  computed: {
    releaseData() {
      let albumInfo = {};
      switch (this.release) {
        case 0:
          albumInfo = {
            title: 'Ammokratic Oath',
            year: 2022,
            songList: [
              'Ammokratic Oath'
            ],
            imgId: 'ammokratic-oath',
            linkData: {
              'ammokratic-oath': 'https://www.youtube.com/watch?v=ink0Dp16sEw'
            }
          };
          break;
        case 1:
          albumInfo = {
            title: 'Legends',
            year: 2021,
            songList: [
              'Tides of Battle',
              'Legends',
              'Fairway'
            ],
            imgId: 'legends',
          };
          break;
        case 2:
          albumInfo = {
            title: 'Echoes Between the Stars',
            year: 2020,
            songList: [
              'Vanguard',
              'Hastur',
              'Dawnbreaker',
              'The Last Fleet'
            ],
            imgId: 'echoes-between-the-stars',
          };
          break;
        default:
          break;
      }
      return albumInfo;
    }
  },
}
</script>

<style scoped>

a {
  color: rgb(224, 202, 159);
  text-decoration: none;
  transition: opacity 0.3s ease;
}

a:hover {
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

h2 {
  padding-bottom: 0.7vh;
  margin: 0 0 1vh 0;
  font-size: 1.8vh;
  font-weight: normal;
}

.release-wrapper {
  color: white;
}

.info-section {
  width: 33vh;
  margin: 1vh;
  font-size: 1.3vh;
}

img.info-section {
  box-shadow: 0 0 0.8em #00000096;
}

.album-info {
  display: flex;
}

.release-year {
  font-size: 0.8em;
}

.release-info {
  margin-top: 1em;
}

.link-data .font-awesome-icon {
  margin: 0 0.2em;
  font-size: 0.8em;
  position: relative;
  bottom: 0.1em;
}

</style>
