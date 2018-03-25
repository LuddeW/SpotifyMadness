export default class Battle {
  artistNameEl = document.querySelector('[data-artist-name]')

  constructor(artist) {
    this.artistNameEl.innerHTML = artist.name
  }
}
