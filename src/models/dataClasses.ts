import { err, ok, Result } from "neverthrow";
import { NegativeNumberError, NegativeNumberWithZeroError } from "./errors";

export class BeginningMsec {
    readonly BeginningMsec = "BeginningMsec";
    readonly value: number;

    private constructor(value: number) {
        this.value = value;
    }

    /**
     * 開始ミリ秒を作成する
     */
    static create = (
        value: number,
    ): Result<BeginningMsec, NegativeNumberError> => {
        if (value < 0) return err(new NegativeNumberError());

        return ok(new BeginningMsec(value));
    };

    static readonly minValue = 0;
}

export class CurrentMsec {
    readonly CurrentMsec = "CurrentMsec";
    readonly value: number;

    private constructor(value: number) {
        this.value = value;
    }

    /**
     * 現在ミリ秒を作成する
     */
    static create = (
        value: number,
    ): Result<CurrentMsec, NegativeNumberError> => {
        if (value < 0) return err(new NegativeNumberError());

        return ok(new CurrentMsec(value));
    };

    static readonly minValue = 0;
}

export class MsecDifference {
    readonly MsecDifference = "MsecDifference";
    readonly value: number;

    private constructor(value: number) {
        this.value = value;
    }

    /**
     * 前回とのミリ秒差を作成する
     */
    static create = (
        beforeMsec: number,
        afterMsec: number,
    ): Result<MsecDifference, NegativeNumberError> => {
        const result = afterMsec - beforeMsec;
        if (result < 0) return err(new NegativeNumberError());

        return ok(new MsecDifference(result));
    };

    static readonly minValue = 0;
}

export class Laps {
    readonly Laps = "Laps";
    readonly value: number;

    private constructor(value: number) {
        this.value = value;
    }

    /**
     * ラップ数を作成する
     */
    static create = (value: number): Result<Laps, NegativeNumberError> => {
        if (value < 0) return err(new NegativeNumberError());

        return ok(new Laps(value));
    };

    static readonly minValue = 0;
}

export class MaxPuff {
    readonly MaxPuff = "MaxPuff";
    readonly value: number;

    private constructor(value: number) {
        this.value = value;
    }

    /**
     * 最大パフ数を作成する
     */
    static create = (
        value: number,
    ): Result<MaxPuff, NegativeNumberWithZeroError> => {
        if (value <= 0) return err(new NegativeNumberWithZeroError());

        return ok(new MaxPuff(value));
    };

    static readonly minValue = 1;
}

export class TimerTimeout {
    readonly TimerTimeout = "TimerTimeout";
    readonly value: number;

    private constructor(value: number) {
        this.value = value;
    }

    /**
     * インターバルタイマーの中断ミリ秒を作成する
     */
    static create = (
        value: number,
    ): Result<TimerTimeout, NegativeNumberError> => {
        if (value < 0) return err(new NegativeNumberError());

        return ok(new TimerTimeout(value));
    };

    static readonly minValue = 0;
}

export class TimerDuration {
    readonly TimerDuration = "TimerDuration";
    readonly value: number;

    private constructor(value: number) {
        this.value = value;
    }

    /**
     * インターバルタイマーの期間をミリ秒単位で作成する
     */
    static create = (
        value: number,
    ): Result<TimerDuration, NegativeNumberWithZeroError> => {
        if (value <= 0) return err(new NegativeNumberWithZeroError());

        return ok(new TimerDuration(value));
    };

    static readonly minValue = 1;
}
