import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';

/**
 * Interface defining and exposing the attributes of the challenges
 */
interface Challenge {
    type: 'body' | 'eye'
    description: string;
    amount: number;
}

/**
 * Interface created to register the available variables
 * being return and enable intelli-sense to suggest completions
 * as well as discriminate their type
 */
interface ChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

/**
 * Interface created to enable the use of the children
 * of the provider. Necessary to return a wrap of its
 * contents around children. Also provides typing for
 * additional parameters received from the application
 */
interface ChallengesProviderProps {
    children : ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

/**
 * Export of the challenges context as well as the definition
 * of the context data type
 */
export const ChallengesContext = createContext({} as ChallengesContextData);

/**
 * Provider definition for the Challenges context. Contains the definition of
 * all the provided variables and functions related to the main application
 * @param children Contains all html elements that are children of this class
 * @returns CountdownContextData
 */
export function ChallengesProvider ({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    /**
     * Use Effect without a trigger is used to be triggered once
     * after the application is started. Asks the user for permission
     * to send push notifications through the browser
     */
    useEffect(() => {
        Notification.requestPermission()
    }, [])

    /**
     * Use Effect function responsible for updating the cookies when the
     * player info changes. Triggered whenever there's a change in level,
     * experience or challenges completed
     */
    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted])

    /**
     * Updates the player level and displays the level up message modal popup
     */
    function levelUp () {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    /**
     * Closes the level up message modal
     */
    function closeLevelUpModal () {
        setIsLevelUpModalOpen(false);
    }

    /**
     * Starts a new challenge, selecting one from "challenges.json" plays a
     * notification sound and, if permitted, displays a notification popup
     */
    function startNewChallenge () {
        const randomChallengeIndex = Math.round(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('New Challenge!', {
                body: `Worth ${challenge.amount}xp!`
            })
        }

        setActiveChallenge(challenge)
    }

    /**
     * Resets the current challenge
     */
    function resetChallenge () {
        setActiveChallenge(null);
    }

    /**
     * Completes a challenge and recalculates player experience and level,
     * calling the level up function if necessary
     */
    function completeChallenge () {
        if (!activeChallenge) return;

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;
        
        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }

    /**
     * Return of the provider, wrapping its children with the relevant
     * functions and variables required by them to properly integrate
     */
    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                experienceToNextLevel,
                challengesCompleted,
                activeChallenge,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal
            }}
        >
            {children}

            { isLevelUpModalOpen && <LevelUpModal /> }
        </ChallengesContext.Provider>
    );
}