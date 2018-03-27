import { showSection, getSectionElement } from '../section-handler'
import { go } from '../browser-router'

import fakeArtists from '../dev-json/artists'
import fakeTracks from '../dev-json/tracks'

export default class Battle {
  artistNameEl = document.querySelector('[data-artist-name]')
  artistImageEl = document.querySelector('[data-artist-image]')
  songAEl = document.querySelector('[data-battle-song="a"]')
  songBEl = document.querySelector('[data-battle-song="b"]')

  artist = null
  tracks = []

  constructor() {
    const artist = window.history.state
    if (artist && artist.id) {
      this.setArtist(artist)
    } else {
      const [, , artistId] = window.location.pathname
      if (!artistId) {
        return go('/')
      }

      this.fetchArtist(artistId)
    }

    this.onSongSelect = this.onSongSelect.bind(this)

    this.songAEl
      .querySelector('[data-select-song]')
      .addEventListener('click', this.onSongSelect)
    this.songBEl
      .querySelector('[data-select-song]')
      .addEventListener('click', this.onSongSelect)
  }

  deactivate() {
    this.songAEl
      .querySelector('[data-select-song]')
      .removeEventListener('click', this.onSongSelect)
    this.songBEl
      .querySelector('[data-select-song]')
      .removeEventListener('click', this.onSongSelect)
  }

  async fetchArtist(artistId) {
    showSection('fetch-artist')

    const fakeRequest = new Promise((resolve, reject) =>
      setTimeout(() => {
        const artist = fakeArtists.find(artist => (artist.id = artistId))
        artist ? resolve(artist) : reject(new Error())
      }, 300)
    )

    fakeRequest.then(artist => this.setArtist(artist), () => go('/'))
  }

  async setArtist(artist) {
    showSection('fetch-battle')

    this.artist = artist

    const fakeRequest = new Promise(resolve =>
      setTimeout(() => {
        resolve(fakeTracks)
      }, 800)
    )

    const tracks = await fakeRequest
    this.initializeBattle(tracks)
  }

  initializeBattle(tracks) {
    showSection('battle')

    this.tracks = tracks
    this.currentTracks = [...tracks]
    this.stages = [[]]

    this.artistNameEl.innerHTML = this.artist.name
    this.artistImageEl.src = this.artist.images.reduce(
      (res, cur) => (cur.width < res.width ? cur : res)
    ).url

    this.nextBattle()
  }

  nextBattle() {
    const songA = this.currentTracks.shift()
    const songB = this.currentTracks.shift()

    this.renderSong(songA, this.songAEl)
    this.renderSong(songB, this.songBEl)
  }

  renderSong(song, songEl) {
    songEl.setAttribute('data-song-id', song.id)

    songEl.querySelector('[data-song-name]').innerHTML = song.name

    songEl.querySelector('[data-song-image]').src = song.album.images.find(
      image => image.width === 300
    ).url

    songEl.querySelector('[data-song-audio]').src = song.preview_url
  }

  onSongSelect(event) {
    const songEl = event.target.closest('[data-song-id]')
    const songId = songEl.dataset.songId

    const song = this.tracks.find(song => song.id === songId)

    const currentStage = this.stages[this.stages.length - 1]
    currentStage.push(song)

    if (this.currentTracks.length === 0) {
      if (currentStage.length === 1) {
        return this.showWinner()
      } else {
        this.currentTracks = [...currentStage]
        this.stages.push([])
      }
    }

    this.nextBattle()
  }

  showWinner() {
    showSection('winner')

    const winner = this.stages[this.stages.length - 1][0]
    const winnerEl = getSectionElement('winner')

    winnerEl.querySelector('[data-song-image]').src = winner.album.images.find(
      image => image.width === 640
    ).url

    winnerEl.querySelector('[data-song-name]').innerHTML = winner.name
  }
}
