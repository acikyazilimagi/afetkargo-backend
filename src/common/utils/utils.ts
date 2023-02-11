export function convertToAsterisks(value: string): string {
    let result = value.substring(0, 1);
    for (let i = 0; i < 3; i++) {
        result += '*';
    }
    return result;
}


export function generateCode(): string {
    return Math.random().toString(36).substring(2, 6).toUpperCase();
}