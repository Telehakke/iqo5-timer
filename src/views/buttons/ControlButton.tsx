import { useAtomValue, useSetAtom } from "jotai";
import {
    canSoundAtom,
    currentTimeAtom,
    intervalCounter,
    intervalCurrentSecAtom,
    intervalLapsAtom,
    intervalProgressAtom,
    onSoundAtom,
    timeCounter,
    timeProgressAtom,
    timer,
    timerStateMachineAtom,
} from "../../appStates";
import { TimerStateEnum } from "../../models/timerState";
import RoundedButton from "./RoundedButton";
import { PauseIcon, ResumeIcon, TimerIcon } from "../Icons";
import { Colors } from "../../models/classNames";
import { MsecDifference } from "../../models/dataClasses";

const ControlButton = ({
    audio,
}: {
    audio: React.MutableRefObject<HTMLAudioElement | null>;
}): JSX.Element => {
    const timerStateMachine = useAtomValue(timerStateMachineAtom);
    const state = timerStateMachine.currentState();

    return (
        <>
            {state === TimerStateEnum.start && <StartButton audio={audio} />}
            {state === TimerStateEnum.pause && <PauseButton />}
            {state === TimerStateEnum.resume && <ResumeButton />}
        </>
    );
};

export default ControlButton;

const StartButton = ({
    audio,
}: {
    audio: React.MutableRefObject<HTMLAudioElement | null>;
}): JSX.Element => {
    const setCurrentTime = useSetAtom(currentTimeAtom);
    const setTimeProgress = useSetAtom(timeProgressAtom);
    const setIntervalCurrentSec = useSetAtom(intervalCurrentSecAtom);
    const setIntervalProgress = useSetAtom(intervalProgressAtom);
    const setIntervalLaps = useSetAtom(intervalLapsAtom);
    const setCanSound = useSetAtom(canSoundAtom);

    const setTimerStateMachine = useSetAtom(timerStateMachineAtom);
    const onSound = useAtomValue(onSoundAtom);

    const handleClick = (): void => {
        setTimerStateMachine((v) => v.execute());

        if (onSound) {
            audio.current?.play();
        }

        let newTimeCounter = timeCounter.decreased(MsecDifference.create(0, 0));
        let newIntervalCounter = intervalCounter.decreased(
            MsecDifference.create(0, 0),
        );

        timer.begin(() => {
            const msecDifference = MsecDifference.create(
                timer.beforeMsec,
                timer.afterMsec,
            );
            newTimeCounter = newTimeCounter.decreased(msecDifference);
            newIntervalCounter = newIntervalCounter.decreased(msecDifference);

            // タイマーが終了したら初期化する
            if (newTimeCounter.getCurrentMsec() <= 0) {
                setTimerStateMachine((v) => v.reset());
                timer.reset();
                setCurrentTime(timeCounter.currentTime());
                setTimeProgress(timeCounter.progress());
                setIntervalCurrentSec(intervalCounter.currentZeroPaddingSec());
                setIntervalProgress(intervalCounter.progress());
                setIntervalLaps(intervalCounter.getLaps());
                setCanSound(intervalCounter.canSound);
                return;
            }

            setCurrentTime(newTimeCounter.currentTime());
            setTimeProgress(newTimeCounter.progress());
            setIntervalCurrentSec(newIntervalCounter.currentZeroPaddingSec());
            setIntervalProgress(newIntervalCounter.progress());
            setIntervalLaps(newIntervalCounter.getLaps());
            setCanSound(newIntervalCounter.canSound);

            if (newIntervalCounter.canSound && onSound) {
                audio.current?.play();
            }
        });
    };

    return (
        <RoundedButton
            text="Start"
            icon={
                <TimerIcon
                    className={`mx-auto h-6 w-6 ${Colors.fillNeutral900_dark100}`}
                />
            }
            onClick={handleClick}
        />
    );
};

const PauseButton = (): JSX.Element => {
    const setTimerStateMachine = useSetAtom(timerStateMachineAtom);

    const handleClick = (): void => {
        setTimerStateMachine((v) => v.execute());
        timer.pause();
    };

    return (
        <RoundedButton
            text="Pause"
            icon={
                <PauseIcon
                    className={`mx-auto h-6 w-6 ${Colors.fillNeutral900_dark100}`}
                />
            }
            onClick={handleClick}
        />
    );
};

const ResumeButton = (): JSX.Element => {
    const setTimerStateMachine = useSetAtom(timerStateMachineAtom);

    const handleClick = (): void => {
        setTimerStateMachine((v) => v.execute());
        timer.resume();
    };

    return (
        <RoundedButton
            text="Resume"
            icon={
                <ResumeIcon
                    className={`mx-auto h-6 w-6 ${Colors.fillNeutral900_dark100}`}
                />
            }
            onClick={handleClick}
        />
    );
};
