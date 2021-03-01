import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

/**
 * Component that creates the Challenge Box section of the interface.
 * This component has different states based on if there's a challenge
 * currently active or if the timer is still running. If there's an active
 * challenge, display the current challenge, the amount of points it's worth
 * and two buttons for the user to Complete or forfeit the challenge.
 */
export function ChallengeBox () {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeSucceeded () {
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed () {
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Earn {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                        <strong>New Challenge</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                        >
                            Forfeit
                        </button>

                        <button
                            type="button"
                            className={styles.challengeSucceededButton}
                            onClick={handleChallengeSucceeded}
                        >
                            Complete
                        </button>
                    </footer>

                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Finalize a cycle to receive a new challenge</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Level up by completing challenges.
                    </p>
                </div>
            )}
        </div>
    );
}