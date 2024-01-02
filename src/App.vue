<template>
  <header>
    <img id="header-graphic" src="../public/images/header-bar.png">
  </header>
  <div id="ammokrates-logo">
    <img src="../public/images/ammokrates-logo.png" alt="Ammokrates Logo">
  </div>
  <div id="page-content">
    <div id="slide-buttons">
      <div class="slide-button" :class="{ 'selected-release': selectedSlide === index }" v-for="(release, index) in albumReleases" :key="index" @click="handleButtonClick(index)">•</div>
    </div>
    <div id="content-wrapper">
      <font-awesome-icon class="slide-change-icon" :icon="['fas', 'caret-left']" @click="handleCaretClick('left')" />
      <div id='content'>
        <div id="carousel-wrapper">
          <div id='carousel' ref="carousel" >
            <div ref="slide" class="release" v-for="(release, index) in albumReleases" :key="index">
              <AlbumRelease :release="index" />
            </div>
          </div>
        </div>
      </div>
      <font-awesome-icon class="slide-change-icon" :icon="['fas', 'caret-right']" @click="handleCaretClick('right')" />
    </div>
    <div id="band-info">
      <div class="band-member">
        <div class="band-member-name">Ilkka Koski</div>
        <div class="band-member-duties">Vocals, Bass</div>
      </div>
      <div class="band-member">
        <div class="band-member-name">Antti Oinonen</div>
        <div class="band-member-duties">Guitars, drums, keyboard</div>
      </div>
    </div>
  </div>
  <footer>
    <div id="some-icons">
      <font-awesome-icon @click="clickSomeLink('spotify')" class="slide-change-icon" :icon="['fab', 'spotify']" />
      <font-awesome-icon @click="clickSomeLink('youtube')" class="slide-change-icon" :icon="['fab', 'youtube']" />
      <font-awesome-icon @click="clickSomeLink('facebook')" class="slide-change-icon" :icon="['fab', 'square-facebook']" />
      <font-awesome-icon @click="clickSomeLink('instagram')" class="slide-change-icon" :icon="['fab', 'square-instagram']" />
    </div>
    <div id="footer-text">
      All copyrights by Ammokrates. Web design by Bon Antza SpecOps. Web page icons by <a id="font-awesome-link" href="https://fontawesome.com/license" target="_blank">fontawesome</a>.
    </div>
  </footer>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import AlbumRelease from './components/AlbumRelease.vue'

/**
 * Turns the carousel from a given slide to another.
 * @param {number} fromSlide - Starting slide.
 * @param {number} toSlide - Target slide.
 */
function turnCarousel(fromSlide, toSlide, setSelectedSlide) {
  const releases = document.querySelectorAll('.release');
  const carousel = document.getElementById('carousel');

  if (releases.length > 0 && carousel) {
    const releaseWidth = releases[0].getBoundingClientRect().width;
    const turns = toSlide - fromSlide;
    const turnsWidth = turns * releaseWidth;
    const currentLeft = parseInt(carousel.style.left, 10) || 0;
    const newLeft = currentLeft - turnsWidth;

    setTimeout(() => {
      carousel.style.left = `${newLeft}px`;
      setSelectedSlide(toSlide);
    }, 10);
  }
}

