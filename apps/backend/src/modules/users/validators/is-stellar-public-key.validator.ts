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
	validate(value: string) {
		const stellarRegex = /^G[A-Z2-7]{55}$/;
		return typeof value === "string" && stellarRegex.test(value);
	}

	defaultMessage() {
		return "walletAddress must be a valid Stellar public key (starts with 'G' and has 56 characters).";
	}
}

export default function IsStellarPublicKey(
	validationOptions?: ValidationOptions,
) {
	return (object: Record<string, unknown>, propertyName: string) => {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsStellarPublicKeyConstraint,
		});
	};
}
