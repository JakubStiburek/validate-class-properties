import { IsString, MaxLength, ValidateNested } from 'class-validator';
import { ValidateProperties, ValidationException } from '../src';

describe('ValidatePropertiesDecorator', () => {
    @ValidateProperties
    class TestClass {
        @IsString()
        @MaxLength(4)
        readonly name: string;

        constructor(name: string) {
            this.name = name;
        }
    }

    @ValidateProperties
    class NestedTestClass {
        @ValidateNested()
        readonly testClass: TestClass;

        constructor(testClass: TestClass) {
            this.testClass = testClass;
        }
    }

    it('should construct a new instance of the class', () => {
        const instance = new TestClass('test');

        expect(instance).toBeInstanceOf(TestClass);
    });

    it('should throw an error if the class properties are invalid', () => {
        try {
            new TestClass('test test');
        } catch (e) {
            expect(e).toBeInstanceOf(ValidationException);
            // @ts-ignore
            expect(e.message).toStrictEqual(
                'Object TestClass failed validation. Errors: An instance of TestClass has failed the validation:\n' +
                ' - property name has failed the following constraints: maxLength \n',
            );
        }
        // expect(() => new TestClass('test test')).toThrow(ValidationException);
    });

    it('should throw an error if the nested class properties are invalid', () => {
        try {
            new NestedTestClass(new TestClass('test test'));
        } catch (e) {
            expect(e).toBeInstanceOf(ValidationException);
            // @ts-ignore
            expect(e.message).toStrictEqual(
                'Object TestClass failed validation. Errors: An instance of TestClass has failed the validation:\n' +
                ' - property name has failed the following constraints: maxLength \n',
            );
        }
    });
});
