<template>
  <div class="bracket">
    <div class="bracket__inner">
      <div
        class="bracket__round"
        v-for="roundIndex in [0, 1, 2]"
        :key="`${roundIndex}:left`"
      >
        <Match
          v-for="match in getMatchesForRound(roundIndex, 'left')"
          :key="match.id"
          :match="match"
          @click="activeMatch = match"
        />

        <div
          class="bracket__dividers"
          v-if="roundIndex !== 2"
        >
          <div
            class="bracket__dividers-section"
            v-for="(_, dividerIndex) in Array(2 - roundIndex)"
            :key="dividerIndex"
            :style="{ height: `${50 / (2 - roundIndex)}%` }"
          ></div>
        </div>
      </div>

      <div
        class="bracket__round"
        v-for="roundIndex in [2, 1, 0]"
        :key="`${roundIndex}:right`"
      >
        <Match
          v-for="match in getMatchesForRound(roundIndex, 'right')"
          :key="match.id"
          :match="match"
          @click="activeMatch = match"
        />
      </div>
    </div>

    <MatchPopup
      v-if="activeMatch !== null"
      :match="activeMatch"
      @close="activeMatch = null"
    />
  </div>
</template>

<script>
import MatchPopup from './MatchPopup.vue'
import Match from './Match.vue'

export default {
  components: { MatchPopup, Match },

  data: () => ({
    activeMatch: null
  }),

  methods: {
    getMatchesForRound(...args) {
      return this.$store.getters.getMatchesForRound(...args)
    }
  }
}
</script>

<style lang="scss" scoped>
.bracket {
  $width: 1600px + (32px * 2);

  margin: 0 auto;
  max-width: $width;
  overflow-x: auto;

  &__inner {
    display: flex;
    height: 800px;
    padding: 0 32px;
    width: $width;
  }

  &__dividers,
  &__round {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  &__round {
    flex: 1;
    position: relative;

    &:nth-child(n + 4) {
      align-items: flex-end;
    }
  }

  &__dividers {
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    width: calc(100% - 230px);

    &-section {
      border: 1px solid rgba(#525f7f, 0.25);
      border-bottom-right-radius: 10px;
      border-left-width: 0;
      border-top-right-radius: 10px;
      margin-right: 8px;
      position: relative;

      &::after {
        background-color: rgba(#525f7f, 0.25);
        content: '';
        height: 1px;
        left: 100%;
        position: absolute;
        top: 50%;
        width: 8px;
      }
    }
  }
}
</style>
