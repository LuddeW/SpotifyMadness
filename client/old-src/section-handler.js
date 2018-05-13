const sectionClassname = 'section'
const activeSectionClassName = 'section--is-active'

export const getSectionElement = sectionName =>
  document.querySelector(`[data-section="${sectionName}"]`)

export const showSection = sectionName => {
  const currentActiveSections = document.getElementsByClassName(
    sectionClassname
  )
  for (let i = 0; i < currentActiveSections.length; i++) {
    currentActiveSections[i].classList.remove(activeSectionClassName)
  }

  const newActiveSection = getSectionElement(sectionName)
  if (newActiveSection) {
    newActiveSection.classList.add(activeSectionClassName)
  }
}
