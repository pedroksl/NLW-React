import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { CompletedChallenges } from '../components/CompletedChallenges'
import { ChallengeBox } from '../components/ChalllengeBox'
import { Countdown } from '../components/Countdown'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'

import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from '../contexts/CountdownContext'
import { ChallengesProvider } from '../contexts/ChallengesContext'

/**
 * Interface containing information retrieved from cookies.
 * Used to continue from where the user left off, in case of
 * a reload. Does not work if the user changes brower or computer.
 */
interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

/**
 * Main page of the application. As this is an SPA (Single Page
 * Application), this is also the only page in the application.
 * Contains all react components required for the interface.
 * @param props Properties retrieved from cookies
 */
export default function Home(props: HomeProps) {
  return (
    // The provider component surrouds the entire application.
    // It is the main part of the Context API in use in this
    // project. Everything set in it, is available everywhere
    // in the application.
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início / move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

/**
 * Next.js function call used to retrieve the Application Context.
 * In this case, it's being used to read the variables previously
 * stored in the cookies, in order to remember the last state.
 * @param ctx Application context
 */
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}