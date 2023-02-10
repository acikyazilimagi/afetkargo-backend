export type CodeDescription = {
    code: number,
    message: string
}

export class ResponseCode {
    
    public static SUCCESS: CodeDescription = {
        code: 200,
        message: "Success."
    }

    public static BAD_REQUEST_ERROR: CodeDescription = {
        code: 400,
        message: 'Bad Request'
    }
    
    public static UNAUTHORIZED_ERROR: CodeDescription = {
        code: 401, 
        message: "Unauthorized Request"
    }

    public static WRONG_CREDENTIAL_ERROR: CodeDescription = {
        code: 402,
        message: "Wrong Credentials"
    }
    public static ACCESS_DENIED_ERROR: CodeDescription = {
        code: 403,
        message: 'Access denied.'
      };
      
    public static INTERNAL_ERROR: CodeDescription = {
        code: 500,
        message: 'Internal error.'
    }; 

    public static CONFLICT_ERROR: CodeDescription = {
        code: 409,
        message: 'Conflict error.'
    }

    public static NOT_FOUND_ERROR: CodeDescription = {
        code: 404,
        message: 'Not found error.'
    }
}