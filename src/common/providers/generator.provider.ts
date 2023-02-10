import { v1 as uuid } from 'uuid';

export class GeneratorProvider {
    static uuid(): string {
        return uuid();
    }

    static fileName(ext: string): string {
        return GeneratorProvider.uuid() + '.' + ext;
    }

    static generateVerificationCode(): string {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    static generatePassword(): string {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = lowercase.toUpperCase();
        const numbers = '0123456789';

        let text= '';

        for(let i = 0; i < 4; i++) {
            text += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
            text += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
            text += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        return text;
    }

    static generateRandomString(length: number): string {
        return Math.random()
            .toString(36)
            .replace(/[^\dA-Za-z]+/g, '')
            .slice(0, Math.max(0, length));
    }
}