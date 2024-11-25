import { Colors, Fonts } from "../../models/classNames";
import { CustomLinearProgress } from "../CustomMUI";
import { useAtomValue } from "jotai";
import { intervalLapsAtom, maxPuff } from "../../appStates";
import { MaxPuff } from "../../models/dataClasses";

const PuffIndicator = (): JSX.Element => {
    return (
        <div className="relative">
            <LinearProgress />
            <PuffValue />
        </div>
    );
};

export default PuffIndicator;

const LinearProgress = (): JSX.Element => {
    const intervalLaps = useAtomValue(intervalLapsAtom);
    const validMaxPuff = maxPuff.match(
        (v) => v.value,
        () => MaxPuff.minValue,
    );

    return (
        <div className={`${Colors.textBlue500} ${Colors.bgNeutral300_dark700}`}>
            <CustomLinearProgress
                variant="determinate"
                value={(intervalLaps / validMaxPuff) * 100}
            />
        </div>
    );
};

const PuffValue = (): JSX.Element => {
    const intervalLaps = useAtomValue(intervalLapsAtom);
    const validMaxPuff = maxPuff.match(
        (v) => v.value,
        () => MaxPuff.minValue,
    );

    return (
        <p
            className={`absolute bottom-2 left-0 text-xs ${Fonts.michromaRegular} `}
        >
            {`${intervalLaps}/${validMaxPuff} puff`}
        </p>
    );
};
