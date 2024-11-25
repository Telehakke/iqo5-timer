import { useAtomValue } from "jotai";
import { Colors } from "../../models/classNames";
import { CustomCircularProgress } from "../CustomMUI";
import { intervalCurrentSecAtom, intervalProgressAtom } from "../../appStates";

const IntervalIndicator = (): JSX.Element => {
    return (
        <div className="relative">
            <GrayCircle />
            <CircularProgress />
            <IntervalValue />
        </div>
    );
};

export default IntervalIndicator;

const GrayCircle = (): JSX.Element => {
    return (
        <div
            className={`h-[160px] w-[160px] rounded-full border-[7px] ${Colors.borderNeutral300_dark700}`}
        />
    );
};

const CircularProgress = (): JSX.Element => {
    const intervalProgress = useAtomValue(intervalProgressAtom);

    return (
        <div className={`${Colors.textBlue500}`}>
            <CustomCircularProgress
                className="absolute inset-0"
                variant="determinate"
                value={intervalProgress}
                size={160}
                thickness={2}
            />
        </div>
    );
};

const IntervalValue = (): JSX.Element => {
    const intervalCurrentSec = useAtomValue(intervalCurrentSecAtom);

    return (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl">
            {intervalCurrentSec.substring(0, 2)}
            <span
                className={`absolute bottom-0.5 text-lg ${Colors.textNeutral300_dark700}`}
            >
                {intervalCurrentSec.substring(2, 4)}
            </span>
        </p>
    );
};
