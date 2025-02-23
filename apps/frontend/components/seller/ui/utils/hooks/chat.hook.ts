import { initialMessages } from "@/components/seller/mock/chat.mock";
import { useState } from "react";

export const useChat = () => {
	const [messages, setMessages] = useState(initialMessages);
	const [newMessage, setNewMessage] = useState("");

	const sendMessage = (e: React.FormEvent) => {
		e.preventDefault();
		if (!newMessage.trim()) return;

		setMessages([
			...messages,
			{
				role: "seller",
				message: newMessage,
				timestamp: new Date().toLocaleString(),
			},
		]);
		setNewMessage("");
	};

	return {
		messages,
		newMessage,
		setNewMessage,
		sendMessage,
	};
};
