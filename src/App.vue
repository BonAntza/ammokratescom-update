<template>
  <header>
    <img id="header-graphic" src="../public/images/header-bar.png" alt="Rock and lava header bar graphic">
  </header>
  <div id="ammokrates-logo">
    <img src="../public/images/ammokrates-logo.png" alt="Ammokrates Band Logo">
  </div>
  <div id="page-content">
    <div id="slide-buttons">
      <div class="slide-button" :class="{ 'selected-release': selectedSlide === index }" v-for="(release, index) in albumReleases" :key="index" @click="handleButtonClick(index)">•</div>
    </div>
    <div id="content-wrapper">
      <font-awesome-icon class="slide-change-icon" :icon="['fas', 'caret-left']" @click="() => handleCaretClick('left')" />
      <div id='content'>
        <div id='carousel' :ref="setCarouselRef">
          <div v-for="(release, index) in albumReleases" :key="index" class="release">
            <AlbumRelease :release="index" />
          </div>
        </div>
      </div>
      <font-awesome-icon class="slide-change-icon" :icon="['fas', 'caret-right']" @click="() => handleCaretClick('right')" />
    </div>
    <div id="band-info">
      <div class="band-member">
        <div class="band-member-name">Ilkka Koski</div>
        <div class="band-member-duties">Vocals, Bass</div>
      </div>
      <div class="band-member">
        <div class="band-member-name">AJ Oinonen</div>
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
      Contact: ammokrates<font-awesome-icon :icon="['fa', 'at']" />gmail.com. Web design by Bon Antza SpecOps. Web page icons by <a id="font-awesome-link" href="https://fontawesome.com/license" target="_blank">fontawesome</a>.
    </div>
  </footer>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import AlbumRelease from './components/AlbumRelease.vue';
import './ammostyles.css';

export default {
  name: 'App',
  components: {
    AlbumRelease,
  },
  setup() {
    const albumReleases = ref(['ammokratic-oath', 'legends', 'echoes-between-the-stars']);
    const selectedSlide = ref(0);
    const carousel = ref(null);

    const setCarouselRef = (el) => {
      carousel.value = el;
    };

    /**
     * Opens a new tab with the specified social media link.
     * @param {string} some - The name of the social media platform.
     */
    const clickSomeLink = (some) => {
      const urls = {
        spotify: 'https://open.spotify.com/artist/1ligbbndQQ73wDO19csaZc',
        youtube: 'https://www.youtube.com/channel/UCczprvQL9QMzmz1tsGAoo6g/videos',
        facebook: 'https://www.facebook.com/Ammokratesofficial/',
        instagram: 'https://www.instagram.com/ammokrates/?hl=en',
      };
      const url = urls[some];
      if (url) window.open(url, '_blank');
    };

    /**
     * Handles the click event on the slide buttons.
     * @param {number} index - The index of the clicked slide.
     */
    const handleButtonClick = (index) => {
      turnCarousel(selectedSlide.value, index);
    };

    /**
     * Handles the click event on the caret icons.
     * @param {string} dir - The direction of the caret click ('left' or 'right').
     */
    const handleCaretClick = (dir) => {
      let nextSlide = dir === 'left' ? Math.max(0, selectedSlide.value - 1) : Math.min(albumReleases.value.length - 1, selectedSlide.value + 1);
      turnCarousel(selectedSlide.value, nextSlide);
    };

    /**
     * Turns the carousel to display the specified slide.
     * @param {number} fromSlide - The index of the current slide.
     * @param {number} toSlide - The index of the target slide.
     */
    const turnCarousel = (fromSlide, toSlide) => {
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
          selectedSlide.value = toSlide;
        }, 10);
      }
    };

    return {
      albumReleases,
      selectedSlide,
      setCarouselRef,
      clickSomeLink,
      handleButtonClick,
      handleCaretClick,
    };
  },
};
</script>