import { VolumeOffIcon, VolumeUpIcon } from "../Icons";
import { Colors } from "../../models/classNames";
import { useAtom, useAtomValue } from "jotai";
import { onSoundAtom, timerStateMachineAtom } from "../../appStates";
import { TimerStateEnum } from "../../models/timerState";

const SoundToggleButton = ({
    className,
}: {
    className?: string;
}): JSX.Element => {
    const [onSound, setOnSound] = useAtom(onSoundAtom);
    const timerStateMachine = useAtomValue(timerStateMachineAtom);
    const enable = timerStateMachine.currentState() === TimerStateEnum.start;

    const handleClick = (): void => {
        if (!enable) return;

        setOnSound(!onSound);
    };

    return (
        <button className={className} onClick={handleClick}>
            {onSound ? (
                <VolumeUpIcon
                    className={`h-8 w-8 transition ${enable ? Colors.fillGreen500_hover300 : Colors.fillNeutral300_dark700}`}
                />
            ) : (
                <VolumeOffIcon
                    className={`h-8 w-8 transition ${enable ? Colors.fillOrange500_hover300 : Colors.fillNeutral300_dark700}`}
                />
            )}
        </button>
    );
};

export default SoundToggleButton;
