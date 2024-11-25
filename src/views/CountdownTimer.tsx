import { useRef } from "react";
import SoundToggleButton from "./buttons/SoundToggleButton";
import IntervalIndicator from "./indicators/IntervalIndicator";
import alarm from "../assets/alarm.mp3";
import { Fonts } from "../models/classNames";
import TimeIndicator from "./indicators/TimeIndicator";
import PuffIndicator from "./indicators/PuffIndicator";
import ControlButton from "./buttons/ControlButton";
import ResetButton from "./buttons/ResetButton";

const CountdownTimer = (): JSX.Element => {
    const audio = useRef<HTMLAudioElement | null>(null);

    return (
        <div className="space-y-4">
            <div className={`${Fonts.shareTechMonoRegular} space-y-2`}>
                <div className="relative grid justify-center">
                    <TimeIndicator />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <IntervalIndicator />
                    </div>
                </div>
                <div className="mx-auto max-w-80">
                    <PuffIndicator />
                </div>
            </div>
            <div className="grid justify-center">
                <div className="relative flex gap-4">
                    <ControlButton audio={audio} />
                    <ResetButton />
                    <SoundToggleButton className="absolute -right-12 top-0" />
                </div>
            </div>
            <audio src={alarm} ref={audio} />
        </div>
    );
};

export default CountdownTimer;
