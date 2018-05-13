import { get } from '../api'
import { showSection } from '../section-handler'
import { go } from '../browser-router'

export default class Search {
  sectionEl = document.querySelector('[data-section="search"]')
  inputEl = this.sectionEl.querySelector('[data-search-input]')
  resultListEl = this.sectionEl.querySelector('[data-result-list]')
  resultItemTemplateEl = this.sectionEl.querySelector('[data-result-item]')

  pendingRequest = null
  artistsResult = null

  constructor() {
    showSection('search')

    this.onResultItemClick = this.onResultItemClick.bind(this)
    this.onSearchInput = this.onSearchInput.bind(this)

    this.inputEl.addEventListener('input', this.onSearchInput)
    this.inputEl.focus()
    this.inputEl.value = ''

    this.clearResultItems()
  }

  deactivate() {
    this.resultListEl.appendChild(this.resultItemTemplateEl)
    this.inputEl.removeEventListener('input', this.onSearchInput)
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
    const element = event.target.closest('[data-result-item]')
    const { artistId } = element.dataset

    const artist = this.artistsResult.find(artist => artist.id === artistId)
    console.log(artistId, artist)

    go(`battle/${artist.id}`, artist)
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

      element.dataset.artistId = artist.id

      const image = artist.images.reduce(
        (res, cur) => (cur.width < res.width ? cur : res),
        { width: Infinity }
      )

      element.querySelector('[data-result-item-image]').src = image.url
      element.querySelector('[data-result-item-name]').innerHTML = artist.name

      element
        .querySelector('[data-result-item-btn]')
        .addEventListener('click', this.onResultItemClick)

      resultListEl.appendChild(element)
    })
  }
}
