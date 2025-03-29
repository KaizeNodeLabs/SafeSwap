import { http } from "@/core/config/axios/https";
import { EscrowContract } from "@/interfaces/tw.interface";
import { signTransaction } from "@stellar/freighter-api";
import { getAddress } from "@stellar/freighter-api";

interface InitializedEscrowProps {
	id: number;
	productName: string;
	description: string;
	price: number;
}

interface FundEscrowProps {
	contractId: string;
	amount: number;
}

export const initializedReservationEscrow = async ({
	id,
	productName,
	description,
	price,
}: InitializedEscrowProps) => {
	const { address } = await getAddress();

	const initializedEscrowBody: EscrowContract = {
		signer: address,
		engagementId: id.toString(),
		title: productName,
		description,
		approver: address,
		serviceProvider: "GBPA2LO4XHBZD54ZEGGK4GG3OYHAYBPK6FNDAHCJWNJTLTKYUL52QCQR",
		platformAddress: "GBPA2LO4XHBZD54ZEGGK4GG3OYHAYBPK6FNDAHCJWNJTLTKYUL52QCQR",
		amount: price.toString(),
		platformFee: "0.1",
		milestones: [
			{
				description: "The product has been shipped to the buyer",
				status: "done",
				approved_flag: false,
			},
			{
				description: "The product has been delivered to the buyer",
				status: "pending",
				approved_flag: false,
			},
		],
		disputeResolver: "GBPA2LO4XHBZD54ZEGGK4GG3OYHAYBPK6FNDAHCJWNJTLTKYUL52QCQR",
		releaseSigner: "GBPA2LO4XHBZD54ZEGGK4GG3OYHAYBPK6FNDAHCJWNJTLTKYUL52QCQR",
	};

	const response = await http.post(
		"/deployer/invoke-deployer-contract",
		initializedEscrowBody,
	);

	const { unsignedTransaction } = response.data;

	const { signedTxXdr } = await signTransaction(unsignedTransaction, {
		address,
		networkPassphrase: "Test SDF Network ; September 2015",
	});

	const tx = await http.post("/helper/send-transaction", {
		signedXdr: signedTxXdr,
		returnEscrowDataIsRequired: true,
	});

	const { data } = tx;

	return { data };
};

export const fundReservationEscrow = async ({
	contractId,
	amount,
}: FundEscrowProps) => {
	const { address } = await getAddress();

	const fundEscrowResponse = await http.post("/escrow/fund-escrow", {
		contractId,
		signer: address,
		amount: amount.toString(),
	});

	const { unsignedTransaction } = fundEscrowResponse.data;

	const { signedTxXdr } = await signTransaction(unsignedTransaction, {
		address,
		networkPassphrase: "Test SDF Network ; September 2015",
	});

	const tx = await http.post("/helper/send-transaction", {
		signedXdr: signedTxXdr,
	});

	const { data } = tx;

	return data;
};
