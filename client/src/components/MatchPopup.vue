<template>
  <div
    class="match-popup"
  >
    <button
      class="match-popup__close"
      @click="close"
    >
      Close
    </button>

    <div class="match-popup__content">
      <MatchPopupSong
        :track-id="match.trackA"
        @select="setWinner(match.trackA)"
      />

      <MatchPopupSong
        :track-id="match.trackB"
        @select="setWinner(match.trackB)"
      />
    </div>
  </div>
</template>

<script>
import MatchPopupSong from './MatchPopupSong.vue'

export default {
  components: { MatchPopupSong },

  props: {
    match: {
      type: Object,
      required: true
    }
  },

  methods: {
    setWinner(winnerTrackId) {
      this.$store.commit('setMatchWinner', {
        matchId: this.match.id,
        winnerTrackId
      })
      this.close()
    },

    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../variables';

.match-popup {
  background-color: rgba($white, 0.85);
  display: flex;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;

  &__close {
    position: absolute;
    right: 32px;
    text-transform: uppercase;
    top: 32px;
  }

  &__content {
    background-color: $white;
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    display: flex;
    margin: auto;
    padding: 64px;
  }
}
</style>
