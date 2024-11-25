import { Colors } from "../../models/classNames";
import { CustomCircularProgress } from "../CustomMUI";
import { useAtomValue } from "jotai";
import { currentTimeAtom, timeProgressAtom } from "../../appStates";

const TimeIndicator = (): JSX.Element => {
    return (
        <div
            className={`relative h-[168px] w-[168px] ${Colors.textTeal700_dark300}`}
        >
            <CircularProgress />
            <TimeValue />
        </div>
    );
};

export default TimeIndicator;

const CircularProgress = (): JSX.Element => {
    const timeProgress = useAtomValue(timeProgressAtom);

    return (
        <CustomCircularProgress
            variant="determinate"
            value={timeProgress}
            size={168}
            thickness={2}
        />
    );
};

const TimeValue = (): JSX.Element => {
    const currentTime = useAtomValue(currentTimeAtom);

    return (
        <p
            className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-lg ${Colors.textNeutral900_dark100}`}
        >
            {currentTime}
        </p>
    );
};
