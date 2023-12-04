import { validateSync, ValidationError } from 'class-validator';

export class ValidationException extends Error {
    constructor(validationErrors: ValidationError[], constructorName: string) {
        super(`Object ${constructorName} failed validation. Errors: ${validationErrors.join(', ')}`);
        this.name = 'ValidationException';
    }
}


export function ValidateProperties<T extends { new (...args: any[]): any }>(target: T): T {
    const originalConstructor = target;

    function NewConstructor(...args: any[]) {
        const instance = new originalConstructor(...args);
        const errors = validateSync(instance);

        if (errors.length > 0) {
            throw new ValidationException(errors, originalConstructor.name);
        }

        return instance;
    }

    NewConstructor.prototype = originalConstructor.prototype;

    return NewConstructor as unknown as T;
}
