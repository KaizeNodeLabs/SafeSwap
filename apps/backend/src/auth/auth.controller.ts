import {
	Body,
	Controller,
	Get,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("token")
	getToken(@Body() body: { userId: string; walletAddress?: string }) {
		// This is a simplified version for testing only
		// In a real application, you'd validate the user or wallet signature
		const token = this.authService.signJwt({
			sub: body.userId,
			walletAddress: body.walletAddress,
		});

		return { token };
	}

	@UseGuards(JwtAuthGuard)
	@Get("profile")
	getProfile(@Request() req) {
		// The JWT payload is attached to the request by the JwtStrategy
		return {
			message: "You have successfully accessed a protected route!",
			user: req.user,
		};
	}
}
