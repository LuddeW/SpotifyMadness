const sectionClassname = 'section'
const activeSectionClassName = 'section--is-active'

export function getSection(sectionName) {
  return document.querySelector(`[data-section="${sectionName}"]`)
}

export function showSection(sectionName) {
  const currentActiveSections = document.getElementsByClassName(
    sectionClassname
  )
  for (let i = 0; i < currentActiveSections.length; i++) {
    currentActiveSections[i].classList.remove(activeSectionClassName)
  }

  const newActiveSection = getSection(sectionName)
  if (newActiveSection) {
    newActiveSection.classList.add(activeSectionClassName)
  }
}

export function isSectionActive(sectionName) {
  const section = getSection(sectionName)
  return section && section.classList.contains(activeSectionClassName)
}
