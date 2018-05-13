<template>
  <section class="battle">

    <div v-if="isFetching">
      Fetching battle...
    </div>

    <div v-else>
      <div class="battle__meta">
        <div class="battle__artist">
          <img
            class="battle__artist-image"
            :src="artistImage.url"
          />
          <h1 class="battle__artist-name">
            {{ artist.name }}
          </h1>
        </div>
      </div>

      <Bracket />
    </div>

  </section>
</template>

<script>
import fakeArtists from '../dev-json/artists'
import fakeTracks from '../dev-json/tracks'

import Bracket from '../components/Bracket.vue'

export default {
  components: { Bracket },

  data: () => ({
    fetchRequest: null
  }),

  computed: {
    isFetching() {
      const { battle } = this.$store.state
      return (
        (!battle.tracks || !battle.tracks.length) && this.fetchRequest !== null
      )
    },

    artist() {
      return this.$store.state.battle.artistData
    },

    artistImage() {
      if (!this.artist) {
        return
      }

      return this.artist.images.reduce(
        (res, cur) => (cur.width < res.width ? cur : res)
      )
    }
  },

  methods: {
    getMatchesForRound(...args) {
      return this.$store.getters.getMatchesForRound(...args)
    },

    setMatchWinner(matchId, winnerTrackId) {
      return this.$store.commit('setMatchWinner', { matchId, winnerTrackId })
    }
  },

  // Lifecycle hooks
  async created() {
    this.fetchRequest = new Promise(resolve => setTimeout(resolve, 1000))

    await this.fetchRequest

    this.$store.commit(
      'setArtist',
      fakeArtists.find(artist => artist.id === this.$route.params.artistId) ||
        fakeArtists[0]
    )
    this.$store.commit('createBattle', fakeTracks)
  }
}
</script>

<style lang="scss" scoped>
.battle {
  &__meta {
    margin: 0 auto;
    max-width: 1664px;
    padding: 0 32px;
  }

  &__artist {
    align-items: center;
    display: flex;

    &-image {
      border-radius: 50%;
      flex: 0 0 auto;
      height: 128px;
      width: 128px;
    }

    &-name {
      font-size: 48px;
      font-weight: bold;
      line-height: 48px;
      margin-left: 16px;
      text-transform: uppercase;
      width: 0;

      &::first-letter {
        font-size: 64px;
      }
    }
  }
}
</style>

