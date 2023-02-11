import { CARGO_STATUS } from "../constants";

export function convertToAsterisks(value: string): string {
    let result = value.substring(0, 1);
    for (let i = 0; i < 3; i++) {
        result += '*';
    }
    return result;
}


export function generateCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function setCargoStatus(status: number): CARGO_STATUS {
    switch (status) {
        case 1:
            return CARGO_STATUS.WAITING;
        case 2:
            return CARGO_STATUS.TRANSFER;
        case 3:
            return CARGO_STATUS.TRANSFERED;
        case 4:
            return CARGO_STATUS.CANCEL;
        case 5:
            return CARGO_STATUS.TRANSFERED_WITH_PROBLEM;
    }
}