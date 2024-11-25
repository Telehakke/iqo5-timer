import { describe, expect, test } from "vitest";
import TimeCounter from "./timeCounter";
import { BeginningMsec, MsecDifference } from "./dataClasses";

describe("decreased()のテスト", () => {
    const beginningMsec = BeginningMsec.create(1000);
    let timeCounter = new TimeCounter(beginningMsec);

    test("0.1秒減らす", () => {
        const msecDifference = MsecDifference.create(0, 100);
        timeCounter = timeCounter.decreased(msecDifference);
        expect(timeCounter.currentMsec._unsafeUnwrap().value).toBe(900);
    });

    test("さらに0.1秒減らす", () => {
        const msecDifference = MsecDifference.create(100, 200);
        timeCounter = timeCounter.decreased(msecDifference);
        expect(timeCounter.currentMsec._unsafeUnwrap().value).toBe(800);
    });
});

describe("currentTime()のテスト", () => {
    test("1秒を表示", () => {
        const beginningMsec = BeginningMsec.create(1000);
        const timeCounter = new TimeCounter(beginningMsec);
        expect(timeCounter.currentTime()).toBe("0:01");
    });

    test("1分を表示", () => {
        const beginningMsec = BeginningMsec.create(60 * 1000);
        const timeCounter = new TimeCounter(beginningMsec);
        expect(timeCounter.currentTime()).toBe("1:00");
    });
});

describe("progress()のテスト", () => {
    const beginningMsec = BeginningMsec.create(1000);
    const timeCounter = new TimeCounter(beginningMsec);

    test("開始直後の進行度合い", () => {
        expect(timeCounter.progress()).toBe(0);
    });

    test("終了直後の進行度合い", () => {
        const msecDifference = MsecDifference.create(0, 1000);
        const result = timeCounter.decreased(msecDifference);
        expect(result.progress()).toBe(100);
    });
});
