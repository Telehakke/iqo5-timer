import { Result } from "neverthrow";
import { BeginningMsec, MaxPuff, TimerTimeout } from "./models/dataClasses";
import {
    NegativeNumberError,
    NegativeNumberWithZeroError,
} from "./models/errors";
import { Timer } from "./models/timer";
import TimeCounter from "./models/timeCounter";
import IntervalCounter from "./models/intervalCounter";
import { atom } from "jotai";
import { TimerStateMachine } from "./models/timerState";
import { atomWithStorage } from "jotai/utils";

/**
 * インターバルの間隔をミリ秒単位で計算する
 */
const intervalCalculator = (
    beginningMsecOfTime: Result<BeginningMsec, NegativeNumberError>,
    maxPuff: Result<MaxPuff, NegativeNumberWithZeroError>,
): Result<BeginningMsec, NegativeNumberError> => {
    const validMsec = beginningMsecOfTime.match(
        (v) => v.value,
        () => BeginningMsec.minValue,
    );
    const validMaxPuff = maxPuff.match(
        (v) => v.value,
        () => MaxPuff.minValue,
    );
    return BeginningMsec.create(validMsec / validMaxPuff);
};

export const timeout = TimerTimeout.create(100);
export const timer = new Timer(timeout);

const beginningMsecOfTime = BeginningMsec.create(6 * 60 * 1000);
export const maxPuff = MaxPuff.create(14);
const beginningMsecOfInterval = intervalCalculator(
    beginningMsecOfTime,
    maxPuff,
);
export const timeCounter = new TimeCounter(beginningMsecOfTime);
export const intervalCounter = new IntervalCounter(beginningMsecOfInterval);

export const currentTimeAtom = atom(timeCounter.currentTime());
export const timeProgressAtom = atom(timeCounter.progress());
export const intervalCurrentSecAtom = atom(
    intervalCounter.currentZeroPaddingSec(),
);
export const intervalProgressAtom = atom(intervalCounter.progress());
export const intervalLapsAtom = atom(intervalCounter.getLaps());
export const canSoundAtom = atom(intervalCounter.canSound);

export const timerStateMachineAtom = atom(new TimerStateMachine());
export const onSoundAtom = atomWithStorage("onSound", false);
