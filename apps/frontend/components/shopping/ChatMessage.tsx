interface ChatMessageProps {
	sender: string;
	message: string;
	timestamp: string;
	isBuyer: boolean;
}

export default function ChatMessage({
	sender,
	message,
	timestamp,
	isBuyer,
}: ChatMessageProps) {
	return (
		<article
			className={`flex ${isBuyer ? "justify-end" : "justify-start"} mb-4`}
		>
			<div
				className={`max-w-md p-4 rounded-lg shadow-md dark:text-black ${
					isBuyer ? "bg-blue-100" : "bg-gray-100"
				}`}
			>
				<p className="font-bold">{sender}</p>
				<p className="mt-1">{message}</p>
				<p className="text-xs text-gray-500 mt-2">{timestamp}</p>
			</div>
		</article>
	);
}
