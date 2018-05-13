const arrayOfLength = length => [...Array(length)]

const updateMatchInRound = (round, matchIndex, updatedMatch) => [
  ...round.slice(0, matchIndex),
  {
    ...round[matchIndex],
    ...updatedMatch
  },
  ...round.slice(matchIndex + 1)
]

export default {
  state: {
    artistData: null,

    tracks: [],
    rounds: []
  },

  getters: {
    getMatchesForRound: state => (roundIndex, bracketSide = null) => {
      const round = state.rounds[roundIndex]

      switch (bracketSide) {
        case 'left':
          return round.slice(0, round.length / 2)
        case 'right':
          return round.slice(round.length / 2)
        default:
          return round
      }
    },

    getTrack: state => trackId =>
      state.tracks.find(track => track.id === trackId) || null
  },

  mutations: {
    setArtist(state, artistData) {
      state.artistData = artistData
    },

    createBattle(state, tracks) {
      let sliceCount = tracks.length / 2
      const rounds = []
      while (sliceCount > 1) {
        const roundIndex = rounds.length
        rounds.push(
          arrayOfLength(sliceCount).map((match, matchIndex) => ({
            id: `${roundIndex}:${matchIndex}`,
            trackA: roundIndex === 0 ? tracks[matchIndex * 2].id : null,
            trackB: roundIndex === 0 ? tracks[matchIndex * 2 + 1].id : null,
            winner: null
          }))
        )
        sliceCount = sliceCount / 2
      }

      state.tracks = tracks
      state.rounds = rounds
    },

    setMatchWinner(state, { matchId, winnerTrackId }) {
      const { rounds } = state
      const roundsCopy = [...rounds]

      const matchRoundIndex = parseInt(matchId.split(':')[0], 10)
      const matchRound = roundsCopy[matchRoundIndex]

      const matchIndex = matchRound.findIndex(match => match.id === matchId)
      const match = roundsCopy[matchRoundIndex][matchIndex]

      // Clear matches with loser in other rounds
      const loserTrackId =
        match.trackA.id === winnerTrackId ? match.trackB : match.trackA
      for (
        let roundIndex = matchRoundIndex + 1;
        roundIndex < roundsCopy.length;
        roundIndex += 1
      ) {
        roundsCopy[roundIndex] = roundsCopy[roundIndex].map(match => {
          const loserIsTrackA = match.trackA === loserTrackId
          const loserIsTrackB = match.trackB === loserTrackId

          if (!loserIsTrackA && !loserIsTrackB) {
            return match
          }

          return {
            ...match,
            trackA: loserIsTrackA ? null : match.trackA,
            trackB: loserIsTrackB ? null : match.trackB,
            winnerTrackId: null
          }
        })
      }

      // Add track to next rounds match
      const nextRoundIndex = matchRoundIndex + 1
      if (nextRoundIndex < roundsCopy.length) {
        const nextMatchIndex = Math.floor(matchIndex / 2)
        const isNextTrackA = matchIndex % 2 === 0
        roundsCopy[nextRoundIndex] = updateMatchInRound(
          roundsCopy[nextRoundIndex],
          nextMatchIndex,
          isNextTrackA ? { trackA: winnerTrackId } : { trackB: winnerTrackId }
        )
      }

      // Set resulting state
      state.rounds = [
        ...roundsCopy.slice(0, matchRoundIndex),
        updateMatchInRound(matchRound, matchIndex, {
          ...match,
          winner: winnerTrackId
        }),
        ...roundsCopy.slice(matchRoundIndex + 1)
      ]
    }
  },

  actions: {}
}
