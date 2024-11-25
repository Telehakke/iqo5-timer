import { Result } from "neverthrow";
import { TimerTimeout } from "./dataClasses";
import { NegativeNumberError } from "./errors";

export class Timer {
    private timerID: number | undefined = undefined;
    private isPause = false;
    private readonly timeout: Result<TimerTimeout, NegativeNumberError>;
    private _beforeMsec: number;
    private _afterMsec: number;

    constructor(timeout: Result<TimerTimeout, NegativeNumberError>) {
        this.timeout = timeout;
        this._beforeMsec = 0;
        this._afterMsec = 0;
    }

    get beforeMsec(): number {
        return this._beforeMsec;
    }

    get afterMsec(): number {
        return this._afterMsec;
    }

    begin = (action: () => void): void => {
        if (this.timerID != null) {
            clearInterval(this.timerID);
        }

        this._beforeMsec = Date.now();
        this._afterMsec = this._beforeMsec;

        this.timerID = setInterval(() => {
            this._afterMsec = Date.now();

            if (!this.isPause) {
                action();
            }

            this._beforeMsec = this._afterMsec;
        }, this.validTimeout());
    };

    pause = (): void => {
        this.isPause = true;
    };

    resume = (): void => {
        this.isPause = false;
    };

    reset = (): void => {
        clearInterval(this.timerID);
        this.isPause = false;
    };

    private validTimeout = (): number => {
        return this.timeout.match(
            (v) => v.value,
            () => TimerTimeout.minValue,
        );
    };
}
