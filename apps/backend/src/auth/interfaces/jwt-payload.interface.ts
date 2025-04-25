export interface JwtPayload {
	sub: string; // User ID
	walletAddress?: string; // For future wallet integration
}
