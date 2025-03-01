interface Milestone {
	description: string;
	status: string;
	approved_flag: boolean;
}

interface EscrowContract {
	signer: string;
	engagementId: string;
	title: string;
	description: string;
	approver: string;
	serviceProvider: string;
	platformAddress: string;
	amount: string;
	platformFee: string;
	milestones: Milestone[];
	disputeResolver: string;
	releaseSigner: string;
}
