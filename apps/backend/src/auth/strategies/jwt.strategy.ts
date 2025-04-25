import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

interface JwtPayload {
	sub: string;
	walletAddress?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>("JWT_SECRET"),
		});
	}

	// This method will be called for each request with a valid JWT token
	async validate(payload: JwtPayload) {
		// This is a placeholder for future wallet validation logic
		// For now, simply return the payload which will be attached to the request object
		return payload;
	}
}
