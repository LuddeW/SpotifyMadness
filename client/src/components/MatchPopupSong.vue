<template>
  <div class="match-popup-song">
    <img
      class="match-popup-song__image"
      :src="trackImage.url"
    />

    <audio
      :src="trackPreview"
      v-if="trackPreview"
      controls
      preload="auto"
    >
    </audio>

    <div class="match-popup-song__name">
      {{ track.name }}
    </div>

    <button
      class="match-popup-song__select"
      @click="select"
    >
      Select
    </button>
  </div>
</template>

<script>
import { mediumImage } from '../utils/spotifyImage'

export default {
  props: {
    trackId: String
  },

  computed: {
    track() {
      return this.$store.getters.getTrack(this.trackId)
    },

    trackPreview() {
      return this.track.preview_url
    },

    trackImage() {
      return mediumImage(this.track.album.images)
    }
  },

  methods: {
    select() {
      this.$emit('select')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../variables';

.match-popup-song {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 300px;

  &:first-child {
    margin-right: 64px;
  }

  &__image {
    height: 300px;
    width: 300px;
  }

  &__name {
    font-size: 20px;
    margin: 8px 0 16px;
  }

  &__select {
    background-color: $green;
    color: $white;
    margin-top: auto;
    padding: 8px 64px;
  }
}
</style>


