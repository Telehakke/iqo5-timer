export const TimerStateEnum = {
    start: "start",
    pause: "pause",
    resume: "resume",
} as const;

export type TimerState = (typeof TimerStateEnum)[keyof typeof TimerStateEnum];

interface ITimerState {
    readonly state: TimerState;
    execute(): ITimerState;
    reset(): ITimerState;
}

class StartState implements ITimerState {
    readonly state: TimerState = TimerStateEnum.start;

    execute = (): ITimerState => {
        return new PauseState();
    };

    reset = (): ITimerState => {
        return this;
    };
}

class PauseState implements ITimerState {
    readonly state: TimerState = TimerStateEnum.pause;

    execute = (): ITimerState => {
        return new ResumeState();
    };

    reset = (): ITimerState => {
        return new StartState();
    };
}

class ResumeState implements ITimerState {
    readonly state: TimerState = TimerStateEnum.resume;

    execute = (): ITimerState => {
        return new PauseState();
    };

    reset = (): ITimerState => {
        return new StartState();
    };
}

export class TimerStateMachine {
    private state: ITimerState;

    constructor(state?: ITimerState) {
        this.state = state ?? new StartState();
    }

    currentState = (): TimerState => {
        return this.state.state;
    };

    /**
     *  呼び出す度に、"start" -> "pause" <- -> "resume"と状態が変化する
     */
    execute = (): TimerStateMachine => {
        const newState = this.state.execute();
        return new TimerStateMachine(newState);
    };

    /**
     * "start"の状態に移行する
     */
    reset = (): TimerStateMachine => {
        const newState = this.state.reset();
        return new TimerStateMachine(newState);
    };
}
