import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

interface JwtPayload {
	sub: string;
	walletAddress?: string;
}

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService,
	) {}

	/**
	 * Signs a JWT token with the provided payload
	 * @param payload Data to include in the JWT
	 * @returns Signed JWT token
	 */

	signJwt(payload: JwtPayload): string {
		return this.jwtService.sign(payload, {
			secret: this.configService.get<string>("JWT_SECRET"),
			expiresIn: this.configService.get<string>("JWT_EXPIRATION"),
		});
	}

	// Future methods for wallet authentication will go here
}
