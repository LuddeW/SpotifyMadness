import Battle from './sections/battle'
import Search from './sections/search'

const sectionClassname = 'section'
const activeSectionClassName = 'section--is-active'

class Router {
  activeSection = null

  showSection(sectionName, ...args) {
    let NewSectionComponent

    switch (sectionName) {
      case 'battle':
        NewSectionComponent = Battle
        break
      case 'search':
        NewSectionComponent = Search
        break
    }

    this._showSectionElement(sectionName)
    this.activeSection = new NewSectionComponent(...args)
  }

  getSectionElement(sectionName) {
    return document.querySelector(`[data-section="${sectionName}"]`)
  }

  _showSectionElement(sectionName) {
    const currentActiveSections = document.getElementsByClassName(
      sectionClassname
    )
    for (let i = 0; i < currentActiveSections.length; i++) {
      currentActiveSections[i].classList.remove(activeSectionClassName)
    }

    const newActiveSection = this.getSectionElement(sectionName)
    if (newActiveSection) {
      newActiveSection.classList.add(activeSectionClassName)
    }
  }
}

export default new Router()
