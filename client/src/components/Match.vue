<template>
  <div
    class="match"
    :class="{ 'match--is-inactive': isInactive }"
    @click="onClick"
  >
    <Song
      :track-id="match.trackA"
      :is-winner="match.winner === match.trackA"
      :is-loser="match.winner && match.winner !== match.trackA"
    />
    <Song
      :track-id="match.trackB"
      :is-winner="match.winner === match.trackB"
      :is-loser="match.winner && match.winner !== match.trackB"
    />
  </div>
</template>

<script>
import Song from './Song.vue'

export default {
  components: { Song },

  props: {
    match: {
      type: Object,
      required: true
    }
  },

  computed: {
    isInactive() {
      return !this.match.trackA || !this.match.trackB
    }
  },

  methods: {
    onClick() {
      if (!this.isInactive) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss">
.match {
  background-color: #fff;
  border-left: 4px solid #f5c12f;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  font-size: 12px;
  padding: 8px;
  transform: none;
  transition: all 0.2s;
  width: 230px;

  &:not(#{&}--is-inactive):hover {
    background-color: darken(#fff, 1%);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    color: #32325d;
    transform: translateY(-1px);
  }

  &:not(#{&}--is-inactive):active {
    background-color: darken(#fff, 3%);
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    transform: translateY(1px);
  }

  &--is-inactive {
    box-shadow: 0 2px 4px rgba(50, 50, 93, 0.08), 0 1px 2px rgba(0, 0, 0, 0.02);
    cursor: default;
    opacity: 0.5;
  }
}
</style>
