import { shallowMount } from '@vue/test-utils'
import AlbumRelease from '@/components/AlbumRelease.vue'

describe('AlbumRelease.vue', () => {
  xit('renders props.msg when passed', () => {
    const msg = 'Album cover image'
    const wrapper = shallowMount(AlbumRelease, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
