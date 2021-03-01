import '../styles/global.css'

import { ChallengesProvider } from '../contexts/ChallengesContext'
import { CountdownProvider } from '../contexts/CountdownContext'

/**
 * Main Application file
 */
function MyApp({ Component, pageProps }) {
  
  return (
    <Component {...pageProps} />
  )
}

export default MyApp
