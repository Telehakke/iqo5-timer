/**
 * 負数であることを示すエラー
 */
export class NegativeNumberError {
    readonly NegativeNumberError = "NegativeNumberError";
    readonly message: string;

    constructor(message?: string) {
        this.message = message ?? "";
    }
}

/**
 * 0を含む負数であることを示すエラー
 */
export class NegativeNumberWithZeroError {
    readonly NegativeNumberWithZeroError = "NegativeNumberWithZeroError";
    readonly message: string;

    constructor(message?: string) {
        this.message = message ?? "";
    }
}
