import {
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator,
} from "class-validator";

@ValidatorConstraint({ async: false })
export class IsStellarPublicKeyConstraint
	implements ValidatorConstraintInterface
{
	validate(value: string): boolean {
		return /^[a-zA-Z0-9]{56}$/.test(value);
	}

	defaultMessage(): string {
		return "Invalid Stellar public key.";
	}
}

export function IsStellarPublickKey(validationOptions?: ValidationOptions) {
	return (object: Object, propertyName: string): void => {
		registerDecorator({
			target: object.constructor,

			propertyName: propertyName,

			options: validationOptions,

			constraints: [],

			validator: IsStellarPublicKeyConstraint,
		});
	};
}
