import './styles/main.scss'

import { showSection, isSectionActive } from './router'

setInterval(() => {
  showSection(isSectionActive('intro') ? 'login' : 'intro')
}, 2000)
