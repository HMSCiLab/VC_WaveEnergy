export class PacWaveDataError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number = 404) {
        super(message);
        this.name = 'PacWaveDataError'; // Set the name of the error
        this.statusCode = statusCode;
        // Restore the prototype chain for proper 'instanceof' checks
        Object.setPrototypeOf(this, PacWaveDataError.prototype); 
    }
}

export class InvalidUserInputError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number = 404){
        super(message);
        this.name = 'InvalidUserInputError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, InvalidUserInputError.prototype );
    }
}