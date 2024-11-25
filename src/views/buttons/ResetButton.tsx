import { useSetAtom } from "jotai";
import {
    canSoundAtom,
    currentTimeAtom,
    intervalCounter,
    intervalCurrentSecAtom,
    intervalLapsAtom,
    intervalProgressAtom,
    timeCounter,
    timeProgressAtom,
    timer,
    timerStateMachineAtom,
} from "../../appStates";
import RoundedButton from "./RoundedButton";
import { RestartAltIcon } from "../Icons";
import { Colors } from "../../models/classNames";

const ResetButton = (): JSX.Element => {
    const setCurrentTime = useSetAtom(currentTimeAtom);
    const setTimeProgress = useSetAtom(timeProgressAtom);
    const setIntervalCurrentSec = useSetAtom(intervalCurrentSecAtom);
    const setIntervalProgress = useSetAtom(intervalProgressAtom);
    const setIntervalLaps = useSetAtom(intervalLapsAtom);
    const setCanSound = useSetAtom(canSoundAtom);

    const setTimerStateMachine = useSetAtom(timerStateMachineAtom);

    const handleClick = (): void => {
        setTimerStateMachine((v) => v.reset());
        timer.reset();
        setCurrentTime(timeCounter.currentTime());
        setTimeProgress(timeCounter.progress());
        setIntervalCurrentSec(intervalCounter.currentZeroPaddingSec());
        setIntervalProgress(intervalCounter.progress());
        setIntervalLaps(intervalCounter.getLaps());
        setCanSound(intervalCounter.canSound);
    };

    return (
        <RoundedButton
            text="Reset"
            icon={
                <RestartAltIcon
                    className={`mx-auto h-6 w-6 ${Colors.fillNeutral900_dark100}`}
                />
            }
            onClick={handleClick}
        />
    );
};

export default ResetButton;
