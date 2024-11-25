import { describe, expect, test } from "vitest";
import {
    BeginningMsec,
    CurrentMsec,
    Laps,
    MsecDifference,
} from "./dataClasses";
import IntervalCounter from "./intervalCounter";

describe("decreased()のテスト", () => {
    const beginningMsec = BeginningMsec.create(50);
    let intervalCounter = new IntervalCounter(beginningMsec);

    test("1回目のメソッド呼び出し", () => {
        const msecDifference = MsecDifference.create(0, 20);
        intervalCounter = intervalCounter.decreased(msecDifference);
        const expected = JSON.stringify(
            new IntervalCounter(
                beginningMsec,
                CurrentMsec.create(30),
                Laps.create(1),
                false,
                false,
            ),
        );
        expect(JSON.stringify(intervalCounter)).toBe(expected);
    });

    test("2回目のメソッド呼び出し", () => {
        const msecDifference = MsecDifference.create(20, 40);
        intervalCounter = intervalCounter.decreased(msecDifference);
        const expected = JSON.stringify(
            new IntervalCounter(
                beginningMsec,
                CurrentMsec.create(10),
                Laps.create(1),
                false,
                false,
            ),
        );
        expect(JSON.stringify(intervalCounter)).toBe(expected);
    });

    test("3回目のメソッド呼び出し", () => {
        const msecDifference = MsecDifference.create(40, 60);
        intervalCounter = intervalCounter.decreased(msecDifference);
        const expected = JSON.stringify(
            new IntervalCounter(
                beginningMsec,
                CurrentMsec.create(40),
                Laps.create(2),
                true,
                false,
            ),
        );
        expect(JSON.stringify(intervalCounter)).toBe(expected);
    });
});

describe("currentZeroPaddingSec()のテスト", () => {
    test("1秒を表示", () => {
        const beginningMsec = BeginningMsec.create(1000);
        const intervalCounter = new IntervalCounter(beginningMsec);
        expect(intervalCounter.currentZeroPaddingSec()).toBe("01.0");
    });

    test("10秒を表示", () => {
        const beginningMsec = BeginningMsec.create(10 * 1000);
        const intervalCounter = new IntervalCounter(beginningMsec);
        expect(intervalCounter.currentZeroPaddingSec()).toBe("10.0");
    });
});

describe("progress()のテスト", () => {
    const beginningMsec = BeginningMsec.create(1000);
    const intervalCounter = new IntervalCounter(beginningMsec);

    test("開始直後の進行度合い", () => {
        expect(intervalCounter.progress()).toBe(0);
    });

    test("1週目終了直後の進行度合い", () => {
        const msecDifference = MsecDifference.create(0, 1000);
        const result = intervalCounter.decreased(msecDifference);
        expect(result.progress()).toBe(100);
    });
});
