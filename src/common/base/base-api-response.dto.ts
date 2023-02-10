import { Nullable, ResponseCode } from "src/common/constants";

export class CommonApiResponse<T> {
    public readonly code: number;
    public readonly message: string;
    public readonly timestamp: number;
    public readonly data: Nullable<T>;

    private constructor(code: number, message: string, data?: T) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.timestamp = Date.now();
    }

    public static success<T>(data?: T, message?:string): CommonApiResponse<T> {
        const resultCode: number = ResponseCode.SUCCESS.code;
        const resultMessage: string = message || ResponseCode.SUCCESS.message;
        
        return new CommonApiResponse(resultCode, resultMessage, data);
    }

    public static error<T>(code?: number, message?: string, data?: T): CommonApiResponse<T> {
        const resultCode: number = code || ResponseCode.INTERNAL_ERROR.code;
        const resultMessage: string = message || ResponseCode.INTERNAL_ERROR.message;
    
        return new CommonApiResponse(resultCode, resultMessage, data);
    }
}