export default {
  name: 'App',
  components: {
    AlbumRelease,
  },
  mounted() {
    const parentWidth = this.$refs.carousel.offsetWidth;
    const reduction = 2 * 2 * 2 * parseFloat(getComputedStyle(document.body).fontSize);
    const adjustedWidth = (parentWidth - reduction) / 28.6;

    if (this.$refs.slide && this.$refs.slide.length) {
      this.$refs.slide.forEach((slideElement) => {
        slideElement.style.width = `${adjustedWidth}%`;
      });
    }
  },
  methods: {
    clickSomeLink(some) {
      let url;
      switch (some) {
        case 'spotify':
          url = 'https://open.spotify.com/artist/1ligbbndQQ73wDO19csaZc';
          break;
        case 'youtube':
          url = 'https://www.youtube.com/channel/UCczprvQL9QMzmz1tsGAoo6g/videos';
          break;
        case 'facebook':
          url = 'https://www.facebook.com/Ammokratesofficial/';
          break;
        case 'instagram':
          url = 'https://www.instagram.com/ammokrates/?hl=en';
          break;
        default:
          break;
      }
      window.open(url, '_blank');
    },
    /**
     * Handles button click of the carousel buttons.
     * @param {number} index - The index the user has clicked on.
     */
    handleButtonClick(index) {
      this.turnCarouselWrapper(this.selectedSlide, index);
    },
    /**
     * Handles caret button click on the carousel (left or right).
     * @param {string} dir - The direction where the user is navigating in the carousel. 
     */
    handleCaretClick(dir) {
      let nextSlide;
      let currentSlideIndex;
      const slidesCount = this.albumReleases.length;

      // Get the index of currentSlide.
      this.albumReleases.forEach((albumRelease, index) => {
        if (this.selectedSlide === index) {
          currentSlideIndex = index;
          return;
        }
      });

      // Sliding the carousel left (but not when the first slide is already selected).
      if (dir === 'left' && currentSlideIndex !== 0) {
        nextSlide = currentSlideIndex - 1;
      // Sliding the carousel right (but not when at the end of the carousel).
      } else if (dir === 'right' && currentSlideIndex !== (slidesCount-1)) {
        nextSlide = currentSlideIndex + 1;
      }

      // Carousel turn is possible.     
      if (nextSlide !== undefined) {
        this.turnCarouselWrapper(currentSlideIndex, nextSlide);
      }
    },
    turnCarouselWrapper(fromSlide, toSlide) {
      turnCarousel(fromSlide, toSlide, (newSlide) => { this.selectedSlide = newSlide});
    }
  },
  setup() {
    const albumReleases = ref([
      'ammokratic-oath',
      'legends',
      'echoes-between-the-stars',
    ]);
    const selectedSlide = ref(0);
    const carousel = ref(null);
    let startX, startLeft, endX;

    const startDrag = (event) => {
      event = event.type.includes('mouse') ? event : event.touches[0];
      startX = event.clientX;
      startLeft = parseInt(carousel.value.style.left, 10) || 0;

      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', stopDrag);
      document.addEventListener('touchmove', onDrag);
      document.addEventListener('touchend', stopDrag);
    };

    const onDrag = (event) => {
      event.preventDefault();
      event = event.type.includes('mouse') ? event : event.touches[0];
      endX = event.clientX;
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchmove', onDrag);
      document.removeEventListener('touchend', stopDrag);

      const dragLeft = endX < startX;
      const slidesCount = albumReleases.value.length;
      let newSlide;

      if (dragLeft && selectedSlide.value < slidesCount - 1) {
        // Dragged left, move to next slide
        newSlide = selectedSlide.value + 1;
      } else if (!dragLeft && selectedSlide.value > 0) {
        // Dragged right, move to previous slide
        newSlide = selectedSlide.value - 1;
      }

      if (newSlide !== undefined) {
        turnCarousel(selectedSlide.value, newSlide, (updatedSlide) => {
          selectedSlide.value = updatedSlide;
        });
      }
    };

    onMounted(() => {
      if (carousel.value) {
        carousel.value.addEventListener('mousedown', startDrag);
        carousel.value.addEventListener('touchstart', startDrag);
      }
    });

    onUnmounted(() => {
      if (carousel.value) {
        carousel.value.removeEventListener('mousedown', startDrag);
        carousel.value.removeEventListener('touchstart', startDrag);
      }
    });

    return { carousel, albumReleases, selectedSlide };
  }
}
</script>

<style>

:root {
  --main-font: 'Karla', Helvetica;
  --band-info-font: 'Karla', sans-serif;
}

::selection {
  background: black;
  color: #aaa;
}

body {
  margin: 0;
  height: 100vh;
  width: 100vw;
  background: url('../public/images/bg2.jpg') no-repeat center center/cover black;
  overflow: hidden;
  display: flex;
  font-size: 50%;
}

#app {
  font-family: var(--main-font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

#page-content {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

header {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
}

#some-icons {
  position: relative;
  bottom: 0.8vh;
}

#some-icons svg {
  color: #ffe5ca;
  font-size: 1.8vh;
  margin: 0 0.7vh;
  opacity: 0.9;
}

#some-icons svg:hover {
  opacity: 0.4;
}

footer {
  font-family: var(--main-font);
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.6;
  backdrop-filter: blur(0.5vh);
  flex-direction: column;
}

#footer-text {
  text-align: center;
  color: white;
  font-size: 1.2vh;
}

#footer-text #font-awesome-link {
  color: white;
}

#footer-text #font-awesome-link:hover {
  text-decoration: none;
}

#header-graphic {
  height: 100%;
}

#slide-buttons {
  position: relative;
  bottom: 5%;
  display: flex;
  justify-content: center;
}

.slide-button, .slide-change-icon {
  font-size: 4vh;
  color: #181716;
  text-shadow: 0em 0em 0.7em black;
  margin: 0 0.5em;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.slide-button:hover, .slide-change-icon:hover {
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.slide-button.selected-release {
  opacity: 0.6;
}

#content {
  background: rgba(0, 0, 0, 0.3);
  border-radius: .5em;
  height: 43vh;
  width: 70vh;
  max-width: 130%;
  backdrop-filter: blur(0.5vh);
  overflow: hidden;
  padding: 3%;
  box-sizing: border-box;
}

#content-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  bottom: 5%;
}

#carousel-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.slide-change-icon {
  font-size: 6vh;
  margin: 0 0.1vh;
}

#carousel {
  display: flex;
  position: absolute;
  left: 0%;
  transition: left 0.5s ease-out;
  cursor: default;
}

#ammokrates-logo {
  position: relative;
  bottom: 4%;
  height: 15%;
  text-align: center;
}

#ammokrates-logo img {
  height: 100%;
}

.release:not(:last-child) {
  padding-right: 3vh;
}

.release {
  user-select: none;
}

#band-info {
  display: flex;
  flex-wrap: wrap;
  font-family: var(--band-info-font);
  color: #ffe5ca;
  margin: 0 auto;
}

.band-member {
  text-align: center;
  flex: 1;
  margin: 0 2vh;
}

.band-member-name {
  font-size: 2vh;
  text-wrap: nowrap;
}

.band-member-duties {
  margin-top: 0.5vh;
  text-wrap: nowrap;
  font-size: 1.2vh;
}

/* @media screen and (max-width: 1920px) {
  header {
    width: 200%;
  } */
/* } */

</style>
