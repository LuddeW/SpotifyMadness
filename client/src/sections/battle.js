import { showSection } from '../section-handler'
import { go } from '../browser-router'

import fakeArtists from '../dev-json/artists'
import fakeTracks from '../dev-json/tracks'

export default class Battle {
  artistNameEl = document.querySelector('[data-artist-name]')
  artistImageEl = document.querySelector('[data-artist-image]')

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
  }

  async fetchArtist(artistId) {
    showSection('fetch-artist')

    const fakeRequest = new Promise((resolve, reject) =>
      setTimeout(() => {
        const artist = fakeArtists.find(artist => (artist.id = artistId))
        artist ? resolve(artist) : reject(new Error())
      }, 300)
    )

    try {
      const artist = await fakeRequest
      this.setArtist(artist)
    } catch (exception) {
      go('/')
    }
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

    this.artistNameEl.innerHTML = this.artist.name
    this.artistImageEl.src = this.artist.images.reduce(
      (res, cur) => (cur.width < res.width ? cur : res)
    ).url
  }
}
