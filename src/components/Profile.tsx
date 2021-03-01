import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'

/**
 * Component that creates the profile section of the interface
 */
export function Profile () {
    const { level } = useContext(ChallengesContext);
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/pedroksl.png" alt="Pedro Sathler"/>
            <div>
                <strong>Pedro Sathler</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}