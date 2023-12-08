# Validate-class-properties

- A simple class decorator that validates the properties of a class upon instance initialization. On validation error, the ValidationException is thrown.
- It's based on [class-validator](https://www.npmjs.com/package/class-validator) library.
- Repository can be found at [github](https://github.com/JakubStiburek/validate-class-properties).

## Installation

```bash
npm install validate-class-properties
```

## Usage

```typescript
import { ValidateProperties } from 'validate-class-properties';
import { IsNumber, Min } from 'class-validator';

@ValidateProperties
export class ValueObject {
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    readonly value: number;

    constructor(value: number) {
        this.value = value;
    }
}
```

## ValidationException handling

```typescript
function getInsanceOfValueObject(value: number): ValueObject {
    try {
        return new ValueObject(value);
    } catch (e) {
        if (e instanceof ValidationException) {
            // handle validation error
        }
        throw e;
    }
}
```
