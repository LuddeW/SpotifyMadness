import sections from './sections'

let activeSection = null

export const start = () => {
  window.addEventListener('popstate', _onLocationChange)
  _onLocationChange()
}

export const go = (path, state) => {
  window.history.pushState(state, '', path)
  _onLocationChange()
}

const _onLocationChange = () => {
  if (activeSection && activeSection.deactivate) {
    activeSection.deactivate()
  }

  const { pathname } = window.location
  const sectionName = _getActiveSectionName(pathname)

  const Section = sections[sectionName]
  activeSection = new Section()
}

const _getActiveSectionName = pathname => {
  const [firstPart] = pathname.substr(1).split('/')
  switch (firstPart) {
    case '':
      return 'search'
    case 'battle':
      return 'battle'
    default:
      return 'not-found'
  }
}
