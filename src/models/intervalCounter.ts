import { Result } from "neverthrow";
import {
    BeginningMsec,
    CurrentMsec,
    Laps,
    MsecDifference,
} from "./dataClasses";
import { NegativeNumberError } from "./errors";

export default class IntervalCounter {
    private readonly beginningMsec: Result<BeginningMsec, NegativeNumberError>;
    private readonly currentMsec: Result<CurrentMsec, NegativeNumberError>;
    private readonly laps: Result<Laps, NegativeNumberError>;
    readonly canSound: boolean;
    private readonly notUsed: boolean;

    constructor(
        beginningMsec: Result<BeginningMsec, NegativeNumberError>,
        currentMsec?: Result<CurrentMsec, NegativeNumberError>,
        laps?: Result<Laps, NegativeNumberError>,
        canSound?: boolean,
        notUsed?: boolean,
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
        this.laps = laps ?? Laps.create(0);
        this.canSound = canSound ?? false;
        this.notUsed = notUsed ?? true;
    }

    /**
     * 前回からのミリ秒差だけを減らした新しいインスタンスを返す
     */
    decreased = (
        msecDifference: Result<MsecDifference, NegativeNumberError>,
    ): IntervalCounter => {
        let newLaps = this.validLaps();

        // 初回呼び出しの場合、ラップ数を1増やす
        if (this.notUsed) {
            newLaps += 1;
        }

        let newCurrentMsec = this.validCurrentMsec();
        const validMsecDifference = this.validMsecDifference(msecDifference);
        newCurrentMsec -= validMsecDifference;
        let newCanSound = false;

        // 0秒を切ったら次のラップに入る
        if (newCurrentMsec < 0) {
            const validBeginningMsec = this.validBeginningMsec();
            newCurrentMsec = validBeginningMsec + newCurrentMsec;
            newLaps += 1;
            newCanSound = true;
        }

        return new IntervalCounter(
            this.beginningMsec,
            CurrentMsec.create(newCurrentMsec),
            Laps.create(newLaps),
            newCanSound,
            false,
        );
    };

    /**
     * 現在のゼロ埋め秒（小数点以下第1位まで表示）
     */
    currentZeroPaddingSec = (): string => {
        const validCurrentMsec = this.validCurrentMsec();
        return (validCurrentMsec / 1000).toFixed(1).padStart(4, "0");
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
     * ラップ数を取得する
     */
    getLaps = (): number => {
        return this.validLaps();
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

    private validLaps = (): number => {
        return this.laps.match(
            (v) => v.value,
            () => Laps.minValue,
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
