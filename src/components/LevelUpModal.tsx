import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css'

/**
 * Component that creates the level up message modal
 */
export function LevelUpModal () {
    const { level, closeLevelUpModal } = useContext(ChallengesContext);
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>

                <strong>Congratulations!</strong>
                <p>You leveled up.</p>

                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Close modal"/>
                </button>
            </div>
        </div>
    );
}