import styles from '../styles/components/Profile.module.css'

export function Profile () {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/pedroksl.png" alt="Pedro Sathler"/>
            <div>
                <strong>Pedro Sathler</strong>
                <p>Level 1</p>
            </div>
        </div>
    );
}