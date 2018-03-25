import { get } from '../api'
import router from '../router'

export default class Search {
  inputEl = document.querySelector('[data-search-input]')
  resultListEl = document.querySelector('[data-result-list]')
  resultItemTemplateEl = document.querySelector('[data-result-item]')

  pendingRequest = null
  artistsResult = null

  constructor() {
    this.onResultItemClick = this.onResultItemClick.bind(this)

    this.resultListEl.removeChild(this.resultItemTemplateEl)

    this.inputEl.addEventListener('input', this.onSearchInput.bind(this))
  }

  async onSearchInput() {
    const searchTerms = this.inputEl.value

    if (searchTerms.length === 0) this.clearResultItems()
    if (searchTerms.length <= 1) return

    const request = (this.pendingRequest = get(
      `/api/spotify/search/${searchTerms}`
    ))
    const response = await this.pendingRequest

    if (request !== this.pendingRequest) return

    this.renderArtists(response)
  }

  onResultItemClick(event) {
    const { artistId } = event.target.dataset

    const artist = this.artistsResult.find(artist => artist.id === artistId)
    console.log(artistId, artist)

    router.showSection('battle', artist)
  }

  clearResultItems() {
    const { resultListEl } = this
    while (resultListEl.hasChildNodes()) {
      resultListEl.removeChild(resultListEl.lastChild)
    }
  }

  renderArtists(artists) {
    this.clearResultItems()

    const { resultListEl, resultItemTemplateEl } = this

    this.artistsResult = artists

    artists.forEach(artist => {
      const element = resultItemTemplateEl.cloneNode(true)
      element.innerHTML = artist.name
      element.dataset.artistId = artist.id

      element.addEventListener('click', this.onResultItemClick)

      resultListEl.appendChild(element)
    })
  }
}
