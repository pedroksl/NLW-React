import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

/**
 * Component that created the countdown section of the interface,
 * as well the button used to interact with it. Uses the countdown
 * context to control the timer.
 */
export function Countdown () {
    const { minutes,
        seconds,
        isActive,
        hasFinished,
        startCountdown,
        resetCountdown
    } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button disabled className={styles.countdownButton}>
                    Cycle ended
                </button>
            ) : (
                <>
                    { isActive  ? (
                        <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountdown}>
                        Abandon Cycle
                        </button>
                    ) : (
                        <button type="button" className={styles.countdownButton} onClick={startCountdown}>
                        Start a cycle
                        </button>
                    )}
                </>
            )}
        </div>
    );
}