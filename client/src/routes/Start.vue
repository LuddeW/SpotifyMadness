<template>
  <section>
    <h1>Music Madness</h1>
    <p>
      Search for the artist or band you want to make a bracket with.
    </p>

    <input
      type="text"
      placeholder="Artist or band..."
      @input="onInput"
    />

    <ul>
      <li
        v-for="artist in searchedArtists"
        :key="artist.id"
      >
        <router-link
          :to="{ name: 'battle', params: { artistId: artist.id } }"
        >
          <img
            :src="smallImageSrc(artist)"
          />
          {{ artist.name }}
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import { get } from '../api'

export default {
  data: () => ({
    searchedArtists: [],

    pendingRequest: null
  }),

  methods: {
    async onInput(event) {
      const { value } = event.target

      if (value === 0) {
        this.searchedArtists.length = 0
      }

      if (value.length <= 1) return

      const request = (this.pendingRequest = get(
        `/api/spotify/search/${value}`
      ))
      const response = await this.pendingRequest

      if (request !== this.pendingRequest) return

      this.searchedArtists = response
    },

    smallImageSrc: artist =>
      (
        artist.images.reduce(
          (res, cur) => (cur.width < res.width ? cur : res),
          {
            width: Infinity
          }
        ) || {}
      ).url
  }
}
</script>

