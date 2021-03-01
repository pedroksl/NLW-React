import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

/**
 * Interface created to register the available variables
 * being return and enable intelli-sense to suggest completions
 * as well as discriminate their type
 */
interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

/**
 * Interface created to enable the use of the children
 * of the provider. Necessary to return a wrap of its
 * contents around children
 */
interface CountdownProviderProps {
    children: ReactNode;
}

/** Variable used to store the time for clearing later */
let countdownTimeout: NodeJS.Timeout;

/**
 * Export of the countdown context as well as the definition
 * of the context data type
 */
export const CountdownContext = createContext({} as CountdownContextData);

/**
 * Provider definition for the Countdown context. Contains the definition of
 * all the provided variables and functions related to the countdown
 * @param children Contains all html elements that are children of this class
 * @returns CountdownContextData
 */
export function CountdownProvider ({children}: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60)
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    /**
     * Starts counting the time
     */
    function startCountdown () {
        setIsActive(true);
    }

    /**
     * Resets the counter by clearing the Timeout to avoid additional
     * time changes, as well as resetting boolean flags and the time
     */
    function resetCountdown () {
        clearTimeout(countdownTimeout)
        setHasFinished(false);
        setTime(25 * 60);
        setIsActive(false);
    }

    /**
     * Function called anytime the conditions "isActive"/"time" change.
     * Contains the logic of the timer, setting a timeout for one second
     * which, then, reduces the time left. Also used to call the functions
     * necessary when the timer has reached 0
     */
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    /**
     * Return of the provider, wrapping its children with the relevant
     * functions and variables required by them to properly integrate
     */
    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    );
}