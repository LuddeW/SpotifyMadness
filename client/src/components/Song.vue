<template>
  <div
    class="song"
    :class="{
      'song--is-winner': isWinner,
      'song--is-loser': isLoser
    }"
  >
    <span
      class="song__image"
      v-if="!trackImage"
    ></span>
    <img
      class="song__image"
      v-else
      :src="trackImage.url"
    />
    <span class="song__name">
      {{ track && track.name }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    trackId: String,
    isWinner: Boolean,
    isLoser: Boolean
  },

  computed: {
    track() {
      return this.$store.getters.getTrack(this.trackId)
    },

    trackImage() {
      if (!this.track) {
        return
      }

      return this.track.album.images.reduce(
        (res, cur) => (cur.width < res.width ? cur : res),
        { width: Infinity }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.song {
  align-items: center;
  color: #525f7f;
  display: flex;

  &:first-child {
    margin-bottom: 8px;
  }

  &__image {
    background-color: #ddd;
    border-radius: 50%;
    display: inline-block;
    flex: 0 0 auto;
    height: 40px;
    margin-right: 8px;
    width: 40px;
  }

  &__name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &--is-winner & {
    &__name {
      border-bottom: 1px solid;
      font-weight: 600;
    }
  }

  &--is-loser {
    opacity: 0.25;
  }

  &--is-loser & {
    &__name {
      font-weight: normal;
    }
  }
}
</style>


