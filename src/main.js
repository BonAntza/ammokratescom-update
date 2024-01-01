import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faYoutube, faSquareFacebook, faSquareInstagram, faSpotify } from '@fortawesome/free-brands-svg-icons'
import { faAt, faArrowUpRightFromSquare, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
library.add(faSpotify, faYoutube, faSquareFacebook, faSquareInstagram, faAt, faArrowUpRightFromSquare, faCaretLeft, faCaretRight)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app');