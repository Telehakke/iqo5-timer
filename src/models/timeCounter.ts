import { Result } from "neverthrow";
import { BeginningMsec, CurrentMsec, MsecDifference } from "./dataClasses";
import { NegativeNumberError } from "./errors";

export default class TimeCounter {
    private readonly beginningMsec: Result<BeginningMsec, NegativeNumberError>;
    readonly currentMsec: Result<CurrentMsec, NegativeNumberError>;

    constructor(
        beginningMsec: Result<BeginningMsec, NegativeNumberError>,
        currentMsec?: Result<CurrentMsec, NegativeNumberError>,
    ) {
        this.beginningMsec = beginningMsec;
        this.currentMsec =
            currentMsec ??
            CurrentMsec.create(
                beginningMsec.match(
                    (v) => v.value,
                    () => BeginningMsec.minValue,
                ),
            );
    }

    /**
     * 前回からのミリ秒差だけ減らした新しいインスタンスを返す
     */
    decreased = (
        msecDifference: Result<MsecDifference, NegativeNumberError>,
    ): TimeCounter => {
        const validCurrentMsec = this.validCurrentMsec();
        const validMsecDifference = this.validMsecDifference(msecDifference);
        const newCurrentMsec = CurrentMsec.create(
            validCurrentMsec - validMsecDifference,
        );
        return new TimeCounter(this.beginningMsec, newCurrentMsec);
    };

    /**
     * 現在のミリ秒を「分:秒」の形式で返す
     */
    currentTime = (): string => {
        const validCurrentMsec = this.validCurrentMsec();
        const sec = validCurrentMsec / 1000;
        const minute = Math.trunc(sec / 60);
        const second = Math.trunc(sec % 60)
            .toString()
            .padStart(2, "0");
        return `${minute}:${second}`;
    };

    /**
     * 進行度合い。現在のミリ秒が0に近づくほどパーセンテージは増加する
     */
    progress = (): number => {
        const validBeginningMsec = this.validBeginningMsec();
        const validCurrentMsec = this.validCurrentMsec();
        return (
            ((validBeginningMsec - validCurrentMsec) / validBeginningMsec) * 100
        );
    };

    /**
     * 現在のミリ秒を取得する
     */
    getCurrentMsec = (): number => {
        return this.validCurrentMsec();
    };

    private validBeginningMsec = (): number => {
        return this.beginningMsec.match(
            (v) => v.value,
            () => BeginningMsec.minValue,
        );
    };

    private validCurrentMsec = (): number => {
        return this.currentMsec.match(
            (v) => v.value,
            () => CurrentMsec.minValue,
        );
    };

    private validMsecDifference = (
        value: Result<MsecDifference, NegativeNumberError>,
    ): number => {
        return value.match(
            (v) => v.value,
            () => MsecDifference.minValue,
        );
    };
}
